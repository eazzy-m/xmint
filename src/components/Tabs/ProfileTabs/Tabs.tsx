import {ReactNode, useState} from 'react';
import { getDrops, getEditions, getSaved, getOnSale } from '../../../api/getDrops';
import { useSelector } from 'react-redux';
import { userdata, token } from '../../../redux/store';
import { IItems } from '../../../interfaces/IItems';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabComponent from "../../TabComponent/ProfileTabComponents/TabComponent";
import {fontFive, smallText, colors} from "../../../constants/inlineConstants"
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const {greyColor, darkColor} = colors
const style = {
  ...fontFive,
  ...smallText,
  color: greyColor,
  padding: 0,
  '&.Mui-selected': {
   color: darkColor,
 },
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const [drops, setDrops] = useState<IItems>({count: 0, next: null, previous: null, results: []});
  const [saved, setSaved] = useState<IItems>({count: 0, next: null, previous: null, results: []});
  const [onSale, setOnSale] = useState<IItems>({count: 0, next: null, previous: null, results: []});
  const [editions, setEditions] = useState<IItems>({count: 0, next: null, previous: null, results: []});

  const user = useSelector(userdata);
  const userId = user.id;

  const storeToken = useSelector(token);

  const fetchDrops = () => {
    getDrops(userId, storeToken)
      .then(res => setDrops(res.data))
      .catch(err => console.log(err))
  };
  const fetchEditions = () => {
    getEditions(userId, storeToken)
      .then(res => setEditions(res.data))
      .catch(err => console.log(err))
  };
  const fetchSaved = () => {
    getSaved(userId, storeToken)
      .then(res => setSaved(res.data))
      .catch(err => console.log(err))
  };
  const fetchOnSale = () => {
    getOnSale(userId, storeToken)
      .then(res => setOnSale(res.data))
      .catch(err => console.log(err))
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={style} onClick={fetchEditions} label={`My Gallery ${editions?.count}`} {...a11yProps(0)} />
          <Tab sx={style} onClick={fetchDrops} label={`Drops ${drops?.count}`} {...a11yProps(1)} />
          <Tab sx={style} onClick={fetchOnSale} label={`For Sale ${onSale?.count}`} {...a11yProps(2)}/>
          <Tab sx={style} onClick={fetchSaved} label={`Saved ${saved?.count}`} {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0} >
        <TabComponent items={editions?.results} fillPhrase={'Once you purchase your moments, they will appear here.'}/>
      </TabPanel>
      <TabPanel value={value} index={1} >
        <TabComponent items={drops?.results} fillPhrase={'Once you purchase your drops, they will appear here.'}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabComponent items={onSale?.results} fillPhrase={'Once you list your moments for sale, they will appear here.'}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabComponent items={saved?.results} fillPhrase={'Once you save your moments, they will appear here.'}/>
      </TabPanel>
    </Box>
  );
}