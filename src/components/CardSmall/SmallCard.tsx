
import {useNavigate} from "react-router-dom";
import Countdown from "../countdown/countdown";
import { colors } from "../../constants/inlineConstants";
import "./SmallCard.scss";

const { mainPageBackgroundColor, darkColor} = colors;

const SmallCard = (props: {image: string, releaseDatetime: string, title: string, backStyle: boolean, id: string, queueNumber: number}) => {
    const {image, releaseDatetime, title, backStyle, id} = props;
    const navigate = useNavigate();
    
    const navigateHandler = (): void => {
        navigate("/learn-more", {state: id})
    };

    return (
        <div className={"small-card"} style={backStyle ? {backgroundColor: darkColor} : {backgroundColor:  mainPageBackgroundColor}}>
            <Countdown releaseDate={releaseDatetime} mode={!backStyle}/>
            <div className={"card__interface"}>
                <button className={"button button_small"}>Pre-Order Now</button>
                <button className={`card__link card__link${backStyle ? "_dark-background" : "_light-background"}`} 
                    onClick={navigateHandler}
                    >Learn more &rsaquo;</button>
            </div>
            <img src={image} alt={title} className={"card__image"}/>

        </div>
    );
};

export default SmallCard;