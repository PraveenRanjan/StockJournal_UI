
import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getSummaryData } from '../../api';
import '../../styles.css'

export default function SummaryTable(props) {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '96%', width: '100%' }), []);

    const { userId } = props;
    const [summaryData, setSummaryData] = useState();

    const [columnDefs, setColumnDefs] = useState([
        // group cell renderer needed for expand / collapse icons
        {
            headerName: 'Symbol', field: 'symbol', filter: true, suppressSizeToFit: true, width: 125, tooltipField: 'symbol', suppressStickyLabel: true
            , headerClass: 'currInfo-group', pinned: 'left', cellRenderer: 'agGroupCellRenderer'
        },
        { headerName: 'Stop Loss', field: 'stopLoss', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'stopLoss', headerClass: 'currInfo-group', },
        { headerName: 'LTP', field: 'lastTradingPrice', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'lastTradingPrice', headerClass: 'currInfo-group', },
        { headerName: 'Buy Price', field: 'buyPrice', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'buyPrice', headerClass: 'currInfo-group', },
        { headerName: 'Curr Qty', field: 'unsoldQty', filter: true, suppressSizeToFit: true, width: 87, tooltipField: 'unsoldQty', headerClass: 'currInfo-group', },
        { headerName: 'Curr Value', field: 'totalCurrValue', filter: true, suppressSizeToFit: true, width: 97, tooltipField: 'totalCurrValue', headerClass: 'currInfo-group', },
        { headerName: 'Curr Profit', field: 'unrealizedProfit', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'unrealizedProfit', headerClass: 'currInfo-group', },
        { headerName: '%Curr Profit', field: 'unrealizedProfitPct', filter: true, suppressSizeToFit: true, width: 92, tooltipField: 'unrealizedProfitPct', headerClass: 'currInfo-group', },
        { headerName: 'Profit', field: 'profit', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'profit', },
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
        getSummaryData(userId).then(data => {
            const openList = data.summaryList.filter(ele => ele.positionStatus === 'Open');
            console.log('openList : ', openList);
            setSummaryData(openList);
        });
    }, [userId]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
        filter: true,
        wrapHeaderText: true,
    }));

    return (
        <div style={containerStyle}>
            <div style={{ height: '100%', boxSizing: 'border-box' }}>
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        rowSelection="multiple"
                        rowHeight={25}
                        editType="fullRow"
                        suppressRowClickSelection
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef} // Default Column Properties
                        rowData={summaryData}
                        masterDetail={true}
                        // detailRowAutoHeight={true}
                        detailCellRendererParams={detailCellRendererParams}
                        detailRowHeight={500}
                    />
                </div>
            </div>
        </div>

    );
}