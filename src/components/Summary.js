import react, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider, Paper } from '@mui/material';
import { getSummaryData } from '../api';
import { roundNumber } from '../util'
import CollapsibleTable from './CollapsibleTable';
import SummaryReturnBar from './SummaryReturnBar';
import SummaryKpiReturn from './SummaryKpiReturn';
import SummarySymbolContributionBar from './SummarySymbolContributionBar';
import SummarySymbolContributionBarClosed from './SummarySymbolContributionBarClosed';
import SummaryTableColumnNames from './Constants'

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
const tableColumnNames = ['Symbol', 'Quantity', 'Last Trade Price', 'Profit', 'Return %', 'Buy Value', 'Sell Value', 'Buy Qty'
                                        , 'Buy Price', 'Sell Qty', 'Sell Price', 'Stop Loss', 'Status', 'Strategy', 'Entry Date', 'Comments', 'Action'];


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
  useEffect(() => {
    getSummaryData(userId).then(data => {
      setSummaryData(data);
      setTransactionKPI(data.transactionKPI);

    });
  }, [userId]);
  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <SummaryReturnBar summaryData=
          {summaryData?.summaryList
            .sort((a, b) => a.unrealizedProfitPct - b.unrealizedProfitPct)
            .sort((a, b) => a.pctReturn - b.pctReturn)
            .map(summary => {
              if (summary.unrealizedProfitPct == 99999999.0) {
                return { ...summary, unrealizedProfitPct: "", pctReturn: roundNumber(summary.pctReturn) }
              } else if (summary.pctReturn == 99999999.0) {
                return { ...summary, pctReturn: "", unrealizedProfitPct: roundNumber(summary.unrealizedProfitPct) }
              } else {
                return { ...summary, unrealizedProfitPct: roundNumber(summary.unrealizedProfitPct), pctReturn: roundNumber(summary.pctReturn) }
              }
            })
          }
        />
      </Box>
      <Divider />
      <Box sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <SummarySymbolContributionBar summaryList=
              {summaryData?.summaryList.filter(summary => summary.positionStatus.toUpperCase() === "OPEN").sort((a, b) => b.totalCurrValue - a.totalCurrValue)}
            />
          </Grid>
          <Grid item xs={4}>
            <SummarySymbolContributionBarClosed summaryList=
              {summaryData?.summaryList.filter(summary => summary.positionStatus.toUpperCase() === "CLOSED").sort((a, b) => b.sellValue - a.sellValue)}
            />
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ marginBottom: 2, background: '#c4def6', height: '20%' }}>
              <SummaryKpiReturn 
              stockData= {[{...summaryData?.transactionKPI?.stockOpen, type: "Open"}, {...summaryData?.transactionKPI?.stockClosed, type:"Closed"}]}
               />
            </Box>
            <Box sx={{ background: 'green', height: '60%' }}>
              box 2
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <CollapsibleTable tableData={summaryData?.summaryList} tableColumnNames={tableColumnNames} />
      </Box>
    </>
  );
}