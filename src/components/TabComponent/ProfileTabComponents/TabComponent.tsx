
import "./TabComponent.scss";
import logo from "../../../assets/logo/Xmint.svg";

const TabComponent = (props: {items: any[] | undefined, fillPhrase: string}) => {

  const {items, fillPhrase} = props;

  const itemsChecker = () => items ? items : [];

  return (
    <div className='tab-component'>
        {itemsChecker().length !== 0 ? 
        <div className='moments__list'>
            {itemsChecker().map((item, index) => 
            <div key={index}>
                {item}
              </div>
              )}
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
};

export default TabComponent;