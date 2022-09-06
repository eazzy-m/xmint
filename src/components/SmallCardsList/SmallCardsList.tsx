import React, {useEffect, useState} from 'react';
import SmallCard from "../CardSmall/SmallCard";
import {getCards} from "../../api/api";
import {ICard} from "../../interfaces/ICard";
import "./SmallCardsList.scss";

const SmallCardsList = () => {

    const [cards, setCards] = useState<ICard[]>([]);
    const [error, setError] = useState();
    const [style, setStyle] = useState<boolean[]>([]);

    const backgroundPainter = () => {
        const arr = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16]];
        const booleansArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i % 2 === 0) {
                booleansArr.push(true);
                booleansArr.push(true);
            } else {
                booleansArr.push(false);
                booleansArr.push(false);
            }
        }
        setStyle(booleansArr);
    };

    useEffect(() => {
        backgroundPainter();
        getCards()
            .then(res => setCards(res.data.results))
            .catch(err => setError(err));
    }, []);

    const errorHandler = (): boolean => {
        //@ts-ignore
        return error && Object.keys(error?.response?.data).includes(id);
    };

    return (
        <div className={"cards-array"}>

            {errorHandler() && //@ts-ignore
                <span className="error-message">{error?.response?.data}</span>}

            {cards.map((card, index) => (
                <SmallCard key={card.id}
                           image={card.drop_banner}
                           title={card.title}
                           releaseDatetime={card.release_datetime}
                           backStyle={style[index]}
                />
            ))}
        </div>
    );
};

export default SmallCardsList;