
import "./NoMatches.scss";

const NoMatches = () => {
  return (
    <div className='no-matches__container'>
        <h3 className="no-matches__title">Your search returned no matches.</h3>
        <h4 className='no-matches__subtitle'>Please try another search term.</h4>
    </div>
  );
};

export default NoMatches;