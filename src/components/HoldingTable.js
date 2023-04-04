import react, { useEffect, useState } from 'react';
import { formatNumber } from '../util'

export default function HoldingTable(props) {
    
    const { userId } = props;
    const [holdingData] = props;
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>  
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