
import xMintlogo from "../../assets/logo/Logo-Xmint-black 3.svg";
import wallet from "../../assets/wallet/Wallet.svg";
import ring from "../../assets/ring/Default.svg";
import search from "../../assets/search/search-svgrepo-com.svg";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, FC, MouseEvent } from "react";
import { useNavigate } from "react-router";
import { isAuth, userdata, isModalOpen, token} from "../../redux/store";
import { signOutReducer } from "../../redux/slice/auth";
import { openModal, closeModal } from "../../redux/slice/headerModal";
import { Menu, MenuItem, Avatar, IconButton, ListItemIcon, Button, ButtonGroup } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, Logout, BookmarkBorderOutlined, AccountCircleOutlined } from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { avatarMenuStyles, avatarStyles, burgerButtonStyles, buttonStyles, marketplaceMenuStyles } from "./HederStyleConstants";
import HeaderDropdown from "../../components/HeaderDropdown/HeaderDropdown";
import { getSportTypes } from "../../api/getSprotTypes";
import "./Header.scss";
import "./HeaderMainPage.scss";

const Header:FC = () => {
    const [anchorMarketplaceEl, setAncorMarketplaceEl] = useState<null | HTMLElement>(null);
    const [anchorAvatarEl, setAnchorAvatarEl] = useState<null | HTMLElement>(null);
    const [sportTypes, setSportTypes] = useState([{name: 'All Moments'}, {name: 'New'}, {name: 'Surfing'}, {name: 'Skateboarding'}, {name: 'Motocross'}]);
    const openMArketplace = Boolean(anchorMarketplaceEl);
    const openAvatar = Boolean(anchorAvatarEl);
    const auth = useSelector(isAuth);
    const user = useSelector(userdata);
    const { logo, username } = user;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modal = useSelector(isModalOpen);

    const logout = (): void => {
        localStorage.clear();
        dispatch(closeModal());
        dispatch(signOutReducer());
        navigate("/sign-in");
    };

    useEffect(() => {
        getSportTypes()
          .then(res => setSportTypes(res.data.results))
          .catch(err => console.log(err))
      }, []);

    const avatarFiller = (): string => username ? username[0].toUpperCase() : "!";

    const handleMarketplaceClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        setAncorMarketplaceEl(evt.currentTarget);
    };

    const handleAvatarClick = (evt: MouseEvent<HTMLButtonElement>): void => {
        setAnchorAvatarEl(evt.currentTarget);
    };

    const handleClose = (): void => {
        setAncorMarketplaceEl(null);
        setAnchorAvatarEl(null);
    };

    const toggleModalHeader = (): void => {
        modal ? dispatch(closeModal()) : dispatch(openModal());
    };

    const navigateHandler = (): void => {
        navigate('/profile');
    };

    const navigateAndCloseModalHandler = (): void => {
        dispatch(closeModal());
        navigate("/")
    };

    return (
        auth
            ?
            <div className={"header_main-page"}>
                <img alt="logo" src={xMintlogo} className="header__logo" onClick={navigateAndCloseModalHandler}/>
                <div className="header__input-wrapper">
                    <img src={search} alt='search' className="search"/>
                    <input className="header__input" type="text" placeholder="Search by creator, athlete or sport"/>
                </div>
                <div className={"header-main__container"}>
                    <span className="header__span">Drops</span>
                    <Button sx={buttonStyles}
                            aria-controls={openMArketplace ? "header__span" : undefined}
                            aria-expanded={openMArketplace ? true : undefined}
                            endIcon={openMArketplace ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                            aria-haspopup="true"
                            id='header__button'
                            onClick={handleMarketplaceClick}
                            >Marketplace</Button>
                    <Menu id='header__span'
                          anchorEl={anchorMarketplaceEl}
                          open={openMArketplace}
                          onClose={handleClose}
                          PaperProps={{
                            elevation: 0,
                            sx: marketplaceMenuStyles
                            }}
                          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                          MenuListProps={{
                        "aria-labelledby" : "header__button"
                    }}>
                        <MenuItem onClick={() => {
                            handleClose()
                            navigate('/catalog', {state: ''} )}
                            }>All NFTs</MenuItem>
                        {
                            sportTypes.map((sportType, index) =>
                            <MenuItem key={index} onClick={() => {
                                handleClose()
                                navigate('/catalog', {state: sportType.name})
                            }}>{sportType.name}</MenuItem>
                            )
                        }
                    </Menu>
                    <ButtonGroup sx={{display: "flex", gap: "26px"}}>
                        {!modal &&
                            <>
                                <img src={ring} alt="ringIcon" className={"header__image"}/>
                                <img src={wallet} alt="wallet icon" className={"header__image"}/>
                            </>
                        }
                        <IconButton sx={burgerButtonStyles} onClick={toggleModalHeader}>
                            {modal ? <ClearIcon/> : <DehazeIcon/>}
                        </IconButton>
                        {modal && <HeaderDropdown/>}
                    </ButtonGroup>
                    <IconButton
                            onClick={handleAvatarClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={openAvatar ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAvatar ? 'true' : undefined}
                            >
                        {logo ? 
                        <Avatar src={logo} sx={avatarStyles}/> 
                        : 
                        <Avatar sx={avatarStyles}>{avatarFiller()}</Avatar>}
                        
                    </IconButton>
                    <Menu
                        anchorEl={anchorAvatarEl}
                        id="account-menu"
                        open={openAvatar}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: avatarMenuStyles,
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={navigateHandler}>
                            <ListItemIcon>
                                <AccountCircleOutlined/>
                            </ListItemIcon>
                            View profile
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                            <   BookmarkBorderOutlined />
                            </ListItemIcon>
                            Saved
                        </MenuItem>
                        <MenuItem onClick={logout}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            :
            <div className="header">
                <img alt="logo" src={xMintlogo} className="header__logo"/>
                <div className="header__container">
                    <span className="header__question">Don't have an account?</span>
                    <button className="header__button">Get Early Access</button>
                </div>
            </div>

    );
};

export default Header;