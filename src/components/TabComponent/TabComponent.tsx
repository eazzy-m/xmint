import React from 'react';

import "./TabComponent.scss";
import logo from "../../assets/logo/Xmint.svg";

const TabComponent = (props: {items: number[], fillPhrase: string}) => {

  const {items, fillPhrase} = props;

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
                {fillPhrase}
            </span>
        </div>
        }
    </div>
  );
}
;
export default TabComponent;