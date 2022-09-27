import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { token } from "../../redux/store"
import { getCards } from "../../api/getCards";
import { ICard } from "../../interfaces/ICard";
import InfiniteScroll from 'react-infinite-scroll-component';
import SmallCard from "../CardSmall/SmallCard";
import defaultImage from "../../assets/default-image/XMint1_Pack_Logo_001.png";
 
import "./SmallCardsList.scss";

const SmallCardsList = () => {
    const [cards, setCards] = useState<ICard[]>([] as ICard[]);
    const [style, setStyle] = useState<boolean[]>([]);
    const [offset, setOffset] = useState(6);
    const [hasMore, setHasMore] = useState(true);
    const storeToken = useSelector(token);

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
    
    const backgroundPainter = () => {
        const arr = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16]];
        const booleansArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i % 2 === 0) {
                if (window.innerWidth > 900) {
                    booleansArr.push(true);
                    booleansArr.push(true);
                }
                else {
                    booleansArr.push(true);
                }
            } else {
                if (window.innerWidth > 900) {
                    booleansArr.push(false);
                    booleansArr.push(false);
                }
                else {
                    booleansArr.push(false);
                }  
            }
        }
        setStyle(booleansArr);
    };

    useEffect(() => {
        backgroundPainter();
        getCards(5, 1, storeToken)
            .then(res => setCards(res.data.results))
            .catch(() => setCards([filler]));
    }, []);

    const fetch = async () => {
        const res = await getCards(4, offset, storeToken);
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
                                   id={card.id}
                                   releaseDatetime={card.release_datetime}
                                   backStyle={style[index]}
                                   queueNumber={index + 1}
                        />
                    ))}
                </div>
            </InfiniteScroll>
    );
};

export default SmallCardsList;