import react, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Toolbar } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { formatNumber } from '../../util';

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'symbol';



const tableColumnNames = [

  { id: 'symbol', label: 'Symbol' }, { id: 'unsoldQty', label: 'Quantity' }, { id: 'lastTradingPrice', label: 'Last Trade Price' }, { id: 'profit', label: 'Profit' },
  { id: 'pctReturn', label: 'Return %' }, { id: 'buyValue', label: 'Buy Value' }, { id: 'sellValue', label: 'Sell Value' }, {
    id: 'buyQuantity', label: 'Buy Qty'
  }, { id: 'buyPrice', label: 'Buy Price' }, { id: 'sellQuantity', label: 'Sell Qty' }, { id: 'sellPrice', label: 'Sell Price' }, { id: 'stopLoss', label: 'Stop Loss' },
  { id: 'positionStatus', label: 'Status' }, { id: 'strategy', label: 'Strategy' }, { id: 'entryDate', label: 'Entry Date' }, { id: 'comments', label: 'Comments' },
  { id: 'action', label: 'Action' }
];


function descendingComparator(a, b, orderBy) {

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  console.log('stableSort array-> ', array);
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
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
        <TableCell component="th" scope="row" >
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
                Transactions
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
    </>
  );
}

export default function CollapsibleTable(props) {
  const { tableData } = props;
  const [tableRows, setTableRows] = useState(tableData || []);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    setTableRows(tableData);
  }, [tableData]);

  const handleRequestSort = useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(tableRows, getComparator(toggledOrder, newOrderBy));
      // const updatedRows = sortedRows.slice(
      //   page * rowsPerPage,
      //   page * rowsPerPage + rowsPerPage,
      // );

      // setVisibleRows(updatedRows);

      setTableRows(sortedRows);
    },
    [tableRows, order, orderBy],
  );

  const createSortHandler = (newOrderBy) => (event) => {
    handleRequestSort(event, newOrderBy);
  };

  const handleSearchText = (event) => {
    setSearchText(event.target.value);
  }

  const handleSearch = () => {

    const searchedRows = tableData.filter(row => row.symbol?.toUpperCase().includes(searchText.toUpperCase()));
    console.log('searchedRows-> ', searchText, searchedRows);
    setTableRows(searchedRows);
  }

  const clearSearch = () => {
    setSearchText('');
    setTableRows(tableData);
  }

  return (
    <Box sx={{ border: '1px solid grey' }}>
      <Toolbar>
        <TextField placeholder='Search Symbol...' size='small' value={searchText} onChange={handleSearchText} />
        <IconButton size="medium" aria-label="search" color="inherit">
          <SearchIcon onClick={handleSearch} color="primary" />

        </IconButton>
        <IconButton size="medium" aria-label="clear" color="inherit">
          <ClearIcon color="action" onClick={clearSearch} />
        </IconButton>

      </Toolbar>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>

        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              {tableColumnNames.map(col =>
                <TableCell align="right" sortDirection={orderBy === col.id ? order : false}>
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : 'asc'}
                    onClick={createSortHandler(col.id)}
                  >
                    {col.label}
                    {orderBy === col.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>

                </TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows?.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}