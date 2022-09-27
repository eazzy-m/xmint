import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userdata} from "../../redux/store";
import Footer from '../Footer/Footer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import BasicTabs from '../../components/Tabs/ProfileTabs/Tabs';
import {smallText, fontFive,colors} from "../../constants/inlineConstants"
import "./Profile.scss";

const {darkColor, borderColor} = colors;

const style = {       
    ...fontFive,
    ...smallText,
    width: "297px",
    textTransform: 'none',
    margin: "16px 0 24px",
    color: darkColor,
    padding: "11px",
    borderColor: borderColor
};

const Profile = () => {

    const navigate = useNavigate();
    const user = useSelector(userdata);
    const {about, username, name, logo} = user;

    const avatarFiller = (): string => username ? username[0].toUpperCase() : "!";

    const navigateHandler = (): void => {
        navigate('/edit-profile');
    };

  return (
    <>
        <div className='main-page'>
            <div className='profile-container'>

                <div className="user-info-container">
                    <div className='user-profile-container'>
                        {logo ? 
                                <Avatar src={logo} sx={{ width: 100, height: 100 }}/> 
                                : 
                                <Avatar sx={{ width: 100, height: 100 }}>
                                    {avatarFiller()}
                                </Avatar>
                        }
                    <div className='username-container'>
                        <span className="user-username">{username.split('@')[0]}</span>
                        <span className="user-firstname">{name || "First name didn't exist"}</span>
                    </div>
                    </div>
                    <Button sx={style}
                     variant="outlined" 
                     onClick={navigateHandler}
                     >Edit profile</Button>
                    <p className="user-interests">{about || 'I have no interests yet'}</p>
                </div>
                <div className='navigation'>
                    <BasicTabs/>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  );
};

export default Profile;