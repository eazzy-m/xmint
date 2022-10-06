import {useState} from 'react';
import AccordeonItem from '../AccordionItem/AccordionItem';
import { IFilters } from '../../interfaces/IFiltersList';
import FilterItem from '../FilterItem/FilterItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { colors } from '../../constants/inlineConstants';
const { greyColor } = colors;

const CatalogFilters = (props: {fillFilters: (title: string, filters: string[], filtersLabels: string[]) => void,
     labelsList: string[], filters: IFilters}) => {

    const {fillFilters, labelsList, filters} = props;

    const [listOfPanels, setListOfPanels] = useState<string[]>(['panel1', 'panel2', 'panel3']);

    const togglePanel = (isExpanded: boolean, panel: string): void => {
        if (isExpanded) {
           const filteredListOfPanels = listOfPanels.filter(panelItem => panelItem !== panel); 
           setListOfPanels(filteredListOfPanels);
        } else {
            setListOfPanels([...listOfPanels, panel]);
        }
    };

    const listOfFilters = [
      {title: 'athletes', panel: "panel1", checkboxes: filters.athletes,  listOfPanels, togglePanel, fillFilters},
      {title: 'brands', panel: "panel2", checkboxes: filters.brands, listOfPanels, togglePanel, fillFilters},
      {title: 'places', panel: "panel3", checkboxes: filters.places, listOfPanels, togglePanel, fillFilters},
    ];


  return (
        <>    
        { listOfFilters.map((item, index) => 
                <AccordeonItem key={index} panel={item.panel} listOfPanels={listOfPanels} 
                               title={item.title} titleMode='capitalize' togglePanel={togglePanel} 
                               divider={'top'} mode='dark' collapseIcon={<ArrowDropDown sx={{color: greyColor}}/>}>
                    <FilterItem listOfLabels={labelsList} fillFilters={fillFilters} checkboxes={item.checkboxes} title={item.title}/>
                </AccordeonItem>
            )
        }
      </>
  );
};

export default CatalogFilters;