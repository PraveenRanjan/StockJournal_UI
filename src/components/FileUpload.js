import react, { useState } from 'react';
import dayjs from 'dayjs';
import { DropzoneArea } from "mui-file-dropzone";
import { uploadFile } from "../api";
import { Grid, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HOLDINGS, TRANSACTIONS } from '../Constants';



export default function FileUpload(props) {
  const { userId } = props;
  const [type, setType] = useState(TRANSACTIONS);
  const [cash, setCash] = useState();
  const [newFund, setNewFund] = useState();
  const [showCash, setShowCash] = useState(false);
  const [file, setFile] = useState();
  const [date, setDate] = useState(dayjs());

  const handleFileChange = (files) => {
    // console.log('files--> ', files);
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
    // console.log('handleCash-> ', event.target.value)
    setCash(event.target.value);
  }
  const handleFund = (event) => {
    // console.log('handleCash-> ', event.target.value)
    setNewFund(event.target.value);
  }
  const handleClick = (event) => {

    uploadFile(userId, type, file, dayjs(date).format('YYYY-MM-DD'), cash, newFund);
  }

  const handleDate = (input) => {
    setDate(input);
  }

  return (
    <>

      <Grid container spacing={8}>
        <Grid item xs={6}>
          <DropzoneArea onChange={handleFileChange} filesLimit={1} />
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={date} onChange={handleDate}/>
            </LocalizationProvider>
            
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={type}
              onChange={handleChange}
            >
              <FormControlLabel value={TRANSACTIONS} control={<Radio />} label="Transactions" />
              <FormControlLabel value={HOLDINGS} control={<Radio />} label="Holdings" />
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