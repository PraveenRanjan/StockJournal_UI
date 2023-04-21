import React, { Fragment } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function SummaryKpiTable53(props) {
  const { kpiData } = props;

  return (
    <Table >
      <TableHead>
        <TableRow>
          <TableCell>Position</TableCell>
          <TableCell></TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Gain %</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {kpiData.map(item => (
          <Fragment>
            <TableRow>
              <TableCell rowSpan={item.detail.length + 1}>
                {item.name}
              </TableCell>
            </TableRow>
            {item.detail.map(detail => (
              <TableRow>
                <TableCell>{detail.type}</TableCell>
                <TableCell>{detail.name}</TableCell>
                <TableCell>{detail.gain}</TableCell>
              </TableRow>
            ))}
          </Fragment>
        ))}
      </TableBody>
    </Table>

  );
}
