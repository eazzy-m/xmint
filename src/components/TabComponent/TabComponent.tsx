import React from 'react';

import "./TabComponent.scss";
import logo from "../../assets/logo/Xmint.svg";

const TabComponent = (props: {items: number[]}) => {

  const items = props.items;

    const flag = false

  return (
    <div className='tab-component'>
        {flag ? 
        <div className='moments__list'>
            
        </div>
         : 
        <div className='empty-list'>
            <div className="logo-wrapper">
                <img alt='logo' src={logo} className=""/>
            </div>
            <span className="empty-description">
                Once you list your moments for sale, they will appear here.
            </span>
        </div>
        }
    </div>
  );
}
;
export default TabComponent;