import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Transactions from './Transactions';
import FileUpload from './FileUpload';
import Summray from './Summary';
import HoldingWrapper from './HoldingWrapper';
import { Chip } from '@mui/material';


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
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [files, setFiles] = React.useState();
  const [userId, setUserId] = React.useState('Test');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenuClose = (value) => {
    console.log('menu value-> ', value);
    setUserId(value);
    setAnchorEl(null);
  };


  return (
    <>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trading Journal
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {/* <AccountCircle /> */}
                <Chip label={userId}  color="primary"></Chip>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
              // onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleMenuClose('Test')}>Test</MenuItem>
                <MenuItem onClick={() => handleMenuClose('ar')}>AR</MenuItem>
                <MenuItem onClick={() => handleMenuClose('pr')}>PR</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabChange} >
          <Tab label="Transactions" {...a11yProps(0)} />
          <Tab label="Summary" {...a11yProps(1)} />
          <Tab label="File upload" {...a11yProps(2)} />
          <Tab label="Holding" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Transactions userId={userId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Summray userId={userId}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FileUpload userId={userId} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <HoldingWrapper userId={userId} />
      </TabPanel>

    </>
  )
}