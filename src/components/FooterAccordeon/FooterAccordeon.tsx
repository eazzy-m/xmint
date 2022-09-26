import { useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';
import MuiAccordionSummary, {AccordionSummaryProps,} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FooterUL from "../../components/FooterUL/FooterUL";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider';
import {companyList, helpList, marketplaceList, followUsList} from "../../constants/FooterConstants/constants";


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(() => ({
    backgroundColor: "inherit",
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} />
  ))(() => ({
    backgroundColor:"inherit",
    color: "#7D8081",
    textTransform: "uppercase"
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));



const FooterAccordeon = () => {

    const [listOfPanels, setListOfPanels] = useState<string[]>(['panel1', 'panel2', 'panel3', 'panel4']);

    const togglePanel = (isExpanded: boolean, panel: string) => {
        if (isExpanded) {
           const filteredListOfPanels = listOfPanels.filter(panelItem => panelItem !== panel); 
           setListOfPanels(filteredListOfPanels);
        } else {
            setListOfPanels([...listOfPanels, panel]);
        }
    };

             
  return (

    <div>
        <Divider sx={{background: "#FFFFFF", opacity: 0.1}}/>
      <Accordion expanded={listOfPanels.includes('panel1')} onChange={(_, isExpanded) => togglePanel(!isExpanded, 'panel1')}>
        <AccordionSummary
          expandIcon={listOfPanels.includes('panel1') ? <ArrowDropDownIcon sx={{color: "#7D8081"}}/> : <ClearIcon sx={{color: "#7D8081"}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>marketplace</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FooterUL  linksList={marketplaceList}/>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{background: "#FFFFFF", opacity: 0.1}}/>
      <Accordion expanded={listOfPanels.includes('panel2')} onChange={(_, isExpanded) => togglePanel(!isExpanded, 'panel2')}>
        <AccordionSummary
          expandIcon={listOfPanels.includes('panel2') ? <ArrowDropDownIcon sx={{color: "#7D8081"}} /> : <ClearIcon sx={{color: "#7D8081"}}/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>company</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FooterUL linksList={companyList}/>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{background: "#FFFFFF", opacity: 0.1}}/>
      <Accordion expanded={listOfPanels.includes('panel3')} onChange={(_, isExpanded) => togglePanel(!isExpanded, 'panel3')}>
        <AccordionSummary
          expandIcon={listOfPanels.includes('panel3') ? <ArrowDropDownIcon sx={{color: "#7D8081"}} /> : <ClearIcon sx={{color: "#7D8081"}}/>}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>help</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FooterUL linksList={helpList}/>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{background: "#FFFFFF", opacity: 0.1}}/>
      <Accordion expanded={listOfPanels.includes('panel4')} onChange={(_, isExpanded) => togglePanel(!isExpanded, 'panel4')}>
        <AccordionSummary
          expandIcon={listOfPanels.includes('panel4') ? <ArrowDropDownIcon sx={{color: "#7D8081"}}/> : <ClearIcon sx={{color: "#7D8081"}}/>}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>follow us</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FooterUL linksList={followUsList}/>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{background: "#FFFFFF", opacity: 0.1}}/>
    </div>
  );
};

export default FooterAccordeon;