import { useState, useEffect } from 'react';
import { getCardById } from '../../api/getCards';
import { ICard } from '../../interfaces/ICard';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { token } from "../../redux/store"
import Countdown from '../../components/countdown/countdown';
import MembershipWindow from '../../components/MembershipWindow/MembershipWindow';
import Banner from '../../components/Banner/Banner';
import BrandsList from '../../components/BrandsList/BrandsList';
import Description from '../../components/Description/Description';
import Footer from '../Footer/Footer';

import "./LearnMore.scss";

const LearnMore = () => {

  const [card, setCard] = useState<ICard>();
  const [error, setError] = useState();
  const location = useLocation();
  const id = location.state;
  const storeToken = useSelector(token);
  
  useEffect(() => {
    getCardById(id, storeToken)
      .then(res => setCard(res.data))
      .catch(err => setError(err));
  }, [id]); 

  const errorHandler = (): boolean => {
      //@ts-ignore
      return error && Object.keys(error?.response?.data).includes(id);
  };

  return (
    <>
      <div className='main-page'>
          <Banner/>
          <Description card={card} error={errorHandler()}/>
          <BrandsList moments={card?.moments} cardNumber={card?.number}/>
          <div className='countdown-wrapper'>
            <h2 className='container__title container__title_text_center'>Ready to own your moments?</h2>
            <p className='countdown-wrapper__paragraph'>Get one additional moment free when you pre-order Xmint {card?.number}.</p>
            <Countdown mode={true} releaseDate={card?.release_datetime}/>
            <button className={"button button_big"}>Pre-Order Now</button>
          </div>
      </div>
      <MembershipWindow/>
      <Footer/>
    </>
  );

};

export default LearnMore;