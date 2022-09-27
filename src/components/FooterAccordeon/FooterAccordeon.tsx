import { useState } from 'react';
import Divider from '@mui/material/Divider';
import {companyList, helpList, marketplaceList, followUsList} from "../../constants/FooterConstants/constants";
import AccordeonItem from '../AccordionItem/AccordionItem';
import { IAccordion } from '../../interfaces/IAccordion';


const FooterAccordeon = () => {

    const [listOfPanels, setListOfPanels] = useState<string[]>(['panel1', 'panel2', 'panel3', 'panel4']);

    const togglePanel = (isExpanded: boolean, panel: string): void => {
        if (isExpanded) {
           const filteredListOfPanels = listOfPanels.filter(panelItem => panelItem !== panel); 
           setListOfPanels(filteredListOfPanels);
        } else {
            setListOfPanels([...listOfPanels, panel]);
        }
    };

    const listOfAccordions: IAccordion[] = [
      {title: 'marketplace', listOfLinks: marketplaceList, panel: 'panel1', listOfPanels, togglePanel},
      {title: 'company', listOfLinks: companyList, panel: 'panel2', listOfPanels, togglePanel},
      {title: 'help', listOfLinks: helpList, panel: 'panel3', listOfPanels, togglePanel},
      {title: 'follow us', listOfLinks: followUsList, panel: 'panel4', listOfPanels, togglePanel}
    ];

      
  return (

    <div>
      {
        listOfAccordions.map((item, index) => 
            <AccordeonItem key={index} panel={item.panel} listOfPanels={listOfPanels} linksList={item.listOfLinks} title={item.title} togglePanel={togglePanel}/>
          )
      }
      <Divider sx={{background: "#FFFFFF", opacity: 0.1}}/>
    </div>
  );
};

export default FooterAccordeon;