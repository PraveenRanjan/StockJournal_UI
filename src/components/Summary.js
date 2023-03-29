import react, {useEffect, useState} from 'react';
import axios from 'axios';
import { DataGrid} from '@mui/x-data-grid';
import { getTransectionData } from '../api';

// "lastUpdate": "2023-03-25",
//     "id": "641e2b3525b36c2e0ead6206",
//     "transactionDate": "2023-03-10",
//     "symbol": "APARINDS",
//     "transactionType": "BUY",
//     "quantity": 5,
//     "price": 2230.04,
//     "lastTradingPrice": 2294.1,
//     "totalValue": 11150.2,
//     "stopLoss": 200,
//     "strategy": "Long",
//     "comments": "Buy on BO",
//     "name": "APARINDS",
//     "action": "new buy"


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

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function Transections() {
  const [rows, setRows] = useState([]);

  useEffect (() => {
    console.log('use effect');
    // axios.get('http://localhost:9080/journal/transactions')
    // .then(res => {
    //   console.log('tx res--> ', res)
    // })
    getTransectionData('ar').then(data => {
      console.log('data-- ', data);
      setRows(data);
    });
    // fetch('http://localhost:9080/journal/transactions', {headers: {'userId': 'ar'}}).then(res => {
    //     console.log('tx res--> ', res)
    //   });
    // txData.forEach(element => {
    //   console.log('txData-> ', txData);
    // });
    // console.log('txData-> ', txData);
    // setRows([]);

  }, []);
  return (
    <div style={{ height:600, width: '100%' }}>
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