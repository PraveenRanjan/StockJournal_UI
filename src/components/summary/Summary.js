import react, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import { getSummaryData } from '../../api';
import { roundNumber, formatNumber } from '../../util'
import CollapsibleTable from './CollapsibleTable';
import SummaryReturnBarOpen1 from './SummaryReturnBarOpen1';
import SummaryReturnBarClosed2 from './SummaryReturnBarClosed2';
import SummaryKpiReturn51 from './SummaryKpiReturn51';
import SummarySymbolContributionBar from './SummarySymbolContributionBar';
import SymbolContributionOpen3 from './SymbolContributionOpen3';
import SummarySymbolContributionBarClosed from './SummarySymbolContributionBarClosed';
import SummaryKpiTable53 from './SummaryKpiTable53';
import SummaryAreaChart from './SummaryAreaChart';
import SummaryKpiReturnNumTimes52 from './SummaryKpiReturnNumTimes52';

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
        <SummaryReturnBarOpen1 summaryData=
          {summaryData?.summaryList?.filter(summary => summary.positionStatus.toUpperCase() === "OPEN")
            .sort((a, b) => a.unrealizedProfitPct - b.unrealizedProfitPct)
            .map(summary => {
              return { ...summary, unrealizedProfitPct: roundNumber(summary.unrealizedProfitPct) }
            }
            )
          }
        />
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <SummaryReturnBarClosed2 summaryData=
          {summaryData?.summaryList?.filter(summary => summary.positionStatus.toUpperCase() === "CLOSED")
            .sort((a, b) => a.pctReturn - b.pctReturn)
            .map(summary => {
              return { ...summary, pctReturn: roundNumber(summary.pctReturn) }
            })
          }
        />
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <SymbolContributionOpen3 summaryList=
          {summaryData?.summaryList?.filter(summary => summary.positionStatus.toUpperCase() === "OPEN")
            .sort((a, b) => b.totalCurrValue - a.totalCurrValue)
            // .map(summary => { return { ...summary, totalBuyValue: roundNumber(summary.unrealizedProfit) } })
            //summary.unsoldQty * summary.buyPrice
          }
        />
      </Box>
      <Divider />
      <Box sx={{ marginTop: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Box sx={{ marginBottom: 2, marginLeft: 2, background: '#d8e9f0', height: '100%' }}>
              {summaryData &&
                <SummaryKpiReturn51
                  stockData={[{ ...summaryData?.transactionKPI?.stockOpen, type: "Open" }, { ...summaryData?.transactionKPI?.stockClosed, type: "Closed" }]}
                />
              }
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ marginBottom: 2, marginLeft: 2, background: '#e4e6ef', height: '100%' }}>
              <SummaryKpiReturnNumTimes52
                stockData={[{ ...summaryData?.transactionKPI?.stockOpen, type: "Open" }, { ...summaryData?.transactionKPI?.stockClosed, type: "Closed" }]}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ marginLeft: 2, background: '#8ed1fc', height: '100%' }}>
              <SummaryKpiTable53
                kpiData=
                {
                  [
                    {
                      name: "Open",
                      detail: [
                        { type: 'Best', name: summaryData?.transactionKPI?.stockOpen.bestStock?.symbol, gain: summaryData?.transactionKPI?.stockOpen.bestStock?.unrealizedProfitPct },
                        { type: 'worst', name: summaryData?.transactionKPI?.stockOpen.worstStock?.symbol, gain: summaryData?.transactionKPI?.stockOpen.worstStock?.unrealizedProfitPct }
                      ]
                    },
                    {
                      name: "Closed",
                      detail: [
                        { type: 'Best', name: summaryData?.transactionKPI?.stockClosed.bestStock?.symbol, gain: roundNumber(summaryData?.transactionKPI?.stockClosed.bestStock?.pctReturn) },
                        { type: 'worst', name: summaryData?.transactionKPI?.stockClosed.worstStock?.symbol, gain: roundNumber(summaryData?.transactionKPI?.stockClosed.worstStock?.pctReturn) }
                      ]
                    }
                  ]
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* <Box sx={{ marginTop: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <SummarySymbolContributionBar summaryList=
              {summaryData?.summaryList
                .filter(summary => summary.positionStatus.toUpperCase() === "OPEN")
                .sort((a, b) => b.totalCurrValue - a.totalCurrValue)
                // .map(summary => { return { ...summary, totalBuyValue: roundNumber(summary.unrealizedProfit) } })
                //summary.unsoldQty * summary.buyPrice
              }
            />
          </Grid>
          <Grid item xs={5}>
            <SummarySymbolContributionBarClosed summaryList=
              {summaryData?.summaryList?.filter(summary => summary.positionStatus.toUpperCase() === "CLOSED").sort((a, b) => b.sellValue - a.sellValue)}
            />
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ marginBottom: 2, marginLeft: 2, background: '#c4def6', height: '25%' }}>
              {summaryData &&
                <SummaryKpiReturn
                  stockData={[{ ...summaryData?.transactionKPI?.stockOpen, type: "Open" }, { ...summaryData?.transactionKPI?.stockClosed, type: "Closed" }]}
                />
              }
            </Box>
            <Box sx={{ marginBottom: 2, marginLeft: 2, background: '#c4def6', height: '25%' }}>
              <SummaryKpiReturnNumTimes
                stockData={[{ ...summaryData?.transactionKPI?.stockOpen, type: "Open" }, { ...summaryData?.transactionKPI?.stockClosed, type: "Closed" }]}
              />
            </Box>
            <Box sx={{ marginLeft: 2, background: '#8ed1fc', height: '45%' }}>
              <SummaryKpiTable
                kpiData=
                {
                  [
                    {
                      name: "Open",
                      detail: [
                        { type: 'Best', name: summaryData?.transactionKPI?.stockOpen.bestStock?.symbol, gain: summaryData?.transactionKPI?.stockOpen.bestStock?.unrealizedProfitPct },
                        { type: 'worst', name: summaryData?.transactionKPI?.stockOpen.worstStock?.symbol, gain: summaryData?.transactionKPI?.stockOpen.worstStock?.unrealizedProfitPct }
                      ]
                    },
                    {
                      name: "Closed",
                      detail: [
                        { type: 'Best', name: summaryData?.transactionKPI?.stockClosed.bestStock?.symbol, gain: roundNumber(summaryData?.transactionKPI?.stockClosed.bestStock?.pctReturn) },
                        { type: 'worst', name: summaryData?.transactionKPI?.stockClosed.worstStock?.symbol, gain: roundNumber(summaryData?.transactionKPI?.stockClosed.worstStock?.pctReturn) }
                      ]
                    }
                  ]
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box> */}
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <SummaryAreaChart summaryList={
          summaryData?.summaryList
            .sort((a, b) => a.totalCurrValue - b.totalCurrValue)
            .sort((a, b) => b.sellValue - a.sellValue)
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
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <CollapsibleTable tableData={summaryData?.summaryList} />
      </Box>
    </>
  );
}