import React from 'react';
import "./Header.scss";
import "./HeaderMainPage.scss";

import logo from "../../assets/logo/Logo-Xmint-black 3.svg";
import wallet from "../../assets/wallet/Wallet.svg";
import ring from "../../assets/ring/Default.svg";
import user from "../../assets/user/user-svgrepo-com.svg";
import {useSelector} from "react-redux";
import {isAuth} from "../../redux/store";
const Header = () => {
    const auth = useSelector(isAuth);

    return (
        auth
            ?
            <div className={"header_main-page"}>
                <img alt="logo" src={logo} className="header__logo"/>
                <input className="header__input" type="text"/>
                <div className={"header-main__container"}>
                    <span className="header__span">Drops</span>
                    <span className="header__span">Marketplace &#8744;</span>
                    <img src={ring} alt="ringIcon" className={"header__image"}/>
                    <img src={wallet} alt="wallet icon" className={"header__image"}/>
                    <img src={user} alt="userImage" className={"user__image"}/>
                </div>
            </div>
            :
            <div className="header">
                <img alt="logo" src={logo} className="header__logo"/>
                <div className="header__container">
                    <span className="header__question">Don't have an account?</span>
                    <button className="header__button">Get Early Access</button>
                </div>
            </div>

    );
}

export default Header;