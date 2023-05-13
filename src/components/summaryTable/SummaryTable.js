// import React, { Fragment } from "react";
import React, { useCallback, useMemo, useRef, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import { AgGridReact } from 'ag-grid-react';
// // import 'ag-grid-enterprise';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';






const GridExample = () => {
  

//   const onGridReady = useCallback((params) => {
//     fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
//       .then((resp) => resp.json())
//       .then((data) => {
//         setRowData(data);
//       });
//   }, []);

//   const onFirstDataRendered = useCallback((params) => {
//     // arbitrarily expand a row for presentational purposes
//     setTimeout(function () {
//       gridRef.current.api.getDisplayedRowAtIndex(1).setExpanded(true);
//     }, 0);
//   }, []);


};

export default function SummaryTable(props) { 
    const { summaryList } = props;
//     const gridRef = useRef();
//   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
//   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([
//     // group cell renderer needed for expand / collapse icons
//     { field: 'symbol', cellRenderer: 'agGroupCellRenderer' },
//     { field: 'unsoldQty' },
//     { field: 'lastTradingPrice' },     
//     { field: 'profit' },     
//     { field: 'pctReturn' },
//     { field: 'buyValue' },
//     { field: 'sellValue' },
//     { field: 'buyPrice' },
//     { field: 'buyQuantity' },
//     { field: 'sellQuantity' },
//     { field: 'sellPrice' },
//     { field: 'stopLoss' },
//     { field: 'positionStatus' },
//     { field: 'strategy' },
//     { field: 'entryDate' },
//     { field: 'action' },
//   ]);


//     const onGridReady = useCallback((params) => {

//         setRowData(summaryList);
//         console.log('onGridReady called with', summaryList);

//   }, []);

//   const defaultColDef = useMemo(() => {
//     return {
//       flex: 1,
//     };
//   }, []);
//   const detailCellRendererParams = useMemo(() => {
//     return {
//       detailGridOptions: {
//         columnDefs: [
//           { field: 'callId' },
//           { field: 'direction' },
//           { field: 'number', minWidth: 150 },
//           { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
//           { field: 'switchCode', minWidth: 150 },
//         ],
//         defaultColDef: {
//           flex: 1,
//         },
//       },
//       getDetailRowData: (params) => {
//         params.successCallback(params.data.callRecords);
//       },
//     };
//   }, []);
    
//     return (
//         <div style={containerStyle}>
//           <div style={gridStyle} className="ag-theme-alpine">
//             <AgGridReact
//               ref={gridRef}
//               rowData={summaryList}
//               columnDefs={columnDefs}
//               defaultColDef={defaultColDef}
//               masterDetail={true}
//             //   detailCellRendererParams={detailCellRendererParams}
//               onGridReady={onGridReady}
//             //   onFirstDataRendered={onFirstDataRendered}
//             ></AgGridReact>
//           </div>
//         </div>
//       );
}