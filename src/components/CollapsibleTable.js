import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { formatNumber } from '../util';

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3,
//       },
//       {
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         amount: 1,
//       },
//     ],
//   };
// }

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
                    {row.symbol}
                </TableCell>
                <TableCell align="right">{row.symbol}</TableCell>
                <TableCell align="right">{row.unsoldQty}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{formatNumber(row.lastTradingPrice)}</TableCell>
                <TableCell align="right">{formatNumber(row.profit)}</TableCell>
                <TableCell align="right">{formatNumber(row.pctReturn)}</TableCell>
                <TableCell align="right">{row.buyValue}</TableCell>
                <TableCell align="right">{row.sellValue}</TableCell>
                <TableCell align="right">{row.buyQuantity}</TableCell>
                <TableCell align="right">{formatNumber(row.buyPrice)}</TableCell>
                <TableCell align="right">{row.sellQuantity}</TableCell>
                <TableCell align="right">{formatNumber(row.sellPrice)}</TableCell>
                <TableCell align="right">{row.stopLoss}</TableCell>
                <TableCell align="right">{row.strategy}</TableCell>
                <TableCell align="right">{row.entryDate}</TableCell>
                <TableCell align="right">{row.comments}</TableCell>
                <TableCell align="right">{row.action}</TableCell>
                <TableCell align="right">{row.positionStatus}</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Transections
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    price
                                    <TableRow>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell align="right">Total Value</TableCell>
                                        <TableCell align="right">Transaction Date</TableCell>
                                        <TableCell align="right">Transaction Type</TableCell>
                                        <TableCell align="right">Stop Loss</TableCell>

                                        {/* <TableCell align="right">Total price ($)</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row?.transList?.map((txRow) => (
                                        <TableRow key={txRow.price}>
                                            <TableCell component="th" scope="row">
                                                {txRow.price}
                                            </TableCell>
                                            <TableCell>{txRow.quantity}</TableCell>
                                            <TableCell align="right">{txRow.totalValue}</TableCell>
                                            <TableCell align="right">{txRow.transactionDate}</TableCell>
                                            <TableCell align="right">{txRow.transactionType}</TableCell>
                                            <TableCell align="right">{txRow.stopLoss}</TableCell>
                                            {/* <TableCell align="right">
                        {Math.round(txRow.amount * row.price * 100) / 100}
                      </TableCell> */}
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable(props) {
    const { tableData, tableColumnNames } = props;
    console.log('tableData--> ', tableData);
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                        {tableColumnNames.map(col => <TableCell align="right">{col}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData?.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}