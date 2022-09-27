
import { Link } from 'react-router-dom';

const FooterLi = (props: {link: string, label: string}) => {

const {label, link} = props;

  return (
    <li className={"footer__li"}>
        <Link className={"footer__text"} to={link}>
            {label}
        </Link>
    </li>
  );
};

export default FooterLi;