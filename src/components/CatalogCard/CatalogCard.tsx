
import { colors } from "../../constants/inlineConstants";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'
import share from "../../assets/share/Share.svg";
import "./CatalogCard.scss";

const {greyColor} = colors;

const momentFooterStyle = {color: greyColor, width: "20px", height: "20px"};

const CatalogCard = (props: {image: string, title: string, minPrice: number | null, maxPrice: number | null, isLiked: boolean, likesCount: number }) => {

    const {image, title, minPrice, maxPrice, isLiked, likesCount} = props;

  return (

    <div className="moment__card">
        <div className='moment__card-wrapper'>
            <img src={image} alt={title} className='moment__image'/>
        </div>
        <div className='moment__discription'>
            {Math.random() < 0.5 && <span className='moment__announcement'>New</span>}
            <span className='moment__title'>{title}</span>
            <div className='moment__footer'>
                <span className='moment__price'>{(minPrice && maxPrice) && `$${minPrice} - ${maxPrice}`}</span>
                <div className='buttons__container'>
                    {isLiked ? <FavoriteIcon sx={momentFooterStyle}/> : <FavoriteBorderIcon sx={momentFooterStyle}/>}
                    <span className='moment__likes'>{likesCount}</span>
                    <BookmarkBorderIcon sx={momentFooterStyle}/>
                    <img src={share} alt="share" style={momentFooterStyle}/>
                </div>
            </div>
        </div>
    </div>

  );
};

export default CatalogCard;