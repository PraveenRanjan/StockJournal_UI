import react, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Divider, Paper } from '@mui/material';

import Typography from '@mui/material/Typography';
import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
import { getSummaryData } from '../api';
import { formatNumber, roundNumber } from '../util'

//import { display } from '@mui/system';
import CollapsibleTable from './CollapsibleTable';
import SummaryReturnBar from './SummaryReturnBar';

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
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'symbol', headerName: 'Symbol', width: 100 },
  { field: 'transactionType', headerName: 'Type', width: 90 },
  { field: 'quantity', headerName: 'Quantity', width: 90 },
  { field: 'price', headerName: 'price', width: 90 },
  { field: 'lastTradingPrice', headerName: 'lastTradingPrice', width: 150 },
  { field: 'totalValue', headerName: 'totalValue', width: 150 },
  { field: 'stopLoss', headerName: 'stopLoss', width: 150 },
  { field: 'strategy', headerName: 'strategy', width: 90 },
  { field: 'comments', headerName: 'comments', width: 150 },
  { field: 'action', headerName: 'action', width: 90 },

];



const tableColumnNames = ['Symbol', 'Quantity', 'Last Trade Price', 'Profit', 'Return %', 'Buy Value', 'Sell Value', 'Buy Qty', 'Buy Price', 'Sell Qty', 'Sell Price', 'Stop Loss', 'Status', 'Strategy', 'Entry Date', 'Comments', 'Action'];


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',

  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




export default function Summray(props) {
  const { userId } = props;
  const [summaryData, setSummaryData] = useState();
  const [transactionKPI, setTransactionKPI] = useState();
  const [rows, setRows] = useState([]);
  // transactionKPI
  useEffect(() => {
    getSummaryData(userId).then(data => {
      console.log('summary data--> ', data);
      setSummaryData(data);
      setTransactionKPI(data.transactionKPI);
      // setRows(data);
    });
  }, [userId]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

          <Grid item xs={12} md={6} >
            <Card>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                  <div>Avg Win%</div>
                  <div> {formatNumber(transactionKPI?.avgGainPct)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                  <div>Avg Loss%</div>
                  <div>{formatNumber(transactionKPI?.avgLossPct)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                  <div>Portfolio gain%</div>
                  <div></div>
                </div>


              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} >
            <Card>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div></div>
                  <div>Name</div>
                  <div>Return %</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>Best</div>
                  <div>{transactionKPI?.bestStock?.symbol}</div>
                  <div>{formatNumber(transactionKPI?.bestStock?.pctReturn)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>Worst</div>
                  <div>{transactionKPI?.worstStock?.symbol}</div>
                  <div>{formatNumber(transactionKPI?.worstStock?.pctReturn)}</div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Divider />
        <CollapsibleTable tableData={summaryData?.summaryList} tableColumnNames={tableColumnNames} />
      </Box>
      <SummaryReturnBar summaryData=
        {summaryData?.summaryList
          .filter(summary => summary.unrealizedProfitPct < 99999999.0)
          .sort((a,b) => a.unrealizedProfitPct - b.unrealizedProfitPct)
          .map(summary => {
            // if (summary.unrealizedProfitPct < 99999999.0) {
              return { ...summary, unrealizedProfitPct: roundNumber(summary.unrealizedProfitPct) }
            // }
          })
        }
      />
    </>
  );
}