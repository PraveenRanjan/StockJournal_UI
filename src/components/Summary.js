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
import { DataGrid } from '@mui/x-data-grid';
import { getSummaryData } from '../api';
import { formatNumber } from '../util'
import { display } from '@mui/system';
import CollapsibleTable from './CollapsibleTable';

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

// "userId" : "ar",
// "lastUpdate" : "2023-03-29",
// "id" : "6422f8952557fb1693f62374",
// "entryDate" : "2023-03-28",
// "sellDate" : "2023-03-28",
// "daysHeld" : 0,
// "symbol" : "CENLUB",
// "buyQuantity" : 300,
// "sellQuantity" : 50,
// "unsoldQty" : 250,
// "buyPrice" : 217.42666666666668,
// "sellPrice" : 200.0,
// "lastTradingPrice" : 0.0,
// "buyValue" : 65228.0,
// "sellValue" : 10000.0,
// "stopLoss" : 300.0,
// "strategy" : "Long",
// "comments" : "Buy on BO",
// "name" : "CENLUB",
// "profit" : -871.3333333333339,
// "pctReturn" : -8.014962899368374,
// "action" : "new buy",
// "positionStatus" : "Open",

const tableColumnNames = ['Name', 'Symbol', 'Quantity', 'Last Trade Price', 'profit', 'pctReturn', 'buyValue', 'sellValue', 'Buy Qty', 'buyPrice', 'Sell Qty', 'sellPrice', 'stopLoss', 'strategy', 'entryDate', 'comments', 'action', 'Status'];

// const createRowData = (records) => {
//   return records?.map(record => );
// }

// const createData = (row) => {
//     return {...row};

// }

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',

  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



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
              
              {/* <List>
                <ListItem secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    {formatNumber(transactionKPI?.avgGainPct)}
                  </IconButton>
                }>
                  <ListItemText
                    primary="Avg Win%"
                  />
                </ListItem>
                <ListItem secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    {formatNumber(transactionKPI?.avgLossPct)}
                  </IconButton>
                }>
                  <ListItemText
                    primary="Avg Loss%"
                  />
                </ListItem>
                <ListItem secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    value
                  </IconButton>
                }>
                  <ListItemText
                    primary="Portfolio gain%"
                  />
                </ListItem>
              </List> */}
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
  );
}