import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabComponent from "../TabComponent/TabComponent";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const howMuch = [0, 0, 0, 0]

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={`My Gallery ${howMuch[0]}`} {...a11yProps(0)} />
          <Tab label={`Drops ${howMuch[1]}`} {...a11yProps(1)} />
          <Tab label={`For Sale ${howMuch[2]}`} {...a11yProps(2)} />
          <Tab label={`Saved ${howMuch[3]}`} {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TabComponent items={howMuch}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabComponent items={howMuch}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabComponent items={howMuch}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabComponent items={howMuch}/>
      </TabPanel>
    </Box>
  );
}