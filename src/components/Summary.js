import react, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import { getSummaryData } from '../api';
import { roundNumber } from '../util'
import CollapsibleTable from './CollapsibleTable';
import SummaryReturnBar from './SummaryReturnBar';
import SummaryKpiReturn from './SummaryKpiReturn';
import SummarySymbolContributionBar from './SummarySymbolContributionBar';
import SummarySymbolContributionBarClosed from './SummarySymbolContributionBarClosed';
import {SummaryTableColumnNames} from './Constants'
import SummaryKpiTable from './SummaryKpiTable';

export default function Summray(props) {
  const { userId } = props;
  const [summaryData, setSummaryData] = useState();
  const [transactionKPI, setTransactionKPI] = useState();
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
              {summaryData?.summaryList?.filter(summary => summary.positionStatus.toUpperCase() === "CLOSED").sort((a, b) => b.sellValue - a.sellValue)}
            />
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ marginBottom: 2, background: '#c4def6', height: '30%' }}>
              <SummaryKpiReturn 
              stockData= {[{...summaryData?.transactionKPI?.stockOpen, type: "Open"}, {...summaryData?.transactionKPI?.stockClosed, type:"Closed"}]}
               />
            </Box>
            <Box sx={{ background: '#8ed1fc', height: '50%' }}>
              <SummaryKpiTable 
              kpiData =
              {
                [ 
                { 
                  name: "Open", 
                  detail: [
                    {type:'Best', name:summaryData?.transactionKPI?.stockOpen.bestStock.symbol, gain:summaryData?.transactionKPI?.stockOpen.bestStock.unrealizedProfitPct}, 
                    {type:'worst', name:summaryData?.transactionKPI?.stockOpen.worstStock.symbol, gain:summaryData?.transactionKPI?.stockOpen.worstStock.unrealizedProfitPct}
                  ] 
                },
                { 
                  name: "Closed", 
                  detail: [
                    {type:'Best', name:summaryData?.transactionKPI?.stockClosed.bestStock.symbol, gain:roundNumber(summaryData?.transactionKPI?.stockClosed.bestStock.pctReturn)}, 
                    {type:'worst', name:summaryData?.transactionKPI?.stockClosed.worstStock.symbol, gain:roundNumber(summaryData?.transactionKPI?.stockClosed.worstStock.pctReturn)}
                  ] 
                }
                ]
              } 
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <CollapsibleTable tableData={summaryData?.summaryList} tableColumnNames={SummaryTableColumnNames} />
      </Box>
    </>
  );
}