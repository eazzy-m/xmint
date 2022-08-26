import React from 'react';
import "./Header.scss"

import logo from "../../assets/logo/Logo-Xmint-black 3.svg"

const Header = () => {
    return (
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