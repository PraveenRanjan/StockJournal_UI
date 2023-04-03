import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import { getTransectionData } from '../api';


export default function Transections(props) {
  const { userId } = props;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getTransectionData(userId).then(data => {
      setRows(data);
    });
  }, [userId]);

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'symbol', //access nested data with dot notation
        header: 'Symbol',
      },
      {
        accessorKey: 'transactionType',
        header: 'Type',
      },
      {
        accessorKey: 'quantity', //normal accessorKey
        header: 'Quantity',
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        accessorKey: 'lastTradingPrice',
        header: 'Last Trading Price',
      },
      {
        accessorKey: 'totalValue',
        header: 'Total Value',
      },
      {
        accessorKey: 'stopLoss',
        header: 'Stop Loss',
      },
      {
        accessorKey: 'strategy',
        header: 'Strategy',
      },
      {
        accessorKey: 'comments',
        header: 'Comments',
      },
      {
        accessorKey: 'action',
        header: 'Action',
      },
    ],
    [],
  );
  return (
    <div style={{ height: 600, width: '100%' }}>
      <MaterialReactTable columns={columns} data={rows} />;
    </div>
  );
}