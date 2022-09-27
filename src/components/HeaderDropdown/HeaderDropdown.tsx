import {useEffect, useState} from 'react'
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
import { userdata, token } from '../../redux/store';
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from 'react-router';
import { signOutReducer } from '../../redux/slice/auth';
import { closeModal } from '../../redux/slice/headerModal';
import { getSportTypes } from '../../api/getSprotTypes';

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
  const [sportTypes, setSportTypes] = useState([{name: 'All Moments'}, {name: 'New'}, {name: 'Surfing'}, {name: 'Skateboarding'}, {name: 'Motocross'}]);
  const user = useSelector(userdata);
  const {logo, username} = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storageToken = useSelector(token);

  useEffect(() => {
    getSportTypes(storageToken)
      .then(res => setSportTypes(res.data.results))
      .catch(err => console.log(err))
  }, []);

  const logout = (): void => {
    localStorage.clear();
    dispatch(signOutReducer());
    dispatch(closeModal());
    navigate("/sign-in");
};

  const avatarFiller = (): string =>  username ? username[0].toUpperCase() : "!";

  const togglePanel = (isExpanded: boolean, panel: string): void => {
      if (isExpanded) {
         const filteredListOfPanels = listOfPanels.filter(panelItem => panelItem !== panel); 
         setListOfPanels(filteredListOfPanels);
      } else {
          setListOfPanels([...listOfPanels, panel]);
      }
  };

  const navigateHandler = (): void => {
    dispatch(closeModal());
    navigate("/profile");
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
          {
            sportTypes.map((sportType, index) => 
            <span key={index} className='header__span-dropdown'>{sportType.name}</span>
              )
          }
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
              {logo ? 
              <Avatar  src={logo} sx={avatarStyles}/> 
              : 
              <Avatar sx={avatarStyles}>{avatarFiller()}</Avatar>}
          </IconButton>
          <span>{username}</span>
        </div>
        <span className='header__span-dropdown' onClick={navigateHandler}>View profile</span>
        <span className='header__span-dropdown'>Saved</span>
        <span className='header__span-dropdown'>Settings</span>
        <span className='header__span-dropdown' onClick={logout}>Sign out</span>
      </div>
    </div>
  );
};

export default HeaderDropdown;