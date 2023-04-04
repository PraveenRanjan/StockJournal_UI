import react, { useState } from 'react';
import { DropzoneArea } from "mui-file-dropzone";
import { uploadFile } from "../api";
import { Grid, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const HOLDINGS = 'holdings';

export default function FileUpload(props) {
  const { userId } = props;
  const [type, setType] = useState('transactions');
  const [cash, setCash] = useState();
  const [showCash, setShowCash] = useState(false);

  const handleFileChange = (files) => {
    console.log('cash--> ', cash);
    if (files.length) {
      uploadFile(userId, type, files[0], cash);
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
            }

          </FormControl>
        </Grid>

      </Grid>
    </>
  );
}