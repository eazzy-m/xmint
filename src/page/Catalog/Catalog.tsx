import { useEffect, useState, SyntheticEvent } from 'react';
import Footer from '../Footer/Footer';
import Banner from '../../components/Banner/Banner';
import hide from "../../assets/hide/Hide.svg";
import { getMoments } from '../../api/getDrops';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import  {token } from "../../redux/store";
import { IGoods } from '../../interfaces/IGoods';
import { colors } from "../../constants/inlineConstants";
import CatalogTitle from '../../components/CatalogTitle/CatalogTitle';
import NoMatches from '../../components/NoMatches/NoMatches';
import { FormControlLabel, Switch, Divider, Button, Menu, MenuItem, FormGroup, Checkbox, TextField } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import AccordeonItem from '../../components/AccordionItem/AccordionItem';
import { getSportTypes } from '../../api/getSprotTypes';
import CatalogCard from '../../components/CatalogCard/CatalogCard';
import Loader from '../../components/Loader/Loader';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { buttonStyles, marketplaceMenuStyles, filterStyle, activeFilterStyle } from "../Header/HederStyleConstants";
import "./Catalog.scss";
const {greyColor} = colors;
const momentFooterStyle = {color: greyColor, width: "20px", height: "20px"};


const Catalog = () => {

    const location = useLocation();
    const [moments, setMoments] = useState<IGoods[]>([]);
    const [sportTypes, setSportTypes] = useState([{name: 'New'}, {name: 'Surfing'}, {name: 'Skateboarding'}, {name: 'Motocross'}]);
    const [listOfPanels, setListOfPanels] = useState<string[]>(['panel1', 'panel2', 'panel3', 'panel4', 'panel5', 'panel6']);
    const [additionalFilter, setAdditionalFilter] = useState<string>('Popular');
    const [itemsCount, setItemsCount] = useState<number>(0);
    const filter = location.state as string;
    const [activeFilter, setActiveFilter] = useState(filter);
    const [offset, setOffset] = useState(9);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const storageToken = useSelector(token);
    const [anchorMarketplaceEl, setAncorMarketplaceEl] = useState<null | HTMLElement>(null);
    const openMArketplace = Boolean(anchorMarketplaceEl);
    

    const togglePanel = (isExpanded: boolean, panel: string): void => {
        if (isExpanded) {
           const filteredListOfPanels = listOfPanels.filter(panelItem => panelItem !== panel); 
           setListOfPanels(filteredListOfPanels);
        } else {
            setListOfPanels([...listOfPanels, panel]);
        }
    };
    const listOfAdditionalFilters = ['Popular', 'Newest', 'Highest price', 'Lowest price', 'Most likes'];
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
                    setItemsCount(res.data.data.count);
                    setMoments(res.data.data.results);
                })
                .catch(err => console.log(err));
    };

        const toggleSwitch = () => {
            setLoading(!loading);
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
            handleClose()
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
                          PaperProps={{
                            elevation: 0,
                            sx: marketplaceMenuStyles
                            }}
                          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                          MenuListProps={{
                        "aria-labelledby" : "header__button"
                    }}>
                        {
                            listOfAdditionalFilters.map((filter, index) =>
                            <MenuItem 
                                    sx={additionalFilter === filter ? activeFilterStyle : filterStyle}
                                    id={filter}
                                    key={index}
                                    onClick={selectAdditionalFilter}>
                                {filter}
                            </MenuItem>
                            )
                        }
                    </Menu>
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
                    <div className='accordeons_container'>
                        <AccordeonItem divider='bottom' mode='light' listOfPanels={listOfPanels} title={'Athlete'} togglePanel={togglePanel} panel={'panel1'}>
                            <FormGroup>
                                <TextField size="small" id="outlined-basic" label="Search" variant="outlined" />
                                <FormControlLabel control={<Checkbox />} label="Bam Margera" />
                                <FormControlLabel control={<Checkbox />} label="Ed Templeton" />
                                <FormControlLabel control={<Checkbox />} label="Jason Lee" />
                                <FormControlLabel control={<Checkbox />} label="Mark Gonzales" />
                            </FormGroup>
                        </AccordeonItem>
                        <AccordeonItem divider='bottom' mode='light' listOfPanels={listOfPanels} title={'Brand'} togglePanel={togglePanel} panel={'panel2'}>
                            <FormGroup>
                                <TextField size="small" id="outlined-basic" label="Search" variant="outlined" />
                                <FormControlLabel control={<Checkbox />} label="Billabong" />
                                <FormControlLabel control={<Checkbox />} label="Burton" />
                                <FormControlLabel control={<Checkbox />} label="Element" />
                                <FormControlLabel control={<Checkbox />} label="Powell Peralta" />
                            </FormGroup>
                        </AccordeonItem>
                        <AccordeonItem divider='bottom' mode='light' listOfPanels={listOfPanels} title={'Drop'} togglePanel={togglePanel} panel={'panel3'}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Xmint 1" />
                                <FormControlLabel control={<Checkbox />} label="Xmint 2" />
                                <FormControlLabel control={<Checkbox />} label="Xmint 3" />
                                <FormControlLabel control={<Checkbox />} label="Xmint 4" />
                            </FormGroup>
                        </AccordeonItem>
                        <AccordeonItem divider='bottom' mode='light' listOfPanels={listOfPanels} title={'Price range'} togglePanel={togglePanel} panel={'panel4'}>
                            <FormGroup row={true}>
                                <TextField sx={{width: "106px"}} size="small" id="outlined-basic" label="min" variant="outlined" />
                                <TextField sx={{width: "106px", margin: "0 10px"}} size="small" id="outlined-basic" label="max" variant="outlined" />
                                <Button variant='contained' disabled>Go</Button>
                            </FormGroup>
                        </AccordeonItem>
                        <AccordeonItem divider='bottom' mode='light' listOfPanels={listOfPanels} title={'Gender'} togglePanel={togglePanel} panel={'panel5'}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Male" />
                                <FormControlLabel control={<Checkbox />} label="Female" />
                            </FormGroup>
                        </AccordeonItem>
                        <AccordeonItem listOfPanels={listOfPanels} title={'Place'} togglePanel={togglePanel} panel={'panel6'}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Street" />
                                <FormControlLabel control={<Checkbox />} label="Park" />
                                <FormControlLabel control={<Checkbox />} label="Halfpipe" />
                            </FormGroup>
                        </AccordeonItem>
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
            }
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Catalog;

