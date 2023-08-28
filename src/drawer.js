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
import BasicTable from './Table';
import OnlyDrawer from './components/onlydrawer';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';


import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { blue, green, indigo , orange, pink, red } from '@mui/material/colors';
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
import Dash from './components/dash';


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

  let serialNumber = 101;

  const [savedData, setSavedData] = useState(formData);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
      <OnlyDrawer />
    

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Dash totalAmountPaid={totalAmountPaid} totalNoOfOrders={totalNoOfOrders} totalClients={totalClients} />
        <DrawerHeader />
      
        <IconButton>

<SearchIcon />
</IconButton>
<InputBase
placeholder="Search by Name..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>Custoner ID</TableCell>
                <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>Name</TableCell>
                <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Phone Number</TableCell>
                <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Due Delivery</TableCell>
                <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Price</TableCell>
                <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Payment Status</TableCell>
                <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Amount Paid</TableCell>
                <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Balance</TableCell>
                <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>No of Orders</TableCell>
                <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {clients
  .filter((client) =>
    client.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .map((client) => (
                <TableRow
                  key={client.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>{serialNumber++}</TableCell>
                  <TableCell sx={{ fontFamily: "'EB Garamond', serif" }}>{client.firstName}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                    {client.phoneNumber}
                  </TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                    {client.deliveryDate}
                  </TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                    {client.price}
                  </TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif", color: client.paymentStatus === 'Paid' ? "green" : client.paymentStatus === 'Partially-Paid' ? 'blue' :  client.paymentStatus === 'Pending' ? 'red' :'blue'}}>
    {client.paymentStatus}
</TableCell>

                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" }}>
                    {client.amountPaid}
                  </TableCell>
                  <TableCell align="right" sx={{ fontFamily: "'EB Garamond', serif" , color: "red" }}>
                    {client.price - client.amountPaid}
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
