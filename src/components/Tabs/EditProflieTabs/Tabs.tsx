import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabComponent from "../../TabComponent/EditProfileTabComponents/TabComponent";
import TabComponentWithForm from '../../TabComponent/EditProfileTabComponents/TabComponentWithForm';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signOutReducer } from "../../../redux/slice/auth";
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import {fontFive, colors, smallText} from "../../../constants/inlineConstants"

const {greyColor, mainPageBackgroundColor, buttonColor} = colors;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const style = {
  ...fontFive,
  ...smallText,
  width: window.innerWidth > 900 ? "210px" : "113px",
  height: window.innerWidth > 900 ? "40px" : "28px",
  textTransform: "none",
  color: greyColor,
  padding: window.innerWidth > 900 ? "10px 16px" : 0,
  '&.Mui-selected': {
      color: buttonColor,
      background: mainPageBackgroundColor,
      borderRadius: "6px"
},
 }

 const imageStyle = {
    display: window.innerWidth > 900 ? "inline" : "none"
 }

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logout = (): void => {
      localStorage.clear();
      dispatch(signOutReducer());
      navigate("/sign-in");
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', width: "100%", flexDirection: `${window.innerWidth > 900 ? "row" : "column"}`, columnGap: `${window.innerWidth > 900 ? "0" : "24px"}`}}>
        <Tabs value={value}
         onChange={handleChange}
          aria-label="Vertical tabs example" 
          orientation={`${window.innerWidth > 900 ? "vertical" : "horizontal"}`}>
          <Tab sx={style} icon={ <EditIcon sx={imageStyle}/>} iconPosition="start" label="Edit profile" {...a11yProps(0)} />
          <Tab sx={style} icon={<KeyIcon sx={imageStyle}/>} iconPosition="start" label="Change password" {...a11yProps(1)} />
          <Tab sx={style} icon={<VerifiedUserOutlinedIcon sx={imageStyle}/>} iconPosition="start" label="Security" {...a11yProps(2)} />
          <Tab sx={style} icon={<LogoutIcon sx={imageStyle}/>} iconPosition="start" label="Sign out" {...a11yProps(3)} 
           onClick={logout}
           />
        </Tabs>

      <TabPanel value={value} index={0}>
        <TabComponentWithForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabComponent  fillPhrase={'change password'}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabComponent fillPhrase={'security'}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabComponent fillPhrase={'logout'}/>
      </TabPanel>
    </Box>
  );
}