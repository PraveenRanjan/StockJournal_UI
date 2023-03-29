import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DropzoneArea } from "mui-file-dropzone";
import Transections from './Transections';
import { uploadFile } from "../api"


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
    const [value, setValue] = React.useState(0);
    const [files, setFiles] = React.useState();

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleFileChange = (files) => {
      console.log('files-> ', files)
        setFiles(files);
        if(files.length){
          uploadFile(files[0]);
        }

      }
    return (
    <>
        <DropzoneArea onChange={handleFileChange} />
   
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label="Transections" {...a11yProps(0)} />
    <Tab label="Summry" {...a11yProps(1)} />
    
  </Tabs>
</Box>
<TabPanel value={value} index={0}>
<Transections />
</TabPanel>
<TabPanel value={value} index={1}>
Summry
</TabPanel>

      </>
    )
}