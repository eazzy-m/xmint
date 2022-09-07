import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SmallCard from "../CardSmall/SmallCard";
import {getCards} from "../../api/api";
import {ICard} from "../../interfaces/ICard";
import "./SmallCardsList.scss";

const SmallCardsList = () => {

    const [cards, setCards] = useState<ICard[]>([]);
    const [error, setError] = useState();
    const [style, setStyle] = useState<boolean[]>([]);
    const [offset, setOffset] = useState(6);
    const [hasMore, setHasMore] = useState(true);
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
        getCards(5, 1)
            .then(res => setCards(res.data.results))
            .catch(err => setError(err));
    }, []);

    const errorHandler = (): boolean => {
        //@ts-ignore
        return error && Object.keys(error?.response?.data);
    };

    const fetch = async () => {
        const res = await getCards(4, offset);
        return res.data.results;
    };

    const fetchData = async () => {
        const moreCards = await fetch();
        setCards([...cards, ...moreCards]);
        if (moreCards.length === 0 || moreCards.length < 4) {
            setHasMore(false);
        }
        setOffset(offset + 5);
    };

    return (
            <InfiniteScroll
                dataLength={cards.length - 3} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<h4 style={{margin: "10px auto"}}>Loading...</h4>}>
                <div className={"cards-array"}>
                    {cards.map((card, index) => (
                        <SmallCard key={card.id}
                                   image={card.drop_banner}
                                   title={card.title}
                                   releaseDatetime={card.release_datetime}
                                   backStyle={style[index]}
                        />
                    ))}
                </div>
                {errorHandler() && //@ts-ignore
                    <span className="error-message">{error?.response?.data}</span>}
            </InfiniteScroll>
    );
};

export default SmallCardsList;