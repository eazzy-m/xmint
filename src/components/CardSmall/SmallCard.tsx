
import {useNavigate} from "react-router-dom";
import Countdown from "../countdown/countdown";

import "./SmallCard.scss";

const SmallCard = (props: {image: string, releaseDatetime: string, title: string, backStyle: boolean, id: string, queueNumber: number}) => {
    const {image, releaseDatetime, title, backStyle, id} = props;
    const navigate = useNavigate();
    
    return (
        <div className={"small-card"} style={backStyle ? {backgroundColor: "#161C1E"} : {backgroundColor: "#F2F2F3"}}>
            <Countdown releaseDate={releaseDatetime} mode={!backStyle}/>
            <div className={"card__interface"}>
                <button className={"button button_small"}>Pre-Order Now</button>
                <button className={`card__link 
                ${backStyle 
                    ?
                    "card__link_dark-background" 
                    : 
                    "card__link_light-background"}`} 
                    onClick={() => {navigate("/learn-more", {state: id})}}
                    >Learn more &rsaquo;</button>
            </div>
            <img src={image} alt={title} className={"card__image"}/>

        </div>
    );
};

export default SmallCard;