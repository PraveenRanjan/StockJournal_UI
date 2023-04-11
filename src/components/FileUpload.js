import react, { useState } from 'react';
import { DropzoneArea } from "mui-file-dropzone";
import { uploadFile } from "../api";
import { Grid, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const HOLDINGS = 'holdings';

export default function FileUpload(props) {
  const { userId } = props;
  const [type, setType] = useState('transactions');
  const [cash, setCash] = useState();
  const [newFund, setNewFund] = useState();
  const [showCash, setShowCash] = useState(false);
  const [file, setFile] = useState();

  const handleFileChange = (files) => {
    console.log('files--> ', files);
    if (files.length) {
      setFile(files[0]);
    }
  }

  const handleChange = (event) => {
    const uploadType = event.target.value;
    setType(uploadType);
    setShowCash(uploadType === HOLDINGS);
  };

  const handleCash = (event) => {
    console.log('handleCash-> ', event.target.value)
    setCash(event.target.value);
  }
  const handleFund = (event) => {
    console.log('handleCash-> ', event.target.value)
    setNewFund(event.target.value);
  }
  const handleClick = (event) => {
    uploadFile(userId, type, file, cash, newFund);
  }
  return (
    <>

      <Grid container spacing={8}>
        <Grid item xs={6}>
          <DropzoneArea onChange={handleFileChange} filesLimit={1} />
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={type}
              onChange={handleChange}
            >
              <FormControlLabel value="transactions" control={<Radio />} label="Transactions" />
              <FormControlLabel value="holdings" control={<Radio />} label="Holdings" />
            </RadioGroup>
            {/* <FormLabel id="demo-cash"></FormLabel> */}
            {showCash &&
              <>
                <TextField
                  id="outlined-number"
                  label="Cash"
                  type="number"
                  value={cash}
                  onChange={handleCash}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-number"
                  label="newFund"
                  type="number"
                  value={newFund}
                  onChange={handleFund}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            }

            <button type="submit" onClick={handleClick}>Submit</button>
          </FormControl>
        </Grid>

      </Grid>
    </>
  );
}