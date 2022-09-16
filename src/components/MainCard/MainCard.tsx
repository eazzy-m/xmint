import {useEffect, useState} from 'react';
import "./MainCard.scss";
import {getFirst} from "../../api/api";
import {ICard} from "../../interfaces/ICard";
import {useNavigate} from "react-router-dom";
import { Typography } from '@mui/material';
import Countdown from "../countdown/countdown";
import { useSelector, useDispatch  } from 'react-redux';
import { token } from "../../redux/store";
import { signOutReducer } from '../../redux/slice/auth';

const MainCard = () => {

    const [card, setCard] = useState<ICard>();
    const [error, setError] = useState();
    const storeToken = useSelector(token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const logout = () => {
        localStorage.clear();
        dispatch(signOutReducer());
        navigate("/sign-in");
    };
    useEffect(() => {
        getFirst(storeToken)
            .then(res => setCard(res.data.results[0]))
            .catch(err => {
                setError(err);
                logout();
            });
    }, []);

    const errorHandler = (): boolean => {
        //@ts-ignore
        return error && Object.keys(error?.response?.data).includes(id);
    };

    return (

        <div className={"main-card"}>
            <div className={"main-card__info"}>
                <h1 className={"main-card__title"}>Don't miss the first drop.</h1>
                <Countdown mode={true} releaseDate={card?.release_datetime}/>
                <div className={"card__interface"}>
                    <button className={"button button_small"}>Pre-Order Now</button>
                    <button className={"card__link card__link_light-background"}
                    onClick={() => {navigate("/learn-more", {state: card?.id})}}
                    >Learn more &rsaquo;</button>
                </div>
            </div>
            <div className={"main-card__image"}>
                <img src={card?.drop_banner} alt={card?.title} className={"main-card__image-banner"}/>
                {errorHandler() && //@ts-ignore
                    <Typography className="error-message">{error?.response?.data}</Typography>}
            </div>
            {/*<div className={"main-card__footer"}>*/}

            {/*</div>*/}
        </div>
    );
};

export default MainCard;