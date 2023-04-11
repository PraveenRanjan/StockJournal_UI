import * as React from 'react';
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
                <TableCell align="right">{row.unsoldQty}</TableCell>
                <TableCell align="right">{formatNumber(row.lastTradingPrice)}</TableCell>
                <TableCell align="right">{formatNumber(row.profit)}</TableCell>
                <TableCell align="right">{formatNumber(row.pctReturn)}</TableCell>
                <TableCell align="right">{formatNumber(row.buyValue)}</TableCell>
                <TableCell align="right">{formatNumber(row.sellValue)}</TableCell>
                <TableCell align="right">{row.buyQuantity}</TableCell>
                <TableCell align="right">{formatNumber(row.buyPrice)}</TableCell>
                <TableCell align="right">{row.sellQuantity}</TableCell>
                <TableCell align="right">{formatNumber(row.sellPrice)}</TableCell>
                <TableCell align="right">{row.stopLoss}</TableCell>
                <TableCell align="right">{row.positionStatus}</TableCell>
                <TableCell align="right">{row.strategy}</TableCell>
                <TableCell align="right">{row.entryDate}</TableCell>
                <TableCell align="right">{row.comments}</TableCell>
                <TableCell align="right">{row.action}</TableCell>


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
                                    <TableRow>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell align="right">Total Value</TableCell>
                                        <TableCell align="right">Transaction Date</TableCell>
                                        <TableCell align="right">Transaction Type</TableCell>
                                        <TableCell align="right">Stop Loss</TableCell>
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

export default function CollapsibleTable(props) {
    const { tableData, tableColumnNames } = props;
    // console.log('tableData--> ', tableData);
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell />
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