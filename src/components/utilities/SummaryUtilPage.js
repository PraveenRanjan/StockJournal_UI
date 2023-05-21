import React, { useState } from "react";
import { updateSummaryLTP, updateStopLossData, resetSummaryData, exportSummaryCsv } from "../../api";
import { Divider, TextField, Stack, Typography, Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';

const tran = { symbol: "", stopLoss: 0, strategy: "", comments: "", action: "" };
export default function SummaryUtilPage(props) {
    const { userId } = props;
    const [transaction, setTransaction] = useState(tran);

    const handleChange = (name, event) => {
        const tran1 = { ...transaction };
        tran1[name] = event.target.value;

        setTransaction(tran1);
    }


    const updateLTP = () => {
        updateSummaryLTP();
    }

    const resetSummary = () => {
        resetSummaryData(userId);
    }

    const updateStopLoss = () => {
        console.log(userId, transaction);
        updateStopLossData(userId, transaction);
    }

    const handleExportData = (type) => {
        exportSummaryCsv(userId, type);
      }
    return (
        <>
            <Stack spacing={2}>
                <Box sx={{ border: '2px solid #E7EBF0', borderRadius: '10px' }} flexDirection={'row'}>
                    <Typography >Update LTP for all stocks of Transaction Summary</Typography>
                    <Button type="submit" variant="contained" onClick={updateLTP}>Update LTP</Button>

                </Box>

                <Box sx={{ border: '2px solid #E7EBF0', borderRadius: '10px' }} flexDirection={'row'}>
                    <Typography >Reset latest Transaction Summary data to previous day</Typography>
                    <Button type="submit" variant="contained" onClick={resetSummary}>Reset Summary Data</Button>
                </Box>

                <Box sx={{ border: '2px solid #E7EBF0', borderRadius: '10px' }} flexDirection={'row'}>
                    <Typography>Download Positions Data</Typography>
                    <Grid type="container" spacing={5}>
            
                        <Button id="Closed" type="submit" variant="contained" onClick={() => handleExportData('Closed')}>Download Closed positions</Button>
                        <Button id="Open" type="submit" variant="contained" onClick={() => handleExportData('Open')}>Download Open positions</Button>
                  
                    </Grid>
                </Box>

                <Box sx={{ border: '2px solid #E7EBF0', borderRadius: '10px' }} flexDirection={'row'}>
                    <Typography >Update stoploss and other related data (strategy, comments, action)</Typography>
                    <Grid type="container" spacing={2}>
                        <Grid>
                            <TextField
                                id="outlined-number"
                                label="Symbol"
                                type="string"
                                value={transaction.symbol}
                                onChange={(e) => handleChange("symbol", e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-number"
                                label="Stoploss"
                                type="number"
                                value={transaction.stopLoss}
                                onChange={(e) => handleChange("stopLoss", e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-number"
                                label="Strategy"
                                type="string"
                                value={transaction.strategy}
                                onChange={(e) => handleChange("strategy", e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-number"
                                label="Action"
                                type="string"
                                value={transaction.action}
                                onChange={(e) => handleChange("action", e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-number"
                                label="Comments"
                                type="string"
                                value={transaction.comments}
                                onChange={(e) => handleChange("comments", e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" onClick={updateStopLoss}>Update Stoploss</Button>

                </Box>
            </Stack >
        </>
    )
}