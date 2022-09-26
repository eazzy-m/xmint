import {useState} from 'react'
import search from "../../assets/search/search-svgrepo-com.svg";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';
import MuiAccordionSummary, {AccordionSummaryProps,} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider';
import {avatarStyles, buttonStyles, buttonStylesColored} from "../../page/Header/HederStyleConstants";
import { useDispatch, useSelector } from 'react-redux';
import { logo, userName } from '../../redux/store';
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from 'react-router';
import { signOutReducer } from '../../redux/slice/auth';
import { closeModal } from '../../redux/slice/headerModal';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  backgroundColor: "inherit",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(() => ({
  backgroundColor:"inherit",
  color: "#7D8081",
  textTransform: "uppercase"
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));


const HeaderDropdown = () => {

  const [listOfPanels, setListOfPanels] = useState<string[]>(['panel1']);
  const UserName = useSelector(userName);
  const userLogo = useSelector(logo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(signOutReducer());
    navigate("/sign-in");
};

  const avatarFiller = (): string => {
      return UserName ? UserName[0].toUpperCase() : "!";
  };

  const togglePanel = (isExpanded: boolean, panel: string) => {
      if (isExpanded) {
         const filteredListOfPanels = listOfPanels.filter(panelItem => panelItem !== panel); 
         setListOfPanels(filteredListOfPanels);
      } else {
          setListOfPanels([...listOfPanels, panel]);
      }
  };

  return (
    <div className='header-dropdown'>
      <div className="header__input-wrapper">
        <img src={search} alt='search' className="search"/>
        <input className="header__input" type="text" placeholder="Search by creator, athlete or sport"/>
      </div>
      <span className="header__span">Drops</span>

      <Accordion expanded={listOfPanels.includes('panel1')} onChange={(_, isExpanded) => togglePanel(!isExpanded, 'panel1')}>
        <AccordionSummary
          sx={listOfPanels.includes('panel1') ? buttonStylesColored : buttonStyles}
          expandIcon={listOfPanels.includes('panel1') ? <ArrowDropDownIcon sx={{color: "#458FAC"}}/> : <ClearIcon sx={{color: "#7D8081"}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Marketplace</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <span className='header__span-dropdown'>All Moments</span>
          <span className='header__span-dropdown'>New</span>
          <span className='header__span-dropdown'>Surfing</span>
          <span className='header__span-dropdown'>Skateboarding</span>
          <span className='header__span-dropdown'>Motocross</span>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{background: "#FFFFFF", opacity: 0.9, zIndex: 100}}/>
      <div className='header__profile-container'>
        <div className='header__avatar-container'>
          <IconButton
                  size="small"
                  sx={{ ml: 2, marginLeft: 0, paddingLeft: 0 }}
                  aria-controls={'account-menu'}
                  aria-haspopup="true"
                  aria-expanded={'true'}
                  >
              {userLogo ? 
              <Avatar  src={userLogo} sx={avatarStyles}/> 
              : 
              <Avatar sx={avatarStyles}>{avatarFiller()}</Avatar>}
          </IconButton>
          <span>{UserName}</span>
        </div>
        <span className='header__span-dropdown' onClick={() => {
                dispatch(closeModal())
                navigate("/profile")
              }}>View profile</span>
        <span className='header__span-dropdown'>Saved</span>
        <span className='header__span-dropdown'>Settings</span>
        <span className='header__span-dropdown' onClick={() => {
                dispatch(closeModal())
                logout()
              }}>Sign out</span>
      </div>
    </div>
  );
};

export default HeaderDropdown;