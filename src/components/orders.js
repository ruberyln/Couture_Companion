import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import OnlyDrawer from './onlydrawer';
import Avatar from '@mui/material/Avatar';
import { blue, green, indigo , orange, pink, red } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Dash from './dash';
import {  useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  export default function Orders({}) {
    const location = useLocation();
    const { formData } = location.state || {}; // Extract the formData from location state
  
    const [form, setForm] = useState({});
    const theme = useTheme();
    const { firstName, images, formValues } = location.state || {};
  
    const navigate = useNavigate();
  
    const handleEditClick = (clientData) => {
      navigate("/Display", { state: { images, formValues, user: clientData } });
    };
  
    const handleClick = () => {
      navigate("/NewUser");
    };
  
    let serialNumber = 1;
  
    const [savedData, setSavedData] = useState(formData);
    const [clients, setClients] = useState([]);
  
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);
    const [totalNoOfOrders, setTotalNoOfOrders] = useState(0);
    const [totalClients, setTotalClients] = useState(0);
  
    useEffect(() => {
      axios
        .get('http://localhost:5005/clients/get-client')
        .then((res) => {
          setClients(res.data);
  
          const sumAmountPaid = res.data.reduce((sum, client) => sum + parseFloat(client.amountPaid), 0);
          setTotalAmountPaid(sumAmountPaid);
  
          const sumNoOfOrders = res.data.reduce((sum, client) => sum + parseFloat(client.noofOrders), 0);
          setTotalNoOfOrders(sumNoOfOrders);
  
          const numberOfClients = res.data.length;
          setTotalClients(numberOfClients);
        })
        .catch((err) => console.log('Error: ' + err));
    }, []);
  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <OnlyDrawer/>
        <Typography variant="h6" noWrap>
          Hello, {firstName}
        </Typography>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Dash  totalNoOfOrders={totalNoOfOrders} />
          <DrawerHeader />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>S/N</TableCell>
                  <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>Name</TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>No of Orders</TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Delivery Date</TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Order summary</TableCell>
                 
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>No of Orders</TableCell> 
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow
                    key={client.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>{serialNumber++}</TableCell>
                    <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>{client.firstName} </TableCell>
                    <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                      {client.noofOrders}
                    </TableCell>
                    <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                      {client.deliveryDate}
                    </TableCell>
                    <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                      {client.orderSummary}
                    </TableCell>
                  
                    <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                      {client.noofOrders}
                    </TableCell> 
                    <TableCell align="right">
  
                    <IconButton onClick={() => handleEditClick(client)}>
                    <Avatar sx={{ bgcolor: pink[400] }}>
    <ModeEditOutlineOutlinedIcon />
    </Avatar>  </IconButton>
  
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }



// import React from "react";
// import EngineeringIcon from '@mui/icons-material/Engineering';
// import { Button, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import { red } from "@mui/material/colors";
// import OnlyDrawer from "./onlydrawer";
// import { useNavigate } from "react-router-dom";
// export default function  Orders () {
//     const handleClick = () => {
//         navigate("/drawer" )// Navigate back to Display page with the formData for editing
//       }
//     const navigate = useNavigate();

//     return (
     
//       <Box   sx={{
//         my: 8,
//         mx: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginLeft: '150px',
//         marginTop: '200px'
//       }}
//       > 
//         <OnlyDrawer/>
//         <Typography > This Page is still under construction and will be avilable in the next update </Typography>
// <EngineeringIcon fontSize="large" sx={{ color: red[300] }}/>
//       <Button variant="contained"  sx={{ bgcolor: red[300] }} onClick = {handleClick} > Return to Home Page</Button>
//        </Box> 
//     )

// }
  