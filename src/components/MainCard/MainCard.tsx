import React, {useEffect, useState} from 'react';

import "./MainCard.scss";
import {getFirst} from "../../api/api";
import {ICard} from "../../interfaces/ICard";
import {Link} from "react-router-dom";


const MainCard = () => {

    const [card, setCard] = useState<ICard>();
    const [error, setError] = useState();

    useEffect(() => {
        getFirst()
            .then(res => setCard(res.data.results[0]))
            .catch(err => setError(err));
    }, []);

    const errorHandler = (): boolean => {
        //@ts-ignore
        return error && Object.keys(error?.response?.data).includes(id);
    };

    return (

        <div className={"main-card"}>
            <div className={"main-card__info"}>
                <h1 className={"main-card__title"}>Don't miss the first drop.</h1>
                <div className={"countdown"}>
                    <span>{card?.release_datetime}</span>
                </div>
                <div className={"card__interface"}>
                    <button className={"button button_small"}>Pre-Order Now</button>
                    <Link className={"card__link card__link_light-background"} to="#">Learn more &rsaquo;</Link>
                </div>
            </div>
            <div className={"main-card__image"}>
                <img src={card?.drop_banner} alt={card?.title} className={"main-card__image-banner"}/>
                {errorHandler() && //@ts-ignore
                    <span className="error-message">{error?.response?.data}</span>}
            </div>
            {/*<div className={"main-card__footer"}>*/}

            {/*</div>*/}
        </div>
    );
};

export default MainCard;