import { useEffect, useState, SyntheticEvent } from 'react';
import Footer from '../Footer/Footer';
import Banner from '../../components/Banner/Banner';
import hide from "../../assets/hide/Hide.svg";
import { getMoments } from '../../api/getDrops';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {token} from "../../redux/store";
import { IGoods } from '../../interfaces/IGoods';
import { colors } from "../../constants/inlineConstants";
import CatalogTitle from '../../components/CatalogTitle/CatalogTitle';
import NoMatches from '../../components/NoMatches/NoMatches';
import { FormControlLabel, Switch, Divider } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import AccordeonItem from '../../components/AccordionItem/AccordionItem';
import { getSportTypes } from '../../api/getSprotTypes';
import "./Catalog.scss";
import CatalogCard from '../../components/CatalogCard/CatalogCard';
import AthleteFilter from '../../components/AthleteFilter/AthleteFilter';
import Loader from '../../components/Loader/Loader';


const {greyColor} = colors;
const momentFooterStyle = {color: greyColor, width: "20px", height: "20px"};


const Catalog = () => {

    const location = useLocation();
    const [moments, setMoments] = useState<IGoods[]>([]);
    const [sportTypes, setSportTypes] = useState([{name: 'New'}, {name: 'Surfing'}, {name: 'Skateboarding'}, {name: 'Motocross'}]);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const filter = location.state as string;
    console.log(filter);
    const [activeFilter, setActiveFilter] = useState(filter);
    const [offset, setOffset] = useState(9);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const storageToken = useSelector(token);
    
    
    const [listOfPanels, setListOfPanels] = useState<string[]>(['panel1', 'panel2', 'panel3', 'panel4', 'panel5', 'panel6']);

    const togglePanel = (isExpanded: boolean, panel: string): void => {
        if (isExpanded) {
           const filteredListOfPanels = listOfPanels.filter(panelItem => panelItem !== panel); 
           setListOfPanels(filteredListOfPanels);
        } else {
            setListOfPanels([...listOfPanels, panel]);
        }
    };



    const listOfFilters =  [
        {title: 'Athlete', panel: 'panel1', listOfPanels, togglePanel,},
        {title: 'Brand', panel: 'panel2', listOfPanels, togglePanel, },
        {title: 'Drop',  panel: 'panel3', listOfPanels, togglePanel, },
        {title: 'Price range', panel: 'panel4', listOfPanels, togglePanel, },
        {title: 'Gender',  panel: 'panel5', listOfPanels, togglePanel, },
        {title: 'Place', panel: 'panel6', listOfPanels, togglePanel, }
    ];


    const getDefaultData = (filter: string | null) => {
        setActiveFilter(filter ? filter : "All Moments");
            getSportTypes(storageToken)
                .then(res => setSportTypes(res.data.results))
                .then(() => {
                    getMoments(storageToken, filter)
                        .then(res => {
                            setItemsCount(res.data.data.count);
                            setMoments(res.data.data.results);
                        })
                        .catch(err => console.log('get moments error: ', err));
                    })
                    .catch(err => console.log('get sport types or moments error: ', err));
    };

    useEffect(() => {
        getDefaultData(filter);
    },[filter]);

    const itemsFilter = (evt: SyntheticEvent) => {
        //@ts-ignore
        const {name} = evt.target;
            setActiveFilter(name);
            const filter = name === "All Moments" ? '' : name;
            getMoments(storageToken, filter)
                .then(res => {
                    console.log(res.data.data) //DELETE
                    setItemsCount(res.data.data.count);
                    setMoments(res.data.data.results);
                })
                .catch(err => console.log(err));
    };

        const toggleSwitch = () => {
            setLoading(!loading);
        };


        const fetch = async () => {
            const filter = activeFilter === "All Moments" ? '' : activeFilter;
            const res = await getMoments(storageToken, filter, 9, offset);
            return res.data.data.results;
        };
    
        const fetchData = async () => {
            const moreCards = await fetch();
            setMoments([...moments, ...moreCards]);
            if (moreCards.length === 0 || moreCards.length < 4) {
                setHasMore(false);
            }
            setOffset(offset + 9);
        };

  return (
    <>
    
      <div className='main-page'>
        <CatalogTitle date='August 21, 2021'/>
        <Banner/>
        <div className='filters__header'>
            <div style={{display: "flex"}}>
                <h1 className='filters__title'>{activeFilter}</h1>
                <span className='filters__items-count'>{itemsCount} items</span>
            </div>
            <div style={{display: "flex"}}>
                <div className='filters__hide'>
                    <span className='filters__hide-title'>Hide filter</span>
                    <img src={hide} alt="hide" style={momentFooterStyle} />
                </div>
                <div className=''>
                    <span className='sorted-title'>Sort by: </span>
                    <span className='popular-title'>Popular</span>
                </div>
            </div>
        </div>
        <div className='main-content'>
            <div className="filters__container">
                
                <div className='filters'>
                <button className={`filters__button ${"All Moments" === activeFilter && "filters__button_active"}`}
                                onClick={itemsFilter}
                                name="All Moments">
                                All Moments
                            </button>
                    {
                        sportTypes.map((type, index) => 
                            <button key={index}
                                className={`filters__button ${type.name === activeFilter && "filters__button_active"}`}
                                onClick={itemsFilter}
                                name={type.name}>
                                {type.name}
                            </button>
                            )
                    }

                    <div>
                        <Divider/>
                        <FormControlLabel
                                sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                marginLeft: 0,
                                width: "100%"
                                }}
                                control={
                                <Switch
                                    disabled={true}
                                    checked={loading}
                                    onChange={toggleSwitch}
                                    name="Enchanced view"
                                    color="primary"
                                />
                                }
                                labelPlacement="start"
                                label="Enchanced view"
                            />
                        <Divider/>
                    </div>
                    {
                        listOfFilters.map((filter, index) => 
                        <AccordeonItem key={index} listOfPanels={listOfPanels} title={filter.title} togglePanel={togglePanel} panel={filter.panel}>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <span>filler</span>
                                <span>filler</span>
                                <span>filler</span>
                                <span>filler</span>
                                <span>filler</span>
                            </div>
                        </AccordeonItem>
                        
                        )
                    }
        
                </div>
            </div>
            {moments.length > 0 
                    ?
                    <InfiniteScroll
                        dataLength={moments.length - 6} //This is important field to render the next data
                        next={fetchData}
                        hasMore={hasMore}
                        loader={<Loader/>}>
                    <div className='cards__container'>
                        {moments.map((item) =>
                                <CatalogCard key={item.id}
                                            title={item.title}
                                            image={item.original_pic.attachment}
                                            minPrice={item.min_price} 
                                            maxPrice={item.max_price}
                                            isLiked={item.is_liked_by_user}
                                            likesCount={item.likes}
                                />)}
                    </div>
                    </InfiniteScroll>
                :
                <NoMatches/>
                // <Loader/>
            }
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Catalog;

