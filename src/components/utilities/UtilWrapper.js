import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SummaryUtilPage from './SummaryUtilPage';

export default function UtilWrapper(props) {
    const { userId } = props;
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="transaction-content"
                    id="transaction-header"
                >
                    <Typography>Transactions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Accordion 1
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="summary-content"
                    id="summary-header"
                >
                    <Typography>Suymmary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SummaryUtilPage userId={userId}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="holding-content"
                    id="holding-header"
                >
                    <Typography> Accordion</Typography>
                </AccordionSummary>
            </Accordion>
        </div>
    );
}
