
import "./Footer.scss";
import logo from "../../assets/logo/Logo-Xmint-black 4.svg";
import {Link} from "react-router-dom";
const Footer = () => {

    return (
        <div className="footer">
            <div className="footer__description">
                <img alt="logo" src={logo} className={"footer__logo"}/>
                <p className={"footer__text footer__text_description"}>
                    Discover and collect NFTs from the cross-section of board sports, culture, and art.
                </p>
                <span className={"footer__copyright"}>© 2022 Xmint Inc. All rights reserved.</span>
            </div>
            <div className="footer__nav-lists">
                <ul className={"footer__text"}>
                    <span className={"footer__nav-titles"}>marketplace</span>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">All Moments</Link></li>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">New</Link></li>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Surfing</Link></li>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Skateboarding</Link></li>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Snowboarding</Link></li>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Motocross</Link></li>
                </ul>
                <ul className={"footer__text"}>
                    <span className={"footer__nav-titles"}>company</span>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">About</Link></li>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Private Policy</Link></li>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Terms of Service</Link></li>

                </ul>
                <ul className={"footer__text"}>
                    <span className={"footer__nav-titles"}>help</span>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Support</Link></li>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Contact Us</Link></li>

                </ul>
                <ul className={"footer__text"}>
                    <span className={"footer__nav-titles"}>follow us</span>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Instagram</Link></li>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Facebook</Link></li>
                    <li className={"footer__li"}><Link className={"footer__text"} to="#">Twitter</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;