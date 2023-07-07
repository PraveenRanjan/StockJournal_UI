import React, { useState } from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from "@mui/material";

export default function DateRange (props) {
    const {handledateChange} = props;
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const handleStartDate = (date) => {
      setStartDate(date);

      handledateChange(date, endDate);
    }

    const handleEndDate = (date) => {
      setEndDate(date);
      handledateChange(startDate, date);
    }

    return (
        <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={startDate} onChange={handleStartDate} />
        <DatePicker value={endDate} onChange={handleEndDate}/>
      </LocalizationProvider>
      </Box>
    );
}