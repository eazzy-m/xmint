import React from 'react';
import Footer from '../Footer/Footer';
import Banner from '../../components/Banner/Banner';
import logo from "../../assets/logo/Xmint1White.svg";

import "./Catalog.scss";

const Catalog = () => {
  return (
    <>
      <div className='main-page'>
        <div className='catalog__description'>
            <span className='catalog__date'>August 31, 2021</span>
            <img src={logo} alt="logo" className="catalog__logo"/>
            <p className='catalog__title'>
                Created by the world’s best brands and athletes
                Created by the and athletes.
            </p>
        </div>
        <Banner/>

      </div>
      <Footer/>
    </>
  );
};

export default Catalog;