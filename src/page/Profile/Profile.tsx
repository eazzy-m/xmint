
import Footer from '../Footer/Footer';
import Button from '@mui/material/Button';
import BasicTabs from '../../components/Tabs/Tabs';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';

import { about, name, userName, logo} from "../../redux/store";

import "./Profile.scss";

const Profile = () => {

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
                    <Button sx={{
                        width: "297px",
                        textTransform: 'none', 
                        backgroundColor: "#458FAC",
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "18px",
                        color: "#FFF",
                        padding: "11px"
                    }}
                     variant="contained">View wallet</Button>
                    <Button sx={{
                        borderColor: '#D0D2D2', 
                        width: "297px",
                        textTransform: 'none',
                        margin: "16px 0 24px",
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "18px",
                        color: "#161C1E",
                        padding: "11px"
                    }}
                     variant="outlined">Edit profile</Button>
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