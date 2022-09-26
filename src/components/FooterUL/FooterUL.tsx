
import FooterLi from '../FooterLi/FooterLi'
import { Ilinks } from '../../interfaces/Ilinks';

const FooterUL = (props: {title?: string, linksList: Ilinks[]}) => {

    const {title, linksList} = props;

  return (
    <ul className={"footer__text"}>
        <span className={"footer__nav-titles"}>{title}</span>
        {linksList.map((li, index) => 
            <FooterLi key={index} link={li.link} label={li.label}/>
        )}
    </ul>
  );
};

export default FooterUL;