import React from 'react';


const TabComponent = (props: {fillPhrase: string}) => {

  const {fillPhrase} = props;
  
  const flag = false;

  return (
    <div className='tab-component'>
        {fillPhrase}
    </div>
  );
}
;
export default TabComponent;