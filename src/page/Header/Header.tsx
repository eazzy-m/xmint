
import xMintlogo from "../../assets/logo/Logo-Xmint-black 3.svg";
import wallet from "../../assets/wallet/Wallet.svg";
import ring from "../../assets/ring/Default.svg";
import search from "../../assets/search/search-svgrepo-com.svg";
import { useSelector, useDispatch } from "react-redux";
import { useState, FC, MouseEvent } from "react";
import { useNavigate } from "react-router";
import { isAuth, userName, logo } from "../../redux/store";
import { Menu, MenuItem, Avatar, IconButton, ListItemIcon } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, Logout, BookmarkBorderOutlined, AccountCircleOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { signOutReducer } from "../../redux/slice/auth";

import "./Header.scss";
import "./HeaderMainPage.scss";

const Header:FC = () => {

    const [anchorMarketplaceEl, setAncorMarketplaceEl] = useState<null | HTMLElement>(null);
    const [anchorAvatarEl, setAnchorAvatarEl] = useState<null | HTMLElement>(null);
    const openMArketplace = Boolean(anchorMarketplaceEl);
    const openAvatar = Boolean(anchorAvatarEl);
    const auth = useSelector(isAuth);
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
        if (UserName) {
            return UserName[0].toUpperCase();
        }
        return "!";
    };

    const handleMarketplaceClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setAncorMarketplaceEl(evt.currentTarget);
    };

    const handleAvatarClick = (evt: MouseEvent<HTMLButtonElement>) => {
        setAnchorAvatarEl(evt.currentTarget);
    };

    const handleClose = () => {
        setAncorMarketplaceEl(null);
        setAnchorAvatarEl(null);
    };

    const avatarStyles = {
         width: 32,
         height: 32,
         border: "1px solid #458FAC",
         borderRadius: "50%" 
        };

    const buttonStyles = { 
        backgroundColor: "inherit",
        border: "none",
        cursor: "pointer",
        fontFamily: "Roboto",
        fontWeight: 500,
        color: "#161C1E",
        fontSize: "14px",
        lineHeight: "18px",
        textTransform: "capitalize"
        };

    return (
        auth
            ?
            <div className={"header_main-page"}>
                <img alt="logo" src={xMintlogo} className="header__logo" onClick={() => {navigate("/")}}/>
                <img src={search} alt='search' className="search"/>
                <input className="header__input" type="text" placeholder="Search by creator, athlete or sport"/>
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
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
                          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                          MenuListProps={{
                        "aria-labelledby" : "header__button"
                    }}>
                        <MenuItem onClick={handleClose}>All NFTs</MenuItem>
                        <MenuItem onClick={handleClose}>Surfing</MenuItem>
                        <MenuItem onClick={handleClose}>Skating</MenuItem>
                        <MenuItem onClick={handleClose}>Skateboarding</MenuItem>
                        <MenuItem onClick={handleClose}>Motocross</MenuItem>
                        <MenuItem onClick={handleClose}>Snowboarding</MenuItem>
                        <MenuItem onClick={handleClose}>Tennis</MenuItem>
                    </Menu>

                    <img src={ring} alt="ringIcon" className={"header__image"}/>
                    <img src={wallet} alt="wallet icon" className={"header__image"}/>

                    <IconButton
                            onClick={handleAvatarClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={openAvatar ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAvatar ? 'true' : undefined}
                            >
                        {userLogo ? 
                        <Avatar  src={userLogo} sx={avatarStyles}/> 
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
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {navigate("/profile")}}>
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
        <MenuItem onClick={() => {logout()}}>
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
}

export default Header;