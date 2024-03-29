
import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import '../../styles.css'
import { Grid, Button } from '@mui/material';

export default function SummaryTable(props) {
    const { userId, data } = props;
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '96%', width: '100%' }), []);

    const [summaryData, setSummaryData] = useState();
    const [openStatus, setOpenStatus] = useState(true);

    const [columnDefs, setColumnDefs] = useState([
        // group cell renderer needed for expand / collapse icons
        {
            headerName: 'Symbol', field: 'symbol', filter: true, suppressSizeToFit: true, width: 150, tooltipField: 'symbol', suppressStickyLabel: true
            , headerClass: 'currInfo-group', pinned: 'left', cellRenderer: 'agGroupCellRenderer', sort: 'asc'
        },
        { headerName: 'SL Alert', field: 'stopLossAlert', filter: true, suppressSizeToFit: true, width: 90, tooltipField: 'stopLossAlert', headerClass: 'currInfo-group', },
        { headerName: 'Stop Loss', field: 'stopLoss', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'stopLoss', headerClass: 'currInfo-group', },
        { headerName: 'LTP', field: 'lastTradingPrice', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'lastTradingPrice', headerClass: 'currInfo-group', },
        { headerName: 'Buy Price', field: 'buyPrice', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'buyPrice', headerClass: 'currInfo-group', },
        { headerName: 'Curr Qty', field: 'unsoldQty', filter: true, suppressSizeToFit: true, width: 87, tooltipField: 'unsoldQty', headerClass: 'currInfo-group', },
        {
            headerName: 'Curr Value', field: 'totalCurrValue', filter: true, suppressSizeToFit: true, width: 97, tooltipField: 'totalCurrValue', headerClass: 'currInfo-group',
            aggFunc: "sum",
            editable: false,
            valueParser: "Number(newValue)"
        },
        {
            headerName: 'Curr Profit', field: 'unrealizedProfit', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'unrealizedProfit', headerClass: 'currInfo-group',
            aggFunc: "sum",
            editable: false,
            valueParser: "Number(newValue)"
        },
        { headerName: '%Curr Profit', field: 'unrealizedProfitPct', filter: true, suppressSizeToFit: true, width: 92, tooltipField: 'unrealizedProfitPct', headerClass: 'currInfo-group', },
        { headerName: 'Status', field: 'positionStatus', suppressSizeToFit: true, width: 100, tooltipField: 'positionStatus', },
        {
            headerName: 'Profit', field: 'profit', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'profit',
            aggFunc: "sum",
            editable: false,
            valueParser: "Number(newValue)"
        },
        { headerName: '%Profit', field: 'pctReturn', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'pctReturn', },
        { headerName: 'Buy Value', field: 'buyValue', filter: true, suppressSizeToFit: true, width: 130, tooltipField: 'buyValue', },
        { headerName: 'Buy Qty', field: 'buyQuantity', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'buyQuantity', },
        { headerName: 'Sell Value', field: 'sellValue', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'sellValue', },
        { headerName: 'Sell Qty', field: 'sellQuantity', filter: true, width: 80, tooltipField: 'sellQuantity', },
        { headerName: 'Sell Price', field: 'sellPrice', filter: true, width: 92, tooltipField: 'sellPrice', },
        { headerName: 'Strategy', field: 'strategy', filter: true, width: 100, tooltipField: 'strategy', },
        { headerName: 'Entry Date', field: 'entryDate', filter: true, width: 100, tooltipField: 'entryDate', },
        { headerName: 'Action', field: 'action', width: 100, tooltipField: 'action', },
    ]);

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                columnDefs: [
                    { field: 'transactionDate', headerName: 'Transaction Date', width: 50, suppressSizeToFit: true },
                    { field: 'transactionType', headerName: 'Transaction Type', width: 100, suppressSizeToFit: true },
                    { field: 'quantity', headerName: 'Quantity', width: 100, suppressSizeToFit: true },
                    { field: 'price', headerName: 'Price', width: 100, suppressSizeToFit: true },
                    { field: 'stopLoss', headerName: 'Stop Loss', width: 100, suppressSizeToFit: true },
                    { field: 'totalValue', headerName: 'Total Value', width: 100, suppressSizeToFit: true },
                ],
                rowHeight: 25,
                defaultColDef: {
                    flex: 1
                },
            },
            getDetailRowData: (params) => {
                params.successCallback(params.data.transList);
            },
        };
    }, []);

    useEffect(() => {
        let status = '';
        if (openStatus) status = 'Open';
        if (data && status && status.length > 0) {
            const openList = data.filter(ele => ele.positionStatus === status);
            setSummaryData(openList);
        } else {
            setSummaryData(data);
        }
    }, [userId, data, openStatus]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
        filter: true,
        wrapHeaderText: true,
    }));

    const onBtExport = useCallback(() => {
        gridRef.current.api.exportDataAsExcel();
    }, []);

    const handleChange = (event) => {
        setOpenStatus(event.target.checked);
    };

    return (
        <div style={containerStyle}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Button variant='contained' onClick={onBtExport}>
                        Export to Excel
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <FormControl sx={{ m: 0 }} component="fieldset" variant="standard" >
                        <FormGroup row sx={{ m: 0 }}>
                            <FormControlLabel sx={{ m: 0 }}
                                control={
                                    <Checkbox checked={openStatus} onChange={handleChange} name="Open" />
                                }
                                label="Open Positions"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <div style={{ height: '100%', boxSizing: 'border-box' }} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowSelection="multiple"
                    rowHeight={25}
                    editType="fullRow"
                    suppressRowClickSelection
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef} // Default Column Properties
                    rowData={summaryData}
                    masterDetail={true}
                    multiSortKey={'ctrl'}
                    // detailRowAutoHeight={true}
                    detailCellRendererParams={detailCellRendererParams}
                    detailRowHeight={500}
                    groupIncludeTotalFooter='true'
                />
            </div>
        </div>

    );
}