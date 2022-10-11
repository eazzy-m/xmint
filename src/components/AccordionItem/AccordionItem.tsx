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
const { greyColor, whiteColor, darkColor } = colors;

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


const AccordeonItem = (props: {title: string,  panel: string, listOfPanels: string[], 
                                togglePanel: (isExpanded: boolean, panel: string) => void,
                                children: ReactNode, divider?: 'top' | "bottom",
                                mode?: 'light' | 'dark', collapseIcon?: ReactNode,
                                titleMode?: 'upperCase' | 'capitalize' | 'lowerCase' }) => {
  const {title, titleMode, panel, listOfPanels, togglePanel, children, divider, mode, collapseIcon} = props;

  const titleModify = () => {
    if (titleMode === 'capitalize') {
      return {textTransform: "capitalize"}
    } else if (titleMode === 'lowerCase') {
      return {textTransform: "lowercase"}
    } else {
      return {textTransform: "uppercase "}
    }
  };

  return (
    <div>
      {
        divider === 'top' && <Divider sx={{background: mode === 'dark' ? whiteColor : darkColor, opacity: 0.1}}/>
      }
        <Accordion  expanded={listOfPanels.includes(panel)} onChange={(_, isExpanded) => togglePanel(!isExpanded, panel)}>
            <AccordionSummary
              expandIcon={listOfPanels.includes(panel) ? <ArrowDropDownIcon sx={{color: greyColor}}/> : collapseIcon}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={titleModify()}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
          </Accordion>
          {
        divider === 'bottom' && <Divider sx={{background: mode === 'dark' ? whiteColor : darkColor, opacity: 0.1}}/>
      }
    </div>
  );
};

export default AccordeonItem;