import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getFirst } from "../../api/getCards";
import { ICard } from "../../interfaces/ICard";
import defaultImage from "../../assets/default-image/XMint1_Pack_Logo_001.png"
import Countdown from "../countdown/countdown";

import "./MainCard.scss";

const MainCard = () => {

    const [card, setCard] = useState<ICard>();
    const navigate = useNavigate();


    const filler = {
        drop_banner: defaultImage,
        id: Date.now() + '',
        is_released: true,
        is_sold_out: true,
        marketplace_banner: '',
        number: 0,
        pack_artwork: '',
        price: 0,
        release_datetime: '',
        title: '',
    };

    useEffect(() => {
        getFirst()
            .then(res => setCard(res.data.results[0]))
            .catch(() => setCard(filler));
    }, []);

    const navigateHandler = () => {
        navigate("/learn-more", {state: card?.id});
    };

    return (

        <div className={"main-card"}>
            <div className={"main-card__info"}>
                <h1 className={"main-card__title"}>Don't miss the first drop.</h1>
                <Countdown mode={true} releaseDate={card?.release_datetime}/>
                <div className={"card__interface"}>
                    <button className={"button button_small"}>Pre-Order Now</button>
                    <button className={"card__link card__link_light-background"}
                    onClick={navigateHandler}
                    >Learn more &rsaquo;</button>
                </div>
            </div>
            <div className={"main-card__image"}>
                <img src={card?.drop_banner} alt={card?.title} className={"main-card__image-banner"}/>
            </div>
            {/*<div className={"main-card__footer"}>*/}

            {/*</div>*/}
        </div>
    );
};

export default MainCard;