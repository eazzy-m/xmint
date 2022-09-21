import { useMemo, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Avatar, Button, TextField } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { fillUsersData } from '../../../redux/slice/user';
import { token } from "../../../redux/store";
import { about, name, userName, logo, email, id} from "../../../redux/store";
//@ts-ignore
import _ from 'lodash';
import {ResetButtonStyle,
    SubmitButtonStyle,
    BigInputStyle,
    ButtonStyle,
    SmalldInputStyle, 
    DisabledInputStyle} from "./stylesConstants";
import { updateUser } from '../../../api/api';
import "./FormStyles.scss";
import { IUpdateUserData } from '../../../interfaces/IUpdateUserData';


const TabComponentWithForm = () => {

    const dispatch = useDispatch();

    const userLogo = useSelector(logo);
    const UserName = useSelector(userName);
    const UserFirstName = useSelector(name);
    const userAbout = useSelector(about);
    const userEmail = useSelector(email);
    const userId = useSelector(id);
    const storeToken = useSelector(token);
/////////////
    const initialData: IUpdateUserData = {
        about: userAbout || '',
        username: UserName,
        name: UserFirstName || ''
    }

    const [data, setUserData] = useState<IUpdateUserData>(initialData);

    const [flag, setFlag] = useState<boolean>(true);

    useEffect(() => {
        console.log('rerender');
        
        const isEqual = _.isEqual(initialData, data);
        setFlag(isEqual);
    });


    const avatarFiller = (): string => {
        return UserName ? UserName[0].toUpperCase() : "!";
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("after submit", flag);
        updateUser(data, userId, storeToken)
            .then(res => {
                localStorage.setItem('userData', JSON.stringify(res.data))
                return res.data;
            })
            .then(data => dispatch(fillUsersData(data)))
            .catch(err => console.log(err));  

    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserData({...data, [name]: value});
    };

  return (
    <div className='form-container'>
        <h1 className="form-title">Edit profile</h1>
        <div className="update-avatar">
            <div className='user-logo-wrapper'>
                {userLogo ? 
                        <Avatar src={userLogo} sx={{ width: 80, height: 80}}/> 
                        : 
                        <Avatar sx={{ width: 80, height: 80}}>
                            {avatarFiller()}
                        </Avatar>
                }
            </div>
            <div className="patch-button-wrapper">
                <span className="username">{UserName.split('@')[0]}</span>
                <Button sx={ButtonStyle} variant="outlined" >Upload photo</Button>
            </div>
        </div>
        <div className="form-wrapper">
            <form id="myform" onSubmit={handleSubmit}>
                <TextField name='username' 
                        sx={SmalldInputStyle} 
                        label="Username" 
                        type="text" 
                        value={data.username} 
                        onChange={handleInput} />
                <TextField name='name'
                        sx={SmalldInputStyle} 
                        label="Full name" 
                        type="text" 
                        value={data.name} 
                        onChange={handleInput}/>
                <TextField sx={DisabledInputStyle} label="Email" type="email" value={userEmail} disabled />
                <TextField name='about'
                        sx={BigInputStyle} 
                        multiline rows={3} 
                        label="About your profile" 
                        type="text" 
                        value={data.about} 
                        onChange={handleInput}/>
            </form>
                <Button variant='outlined' type='reset' sx={ResetButtonStyle}>Cancel</Button>
                <Button form="myform" variant='contained' disabled={flag} sx={SubmitButtonStyle} type='submit'>Save</Button>
        </div>
    </div>
  );
};

export default TabComponentWithForm;