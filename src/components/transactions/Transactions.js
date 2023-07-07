import React, { useMemo, useState, useEffect } from 'react';

import dayjs from 'dayjs';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import DateRange from '../DateRange';
import { getTransectionData, exportCsv } from '../../api';
import { HOLDINGS, TRANSACTIONS } from '../../Constants';
import TransactionsTable from './TransactionsTable';


export default function Transections(props) {
  const { userId } = props;
  const [rows, setRows] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    getTransectionData(userId).then(data => {
      setRows(data);
    });
  }, [userId]);

  const handleDateChange = (start, end) => {
    setStartDate(dayjs(start).format('YYYY-MM-DD'));
    setEndDate(dayjs(end).format('YYYY-MM-DD'));
  }

  const handleExportData = () => {
    exportCsv(userId, TRANSACTIONS, startDate, endDate);
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
      >
        <Button
          color="primary"
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
          variant="contained"
        >
          Export All Data
        </Button>
        <DateRange 
          handledateChange={handleDateChange} 
          slotProps={{ textField: { size: 'small' } }}
        />
      </Box>
      {rows && <TransactionsTable userId={userId} rows={rows} />}
    </>
  );
}