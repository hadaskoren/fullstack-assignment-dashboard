// MaliciousDAppsTable.js
import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const MaliciousDAppsTable = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>URL</TableCell>
          <TableCell align="right">Request Count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.url}>
            <TableCell component="th" scope="row">
              {row.url}
            </TableCell>
            <TableCell align="right">{row.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MaliciousDAppsTable;
