import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronRight';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BasicTable from './table';
import OnlyDrawer from './components/onlydrawer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { blue, green, indigo , orange, pink } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import image4 from './myImage/image4.JPG'
import Display from './components/Display';
import Notifications from './components/notifications';
import TableRow from '@mui/material/TableRow';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Paper from '@mui/material/Paper';
import LogoutPage from './components/logout';
import AddButtons from './components/AddButton';
import Link from '@mui/material/Link';
import axios from 'axios';


import {  useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({}) {
  const location = useLocation();
  const { formData } = location.state || {}; // Extract the formData from location state

  const [form, setForm] = useState({});
  const theme = useTheme();




  const navigate = useNavigate();
  // const handleClick  = () =>  {
  //   navigate ("/Display");
  // }
  const handleEditClick = (clientData) => {
    navigate("/Display", { state: { formValues: clientData } });
  };
  const handleClick = () => {
    navigate("/NewUser")

  }

 
  const [savedData, setSavedData] = useState(formData);
  const [clients, setClients] = useState([]);

  // useEffect(() => {
  //   if (formData) {
  //     // If formData exists, send a POST request to save it in the backend
  //     axios
  //       .post('http://localhost:5005/clients/save-client', formData)
  //       .then((res) => {
  //         console.log(res.data);
  //         setSavedData(res.data); // Update the savedData state with the response from the backend
  //         setClients(prevClients => [...prevClients, res.data]); 
  //       })
  //       .catch((err) => console.error(err));
        
  //   }
  // }, [formData]);

  useEffect(() => {
    axios.get('http://localhost:5005/clients/get-client')
      .then(res => {
        setClients(res.data);
      })
      .catch(err => console.log('Error: ' + err));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
  
    
      <OnlyDrawer/>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750, }} aria-label="simple table">
   
      
   

        <TableHead >
          <TableRow >
          <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>S/N</TableCell>
            <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>Name</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Phone Number</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Due Delivery</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Price</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Amount Paid</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>No of Orders</TableCell>
            <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Order Status</TableCell>


         </TableRow>
        </TableHead>
   



        <TableBody>
        {clients.map((client) => (
                <TableRow key={client._id}> 
                 <TableCell>{client.id}</TableCell>
                <TableCell>{client.firstName}</TableCell>
                <TableCell align="right">{client.phoneNumber}</TableCell>
                <TableCell align="right">{client.deliveryDate}</TableCell>
                <TableCell align="right" sx={{ color: green[800] }}>{client.price}</TableCell>
                <TableCell align="right" sx={{ color: indigo[800] }}>{client.amountPaid}</TableCell>
              
                <TableCell align="right" sx={{ color: orange[800] }}>{client.noofOrders}</TableCell>
                <TableCell align="right">{client.orderStatus}</TableCell>
                <TableCell align="right">
                <IconButton onClick={() => handleEditClick(client)}>
                  <Avatar sx={{ bgcolor: pink[500] }}>
  <ModeEditOutlineOutlinedIcon />
  </Avatar>
</IconButton>

                </TableCell>
              </TableRow>
              
  ))}
        </TableBody>
      </Table>
      <AddButtons/>
    </TableContainer>
      </Box>
    </Box>
  );
}