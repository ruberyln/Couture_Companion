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
      .get('http://localhost:5005/clients/get-client',{headers:{Authorization:localStorage.getItem('userId')}})

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
      
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" noWrap    sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        marginLeft: '50px',
        marginTop: '50px',
        fontFamily: "'EB Garamond', serif" 
      }}>
       CLIENTS
        </Typography>
          {/* <Dash totalNoOfOrders={totalClients} /> */}
          <DrawerHeader />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>S/N</TableCell>
                  <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>Name</TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Birthday</TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Email</TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Phone Number</TableCell>
                 
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Street Address</TableCell> 
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
                      {client.birthday}
                    </TableCell>
                    <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                      {client.email}
                    </TableCell>
                    <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                      {client.phoneNumber}
                    </TableCell>
                  
                    <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                      {client.streetAddress}
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

