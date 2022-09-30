import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';
import MuiAccordionSummary, {AccordionSummaryProps,} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider';
import { colors } from '../../constants/inlineConstants';
import { ReactNode } from 'react';
const { greyColor, whiteColor } = colors;

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(() => ({
    backgroundColor: "inherit",
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} />
  ))(() => ({
    backgroundColor:"inherit",
    color: greyColor,
    textTransform: "uppercase"
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


const AccordeonItem = (props: {title: string,  panel: string, listOfPanels: string[], togglePanel: (isExpanded: boolean, panel: string) => void, children: ReactNode}) => {
  const {title, panel, listOfPanels, togglePanel, children} = props;

  return (
    <div>
      <Divider sx={{background: whiteColor, opacity: 0.1}}/>
        <Accordion expanded={listOfPanels.includes(panel)} onChange={(_, isExpanded) => togglePanel(!isExpanded, panel)}>
            <AccordionSummary
              expandIcon={listOfPanels.includes(panel) ? <ArrowDropDownIcon sx={{color: greyColor}}/> : <ClearIcon sx={{color: greyColor}}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
          </Accordion>
    </div>
  );
};

export default AccordeonItem;