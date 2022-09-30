import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Avatar, Button, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fillUsersData } from '../../../redux/slice/user';
import { token, userdata } from "../../../redux/store";
//@ts-ignore
import _ from 'lodash';
import {ResetButtonStyle,
    SubmitButtonStyle,
    BigInputStyle,
    ButtonStyle,
    SmalldInputStyle, 
    DisabledInputStyle,
    DisabledSubmitButtonStyle,
    AvatarStyle, } from "./stylesConstants";
import { updateUser } from '../../../api/api';
import { IUpdateUserData } from '../../../interfaces/IUpdateUserData';


import "./FormStyles.scss";

const TabComponentWithForm = () => {

    const dispatch = useDispatch();

    const user = useSelector(userdata);
    const {about, logo, username, name, id, email} = user;
    const storeToken = useSelector(token);

    const initialData: IUpdateUserData = {
        about: about || '',
        username,
        name: name || ''
    };

    const [data, setUserData] = useState<IUpdateUserData>(initialData);

    const [flag, setFlag] = useState<boolean>(true);

    useEffect(() => {
        const isEqual = _.isEqual(initialData, data);
        setFlag(isEqual);
    });


    const avatarFiller = (): string => username ? username[0].toUpperCase() : "!";

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateUser(data, id, storeToken)
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
    <div style={{minHeight: "480px"}}>
        <div className='form-container'>
            <h1 className="form-title">Edit profile</h1>
            <div className="update-avatar">
                <div className='user-logo-wrapper'>
                    {logo ? 
                        <Avatar src={logo} sx={AvatarStyle}/> 
                        : 
                        <Avatar sx={AvatarStyle}>
                            {avatarFiller()}
                        </Avatar>
                    }
                </div>
                <div className="patch-button-wrapper">
                    <span className="username">{username.split('@')[0]}</span>
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
                    <TextField sx={DisabledInputStyle} label="Email" type="email" value={email} disabled />
                    <TextField name='about'
                            sx={BigInputStyle} 
                            multiline rows={3} 
                            label="About your profile" 
                            type="text" 
                            value={data.about} 
                            onChange={handleInput}/>
                </form>
                    <Button variant='outlined' type='reset' sx={ResetButtonStyle}>Cancel</Button>
                    <Button form="myform" variant='contained' disabled={flag} sx={flag ? DisabledSubmitButtonStyle : SubmitButtonStyle} type='submit'>Save</Button>
            </div>
        </div>
    </div>
  );
};

export default TabComponentWithForm;