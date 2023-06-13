import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddButtons from './components/AddButton';
import { Box } from '@mui/system';
import { indigo } from '@mui/material/colors';

export default function BasicTable({formData}) {
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,   backgroundColor: indigo[50] }} aria-label="simple table">
   
      
   

        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>Name</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Phone Number</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Due Delivery</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Payment</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>No of Orders</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Order Status</TableCell>
         </TableRow>
        </TableHead>
   
        <TableBody>
        <TableCell>{formData?.firstName}</TableCell>
            <TableCell align="right">{formData?.phoneNumber}</TableCell>
            <TableCell align="right">{formData?.deliveryDate}</TableCell>
            <TableCell align="right">{formData?.amountPaid}</TableCell>
            <TableCell align="right">{formData?.noofOrders}</TableCell>
            <TableCell align="right">{formData?.orderStatus}</TableCell> {/*  add the same fontFamily property to the cells in the table body */}
        </TableBody>
      </Table>
      <AddButtons/>
    </TableContainer>
  );
}
