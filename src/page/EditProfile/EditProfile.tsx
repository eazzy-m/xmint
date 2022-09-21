
import "./EditProfile.scss"
import Footer from '../Footer/Footer';
//import { Avatar } from '@mui/material';
import BasicTabs from '../../components/Tabs/EditProflieTabs/Tabs';
const EditProfile = () => {
  return (
    <>
      <div className='main-page'>
        <BasicTabs/>
      </div>
      <Footer/>
    </>
  );
};

export default EditProfile;