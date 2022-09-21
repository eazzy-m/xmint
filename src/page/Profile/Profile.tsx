
import Footer from '../Footer/Footer';
import Button from '@mui/material/Button';
import BasicTabs from '../../components/Tabs/ProfileTabs/Tabs';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router';
import { about, name, userName, logo} from "../../redux/store";

import "./Profile.scss";
import { style } from '@mui/system';

const Profile = () => {

    const navigate = useNavigate();
    const UserName = useSelector(userName);
    const userLogo = useSelector(logo);
    const UserFirstName = useSelector(name);
    const userAbout = useSelector(about);

    const avatarFiller = (): string => {
        if (UserName) {
            return UserName[0].toUpperCase();
        }
        return "!"
    };


    const style = {                        width: "297px",
        textTransform: 'none',
        margin: "16px 0 24px",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        color: "#161C1E",
        padding: "11px",
        borderColor: '#D0D2D2'
    }


  return (
    <>
        <div className='main-page'>
            <div className='profile-container'>
                <div className="user-info-container">
                {userLogo ? 
                        <Avatar src={userLogo} sx={{ width: 100, height: 100 }}/> 
                        : 
                        <Avatar sx={{ width: 100, height: 100 }}>
                            {avatarFiller()}
                        </Avatar>
                }
                    <span className="user-username">{UserName.split('@')[0]}</span>
                    
                    <span className="user-firstname">{UserFirstName || "First name didn't exist"}</span>
                    <Button sx={style}
                     variant="outlined" 
                     onClick={() => {navigate('/edit-profile')}}
                     >Edit profile</Button>
                    <p className="user-interests">{userAbout || 'I have no interests yet'}</p>
                </div>
                <div className='navigation'>
                    <BasicTabs/>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Profile