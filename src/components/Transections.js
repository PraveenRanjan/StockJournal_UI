import react, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { getTransectionData } from '../api';


const columns = [
  { field: 'name', headerName: 'name', width: 150 },
  { field: 'symbol', headerName: 'Symbol', width: 100 },
  { field: 'transactionType', headerName: 'Type', width: 90 },
  { field: 'quantity', headerName: 'quantity', width: 90 },
  { field: 'price', headerName: 'price', width: 90 },
  { field: 'lastTradingPrice', headerName: 'lastTradingPrice', width: 150 },
  { field: 'totalValue', headerName: 'totalValue', width: 150 },
  { field: 'stopLoss', headerName: 'stopLoss', width: 150 },
  { field: 'strategy', headerName: 'strategy', width: 90 },
  { field: 'comments', headerName: 'comments', width: 150 },
  { field: 'action', headerName: 'action', width: 90 },

];


export default function Transections(props) {
  const { userId } = props;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getTransectionData(userId).then(data => {
      setRows(data);
    });
  }, [userId]);
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}