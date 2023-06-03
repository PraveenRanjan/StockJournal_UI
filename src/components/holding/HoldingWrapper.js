import react from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HoldingDaily from './HoldingDaily';
import HoldingWeek from './HoldingWeek';
import HoldingMonth from './HoldingMonth';


export default function HoldingWrapper(props) {
    const { userId } = props;
    return (
        <Box sx={{ marginTop: 2 }}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <div>Daily</div>
                    <HoldingDaily userId={userId} />
                </Grid>
                <Grid item xs={3}>
                    <div>weeekly</div>
                    <HoldingWeek userId={userId} />
                </Grid>
                <Grid item xs={2}>
                    <div>Monthly</div>
                    <HoldingMonth userId={userId} />
                </Grid>
            </Grid>
        </Box>
    );
}