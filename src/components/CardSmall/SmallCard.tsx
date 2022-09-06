import React from 'react';
import "./SmallCard.scss"
import {Link} from "react-router-dom";


const SmallCard = (props: {image: string, releaseDatetime: string, title: string, backStyle: boolean}) => {
    const {image, releaseDatetime, title, backStyle} = props;

    return (
        <div className={"small-card"} style={backStyle ? {backgroundColor: "#161C1E"} : {backgroundColor: "#F2F2F3"}}>
            <div className={"countdown"}>
                <span className={`card__link ${backStyle ? "card__link_light-background" : "card__link_dark-background"}`}>{releaseDatetime}</span>
            </div>
            <div className={"card__interface"}>
                <button className={"button button_small"}>Pre-Order Now</button>
                <Link className={`card__link ${backStyle ? "card__link_light-background" : "card__link_dark-background"}`} to="#">Learn more &rsaquo;</Link>
            </div>
            <img src={image} alt={title} className={"card__image"}/>

        </div>
    );
};

export default SmallCard;