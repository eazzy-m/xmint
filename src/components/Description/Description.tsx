
import Countdown from '../countdown/countdown';
import "./Description.scss";
import { Typography } from '@mui/material';
import { ICard } from '../../interfaces/ICard';

const Description = (props: {card: ICard | undefined, error: boolean}) => {

    const {card, error} = props;

  return (

    <div className='description'>
        <div className='image-container'>
            <img src={card?.marketplace_banner} alt="default" className='description__image'/>
        </div>
        <div className='description__content'>
            <h1 className='container__title'>Be a part of history.<br/> Don't miss the first drop.</h1>
            <p className='container__paragraph'>
                Xmint {card?.number} is the very first drop from the only action sports iconic moments marketplace in the world.
                 This particular collection includes eight unique moments from five of the following brands Billabong,
                  Vissla, Element, Powell Peralta, and Burton. When you order Xmint {card?.number},
                   your pack will include three randomly selected moments.
            </p>
            <p className='container__paragraph'>
            One of the moments included in Xmint {card?.number} is remembered and will now be immortalized as one of the greatest moments
             in modern surfing history by a Hawaiian king of the sport.
              Also in this pack is one of skateboarding’s most polarizing and talented athletes doing a jaw-dropping trick.
              If you are a snowboarding fan you won’t be disappointed.
               Also included is one of the world's best back-country shredders. 
                Xmint 1 is not just the first action sports drop ever it's packed with the best of the best. 
            </p>
            <p className='container__paragraph'>
            You can now own it all for only $99.
             Only 500 editions will be created for each moment, and only a total of 1,000 packs will be sold.
             Pre-order Xmint {card?.number} now and receive one extra moment free in your pack, only while supplies last!
            </p>
            <h3 className='description__price'>Xmint {card?.number}  ${card?.price}</h3>
            <p className='container__paragraph'>Get one additional moment free when you pre-order.</p>
            <div className='description__order'>
                <Countdown releaseDate={card?.release_datetime} mode={true}/>
                <button className={"button button_big"}>Pre-Order Now</button>
            </div>
            {error && <Typography className="error-message">Something goes wrong...</Typography>}
        </div>

    </div>
  );
};

export default Description;