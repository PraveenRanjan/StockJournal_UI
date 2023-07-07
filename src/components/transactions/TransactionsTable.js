import React, { useMemo, useRef, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import '../../styles.css'

export default function TransactionsTable(props) {
    const { userId, rows } = props;
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '98%' }), []);
    const gridStyle = useMemo(() => ({ height: '94%', width: '100%' }), []);

    const [transactionsData, setTransactionsData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Symbol', field: 'symbol', filter: true, suppressSizeToFit: true, width: 150, tooltipField: 'symbol', suppressStickyLabel: true
            , pinned: 'left'
        },
        { headerName: 'Transaction Type', field: 'transactionType', filter: true, suppressSizeToFit: true, width: 120, tooltipField: 'transactionType' },
        { headerName: 'Qty', field: 'quantity', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'quantity'},
        { headerName: 'Price', field: 'price', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'price'},
        { headerName: 'LTP', field: 'lastTradingPrice', filter: true, suppressSizeToFit: true, width: 87, tooltipField: 'lastTradingPrice', },
        { headerName: 'Total Value', field: 'totalValue', filter: true, suppressSizeToFit: true, width: 147, tooltipField: 'totalValue' },
        { headerName: 'Stop Loss', field: 'stopLoss', filter: true, suppressSizeToFit: true, width: 100, tooltipField: 'stopLoss' },
        { headerName: 'Date', field: 'transactionDate', filter: true, suppressSizeToFit: true, width: 132, tooltipField: 'transactionDate', sort: 'desc' },
        { headerName: 'Strategy', field: 'strategy', filter: true, width: 120, tooltipField: 'strategy', },
        { headerName: 'Comments', field: 'comments', filter: true, width: 190, tooltipField: 'comments', },
        { headerName: 'Action', field: 'action', width: 190, tooltipField: 'action' },
    ]);

    useEffect(() => { 
        console.log('rows :', rows);
        setTransactionsData(rows);
    }, [userId, rows]);

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
                        // ref={gridRef}
                        // rowSelection="multiple"
                        rowHeight={22}
                        // editType="fullRow"
                        
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef} // Default Column Properties
                        rowData={transactionsData}
                        pagination={true}
                    />
                </div>
            </div>
        </div>

    );
}