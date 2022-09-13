
import "./BrandsList.scss";
import { IMoments } from '../../interfaces/IMoments';
const BrandsList = (props: {moments: IMoments[] | undefined, cardNumber: number | undefined}) => {

const {moments, cardNumber} = props;

  return (
    <div className='brands'>
        <h1 className='container__title container__title_text_center'>Xmint {cardNumber} includes three epic moments from these brands and athletes.</h1>
        <div className='brands__container'>
            {moments?.map((item, index) => 
                <div key={index} className="brands__item">
                    <img src={item.moment_preview} alt="moment" className="moment__image"/>
                    <p className="moment__author">{item.title}</p>
                    <img src={item.author.logo} alt={item.author.name} className="moment__logo"/>
                </div>
            )}
        </div>
    </div>
  )
}

export default BrandsList;