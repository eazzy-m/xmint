import { useState } from 'react';
import Divider from '@mui/material/Divider';
import {companyList, helpList, marketplaceList, followUsList} from "../../constants/FooterConstants/constants";
import AccordeonItem from '../AccordionItem/AccordionItem';
import { IAccordion } from '../../interfaces/IAccordion';
import FooterUL from '../FooterUL/FooterUL';
import ClearIcon from '@mui/icons-material/Clear';
import { colors } from '../../constants/inlineConstants';
const { greyColor, whiteColor } = colors;

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
      {title: 'marketplace', listOfLinks: marketplaceList, panel: 'panel1', togglePanel},
      {title: 'company', listOfLinks: companyList, panel: 'panel2', togglePanel},
      {title: 'help', listOfLinks: helpList, panel: 'panel3', togglePanel},
      {title: 'follow us', listOfLinks: followUsList, panel: 'panel4', togglePanel},
    ];

      
  return (
    <>
      {
        listOfAccordions.map((item, index) => 
            <AccordeonItem key={index} panel={item.panel} listOfPanels={listOfPanels} 
                           title={item.title} togglePanel={togglePanel} divider={'top'} 
                           mode='dark' collapseIcon={<ClearIcon sx={{color: greyColor}}/>}>
              <FooterUL linksList={item.listOfLinks}/>
            </AccordeonItem>
          )
      }
      <Divider sx={{background: whiteColor, opacity: 0.1}}/>
    </>
  );
};

export default FooterAccordeon;