import { useEffect, useState, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import hide from "../../assets/hide/Hide.svg";
import { getMoments } from '../../api/getDrops';
import { getSportTypes } from '../../api/getSprotTypes';
import  {token } from "../../redux/store";
import { IGoods } from '../../interfaces/IGoods';
import { IFilters } from '../../interfaces/IFiltersList';
import { IBrands } from '../../interfaces/IBrands';
import { IAthlete } from '../../interfaces/IAthletes';
import { IPlaces } from '../../interfaces/IPlaces';
import { FormControlLabel, Switch, Divider, Button, Menu, MenuItem} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { buttonStyles, marketplaceMenuStyles, filterStyle, activeFilterStyle } from "../Header/HederStyleConstants";
import { getFilteres } from '../../api/getDrops';
import Footer from '../Footer/Footer';
import Banner from '../../components/Banner/Banner';
import CatalogFilters from '../../components/CatalogFilters/CatalogFilters';
import CatalogTitle from '../../components/CatalogTitle/CatalogTitle';
import NoMatches from '../../components/NoMatches/NoMatches';
import CatalogCard from '../../components/CatalogCard/CatalogCard';
import Loader from '../../components/Loader/Loader';

import "./Catalog.scss";

import { colors, fontFive } from "../../constants/inlineConstants";
import FilterChips from '../../components/FIltersChips/FilterChips';
const {greyColor} = colors;
const momentFooterStyle = {color: greyColor, width: "20px", height: "20px"};
const formLabelStyle = {display: 'flex', justifyContent: "space-between", marginLeft: 0, width: "100%"};
const clearAllButtonStyle = {textTransform: "capitalize", color: greyColor, fontSize: "14px", lineHeight: "18px", font: fontFive}
const Catalog = () => {

    const location = useLocation();
    const [moments, setMoments] = useState<IGoods[]>([]);
    const [sportTypes, setSportTypes] = useState([{name: 'New'}, {name: 'Surfing'}, {name: 'Skateboarding'}, {name: 'Motocross'}]);
    const [filters, setFilters] = useState<IFilters>({ athletes: [], brands: [], places: [] });
    const [summaryFiltersLabels, setSummaryFiltersLabels] = useState<string[]>([])
    const [activeFilters, setActiveFilters] = useState({places: '', brands: '', athletes: ''});
    const [additionalFilter, setAdditionalFilter] = useState<string>('Popular');
    const [itemsCount, setItemsCount] = useState<number>(0);
    const category = location.state as string;
    const [activeCategory, setActiveCategory] = useState(category);
    const [offset, setOffset] = useState(9);
    const [mode, setMode] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const storageToken = useSelector(token);
    const [summaryFilters, setSummaryFilters] = useState<string[]>([]);
    const [anchorMarketplaceEl, setAncorMarketplaceEl] = useState<null | HTMLElement>(null);
    const openMArketplace = Boolean(anchorMarketplaceEl);
    const [clear, setClear] = useState(false);
    const listOfAdditionalFilters = ['Popular', 'Newest', 'Highest price', 'Lowest price', 'Most likes'];
    const {places, brands, athletes} = activeFilters;
    const getDefaultData = (category: string | null, places: string | undefined, brands: string | undefined, athletes: string | undefined) => {
        setActiveCategory(category ? category : "All Moments");
            getSportTypes(storageToken)
                .then(res => setSportTypes(res.data.results))
                .then(() => {
                    getMoments(storageToken, activeCategory === 'All Moments' ? '' : activeCategory, 9, 0, places, brands, athletes)
                        .then(res => {
                           // console.log(res.data.data.results);
                            setItemsCount(res.data.data.count);
                            setMoments(res.data.data.results);
                        })
                        .catch(err => console.log('get moments error: ', err));
                    })
                    .catch(err => console.log('get sport types or moments error: ', err));
    };


    useEffect(() => {
        for (let keys in filters) {
            getFilteres(keys, storageToken)
                .then(res => {
                    setFilters(prevState => ({
                        ...prevState,
                        [keys]: res.data.results
                    }))
                    const compareLabels = (): string[] => { 
                       return res.data.results.map((list: IBrands | IPlaces | IAthlete) => {
                          return keys === 'athletes' ? list.full_name + '' : list.name + '';
                        })
                    }
                setSummaryFiltersLabels(prevState => ([...prevState, ...compareLabels()]))
                })
                .catch(err => console.log(err));
        }
        let uniqueChars = [] as string[];
        summaryFilters.forEach((element) => {
            if (!uniqueChars.includes(element)) {
                uniqueChars.push(element);
            }
        });
        setSummaryFiltersLabels(uniqueChars)
    }, []);


    useEffect(() => {

        getDefaultData(activeCategory, places, brands, athletes);
        console.log('rerender');
    }, [moments.length, places, brands, athletes]);

    useEffect(() => {
        if (places || brands || athletes) {
            setClear(true)
        }
    }, [places, brands, athletes]);

    const itemsFilter = (evt: SyntheticEvent) => {
        //@ts-ignore
        const {name} = evt.target;
            setActiveCategory(name);
            const category = name === "All Moments" ? '' : name;
            getMoments(storageToken, category)
                .then(res => {
                    setItemsCount(res.data.data.count);
                    setMoments(res.data.data.results);
                })
                .catch(err => console.log(err));
    };

        const toggleSwitch = () => {
            setMode(!mode);
        };

        const handleMarketplaceClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {
            setAncorMarketplaceEl(evt.currentTarget);
        };

        const handleClose = (): void => {
            setAncorMarketplaceEl(null);
        };

        const selectAdditionalFilter = (evt: SyntheticEvent) => {
            //@ts-ignore
            setAdditionalFilter(evt.target.id);
            handleClose();
        };

        const fetch = async () => {
            const filter = activeCategory === "All Moments" ? '' : activeCategory;
            const res = await getMoments(storageToken, filter, 9, offset, places, brands, athletes);
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
 
        const fillFilters = (title: string, filters: string[], filtersLabels: string[]): void => {
            console.log('fill');
            const filtersCombiner = (filters: string[]): string => {
                const concatfilter = filters.map((elem) => elem.split(' ').join('+'));
                return concatfilter.join('%2C');
            };
            //prevState => ([...prevState, ...filtersLabels])
            setSummaryFilters([...summaryFilters, ...filtersLabels])
         

            setActiveFilters(prevState => ({
                    ...activeFilters,
                    [title]: filtersCombiner(filters)
            }));
        };

        const clearAll = () => {
            console.log('clear all ');
            setSummaryFilters([])
            setSummaryFiltersLabels([])
            setActiveFilters({places: '', brands: '', athletes: ''})
            setClear(false)
        }
        // console.log('summary filters: ', summaryFilters, 'SummaryFiltersLabels: ', summaryFiltersLabels, 'activeFilters: ', {places, brands, athletes});
        


  return (
    <>
      <div className='main-page'>
        <CatalogTitle date='August 21, 2021'/>
        <Banner/>
        <div className='filters__header'>
            <div style={{display: "flex"}}>
                <h1 className='filters__title'>{activeCategory}</h1>
                <span className='filters__items-count'>{itemsCount} items</span>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <div className='filters__hide'>
                    <span className='filters__hide-title'>Hide filter</span>
                    <img src={hide} alt="hide" style={momentFooterStyle} />
                </div>
                <div style={{width: "205px", display: "flex", alignItems: "center"}}>
                    <span className='sorted-title'>Sort by: </span>
                    <Button sx={buttonStyles}
                            aria-controls={openMArketplace ? "header__span" : undefined}
                            aria-expanded={openMArketplace ? true : undefined}
                            endIcon={openMArketplace ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                            aria-haspopup="true"
                            id='header__button'
                            onClick={handleMarketplaceClick}
                            >{additionalFilter}</Button>
                    <Menu id='header__span'
                          anchorEl={anchorMarketplaceEl}
                          open={openMArketplace}
                          onClose={handleClose}
                          PaperProps={{elevation: 0, sx: marketplaceMenuStyles}}
                          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                          MenuListProps={{ "aria-labelledby" : "header__button" }}>
                        {listOfAdditionalFilters.map((filter, index) =>
                            <MenuItem sx={additionalFilter === filter ? activeFilterStyle : filterStyle}
                                    id={filter} key={index} onClick={selectAdditionalFilter}>
                                {filter}
                            </MenuItem>
                            )}
                    </Menu>
                </div>
            </div>
        </div>
        <div className='main-content'>
            <div className="filters__container">
                
                <div className='filters'>
                <button className={`filters__button ${"All Moments" === activeCategory && "filters__button_active"}`}
                                onClick={itemsFilter}
                                name="All Moments">
                                All Moments
                            </button>
                    {sportTypes.map((type, index) => 
                            <button key={index} onClick={itemsFilter} name={type.name}
                                className={`filters__button ${type.name === activeCategory && "filters__button_active"}`}>
                                {type.name}
                            </button>
                            )}
                    <div>
                        <div className='filters-summary__container'>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h3 className='filters-summary__title'>Filter</h3>
                                {!!summaryFilters.length && <Button sx={clearAllButtonStyle} onClick={clearAll} variant="text">Clear all</Button>}                                
                            </div>
                            <div className='filters-wrapper'>
                                <FilterChips filters={summaryFilters}/>

                            </div>
                        </div>
                        <Divider/>
                        <FormControlLabel sx={formLabelStyle} labelPlacement="start" label="Enchanced view"
                                control={<Switch checked={mode} onChange={toggleSwitch} name="Enchanced view" color="primary"/>}/>
                        <Divider/>
                    </div>
                    <div className='accordeons_container'>
                        <CatalogFilters filters={filters} fillFilters={fillFilters} labelsList={summaryFiltersLabels}/>
                    </div>
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
                                            image={mode ? item.enhanced_pic.attachment : item.original_pic.attachment}
                                            minPrice={item.min_price} 
                                            maxPrice={item.max_price}
                                            isLiked={item.is_liked_by_user}
                                            likesCount={item.likes}
                                />)}
                    </div>
                    </InfiniteScroll>
                :
                <NoMatches/>
            }
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Catalog;

