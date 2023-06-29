import React, { useMemo, useState, useEffect } from 'react';

import dayjs from 'dayjs';
import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import DateRange from '../DateRange';
import { getTransectionData,  exportCsv} from '../../api';
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

  // const handleDateChange = (start, end) => {
  //   setStartDate(dayjs(start).format('YYYY-MM-DD'));
  //   setEndDate(dayjs(end).format('YYYY-MM-DD'));
  // }

  // const handleExportData = () => {
  //   exportCsv(userId, TRANSACTIONS, startDate, endDate);
  // }



  //should be memoized or stable
  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: 'symbol', //access nested data with dot notation
  //       header: 'Symbol',
  //     },
  //     {
  //       accessorKey: 'transactionType',
  //       header: 'Type',
  //     },
  //     {
  //       accessorKey: 'quantity', //normal accessorKey
  //       header: 'Quantity',
  //     },
  //     {
  //       accessorKey: 'price',
  //       header: 'Price',
  //     },
  //     {
  //       accessorKey: 'lastTradingPrice',
  //       header: 'Last Trading Price',
  //     },

  //     {
  //       accessorKey: 'totalValue',
  //       header: 'Total Value',
  //     },
  //     {
  //       accessorKey: 'stopLoss',
  //       header: 'Stop Loss',
  //     },
  //     {
  //       accessorKey:'transactionDate',
  //       header: 'Tx Date'
  //     },
  //     {
  //       accessorKey: 'strategy',
  //       header: 'Strategy',
  //     },
  //     {
  //       accessorKey: 'comments',
  //       header: 'Comments',
  //     },
  //     {
  //       accessorKey: 'action',
  //       header: 'Action',
  //     },   
  //   ],
  //   [],
  // );
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <TransactionsTable userId={userId} rows={rows} />
      {/* {rows && <MaterialReactTable columns={columns} data={rows} style={{innerHeight: 200}}
      renderTopToolbarCustomActions={({ table }) => (
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
          <DateRange handledateChange={handleDateChange}/>
          </Box>
      )}
      initialState={{ pagination: { pageSize: 25, pageIndex: 0 } , density: 'compact'}}
        muiTablePaginationProps={{

          rowsPerPageOptions: [25, 50, 100],
          showFirstButton: true,
          showLastButton: true,
        }} 
        />} */}
    </div>
      
  );
}