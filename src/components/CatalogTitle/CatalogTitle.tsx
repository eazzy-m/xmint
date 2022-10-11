import logo from "../../assets/logo/Xmint1White.svg";

import "./CatalogTitle.scss";
const CatalogTitle = (props: {date: string}) => {

  return (
    <div className='catalog__description'>
            <span className='catalog__date'>{props.date}</span>
            <img src={logo} alt="logo" className="catalog__logo"/>
            <p className='catalog__title'>
                Created by the world's best brands and athletes
                Created by the and athletes.
            </p>
        </div>
  );
};

export default CatalogTitle;