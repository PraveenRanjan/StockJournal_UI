import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Transactions from './Transactions';
import FileUpload from './FileUpload';
import Summray from './summary/Summary';
import HoldingWrapper from './holding/HoldingWrapper';
import SummaryTableContainer from './summaryTable/SummaryTableContainer';
import UtilWrapper from './utilities/UtilWrapper';
import { Chip, Alert, AlertTitle, FormControl, InputLabel, Select } from '@mui/material';


function TabPanel(props) {
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Journal() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [files, setFiles] = React.useState();
  const [userId, setUserId] = React.useState();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenuClose = (value) => {
    console.log('menu value-> ', value);
    setUserId(value);
    setAuth(true);
    setAnchorEl(null);
  };

  const handleUserSelect = (event) => {
    setUserId(event.target.value);
    setAuth(true);
  }


  return (
    <>

      <AppBar position="static" color='transparent'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trading Journal
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small">User</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={userId}
              label="User"
              onChange={handleUserSelect}
            >
              <MenuItem value={'Test'}>Test</MenuItem>
              <MenuItem value={'ar'}>AR</MenuItem>
              <MenuItem value={'pr'}>PR</MenuItem>
            </Select>
          </FormControl>

        </Toolbar>
      </AppBar>

      {auth ?
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', height: 50 }}>

            <Tabs value={value} onChange={handleTabChange} >
              <Tab label="Transactions" {...a11yProps(0)} />
              <Tab label="Summary" {...a11yProps(1)} />
              <Tab label="Summary Table" {...a11yProps(2)} />
              <Tab label="File upload" {...a11yProps(3)} />
              <Tab label="Holding" {...a11yProps(4)} />
              <Tab label="Utilities" {...a11yProps(5)} />
            </Tabs>

          </Box>
          <TabPanel value={value} index={0}>
            <Box sx={{ height: '78vh', width: '174vh', overflow: 'auto' }} >
              <Transactions userId={userId} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{  height: '84vh', width: '180vh',  overflow: 'auto' }} >
              <Summray userId={userId} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box sx={{  height: '84vh', width: '174vh',  overflow: 'auto' }} >
              <SummaryTableContainer userId={userId} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box sx={{  height: '84vh', width: '174vh',  overflow: 'auto' }} >
              <FileUpload userId={userId} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Box sx={{  height: '84vh', width: '174vh',  overflow: 'auto' }} >
              <HoldingWrapper userId={userId} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Box sx={{ height: '84vh', width: '174vh',  overflow: 'auto' }} >
              <UtilWrapper userId={userId} />
            </Box>
          </TabPanel>
        </>
        :
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          User not select — <strong>Please select User!</strong>
        </Alert>
      }


    </>
  )
}