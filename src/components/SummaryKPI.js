import React from "react";
import Grid from '@mui/material/Grid';
import { Card, CardContent, Divider, Paper } from '@mui/material';
import { formatNumber, roundNumber } from '../util'

export default function SummaryKPI(props) {
    const { transactionKPI } = props;

    return (
        <>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <Card>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Avg Gain% Open Position</div>
                                <div> {formatNumber(transactionKPI?.avgGainPct)}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Avg Loss% Open Position</div>
                                <div>{formatNumber(transactionKPI?.avgLossPct)}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                <div>Overall Gain% Open Position</div>
                                <div>{formatNumber(transactionKPI?.avgLossPct)}</div>
                            </div>
                            {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                            <div>Portfolio gain%</div>
                            <div></div>
                        </div> */}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} >
                    <Card>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>Closed Positions</div>
                                <div>Name</div>
                                <div>Return %</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>Best</div>
                                <div>{transactionKPI?.bestClosedStock?.symbol}</div>
                                <div>{formatNumber(transactionKPI?.bestClosedStock?.pctReturn)}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>Worst</div>
                                <div>{transactionKPI?.worstClosedStock?.symbol}</div>
                                <div>{formatNumber(transactionKPI?.worstClosedStock?.pctReturn)}</div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    )
}
