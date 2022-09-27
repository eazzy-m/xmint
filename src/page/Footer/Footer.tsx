
import { useState, useEffect } from "react";
import {companyList, helpList, marketplaceList, followUsList} from "../../constants/FooterConstants/constants";
import FooterAccordeon from "../../components/FooterAccordeon/FooterAccordeon";
import logo from "../../assets/logo/Logo-Xmint-black 4.svg";
import FooterUL from "../../components/FooterUL/FooterUL";

import "./Footer.scss";

const Footer = () => {

    const [showCopyright, setShowCopyright] = useState<boolean>(false); 

    useEffect(() => {
        window.innerWidth <= 900 ? setShowCopyright(true) : setShowCopyright(false);
    }, []);

    const showHide = (flag: boolean) =>  flag ? {display : "inline"} : {display : "none"};

    return (
        <div className="footer">
            <div className="footer__description">
                <img alt="logo" src={logo} className={"footer__logo"}/>
                <p className={"footer__text footer__text_description"}>
                    Discover and collect NFTs from the cross-section of board sports, culture, and art.
                </p>
                <span style={showHide(!showCopyright)} className={"footer__copyright"}>© 2022 Xmint Inc. All rights reserved.</span>
            </div>

            {showCopyright 
                ?
                <FooterAccordeon/>
                :
                <div className="footer__nav-lists">
                    <FooterUL title="marketplace" linksList={marketplaceList}/>
                    <FooterUL title="company" linksList={companyList}/>
                    <FooterUL title="help" linksList={helpList}/>
                    <FooterUL title="follow us" linksList={followUsList}/>
                </div>
            }
            <span style={showHide(showCopyright)} className={"footer__copyright"}>© 2022 Xmint Inc. All rights reserved.</span>
        </div>
    );
};

export default Footer;