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
import ListAltIcon from '@mui/icons-material/ListAlt';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutPage from './logout';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { indigo , pink, blue, green, red, orange } from '@mui/material/colors';
import { Typography } from '@mui/material';
// import image4 from './myImage/image4.JPG'

// import LogoutPage from './components/logout';

import Link from '@mui/material/Link';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

export default function OnlyDrawer({}) {
  
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/NewUser")

  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

 return(

<Box sx={{ display: 'flex' }}>
<CssBaseline />
<AppBar position="fixed" open={open} sx={{ bgcolor: 'white', color: 'black'}}>
  <Toolbar>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{
        marginRight: 5,
        ...(open && { display: 'none' }),
      }}
    >
     
      <MenuIcon />
    
    </IconButton>
    {/* <img src={image4}
        alt="My Image" 
        style={{width: '2%', height: '2%'}} /> */}
    <Typography sx={{ fontFamily: "'EB Garamond', serif" }} >  RUBBIE TECH </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>

      <IconButton>

    

        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search…"
      />
    </Box>
    <Box sx={{ flexGrow: 1}} />  

    <Button 
   onClick={handleClick}
    startIcon={<AddCircleIcon />} variant="outlined" sx= {{ bgcolor: indigo[100], color:indigo[400], borderRadius:'25px' }}>
      Add New Client
    </Button>

    <IconButton sx = {{ ml: 2 }}>
    <Avatar sx={{ bgcolor: orange[500] }}>
  <NotificationsNoneOutlinedIcon  />
  </Avatar>
    </IconButton>

   
    
    <Avatar sx={{ bgcolor: pink[500] }}>
  <Person2OutlinedIcon  />
  </Avatar>

   
  </Toolbar>
</AppBar>
 
<Drawer variant="permanent" open={open}>
  <DrawerHeader>
    <IconButton onClick={handleDrawerClose}>
      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  </DrawerHeader>
  <Divider />
  <List>
    {['Home'].map((text) => (
      <ListItem key={text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 100,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          cursor="pointer" onClick={() =>{
            navigate("/")
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          }
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
            component={Link}
            href={"/drawer "}
          >
            
            <Avatar sx={{ bgcolor: blue[500] }}>
            <HomeOutlinedIcon />
  </Avatar>
        

          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>

  <List>
    {['Notifications'].map((text,) => (
      <ListItem key={text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 100,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          component={Link}
          href={"/notifications "}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}>

<Avatar sx={{ bgcolor: orange[500] }}>
  <NotificationsNoneOutlinedIcon  />
  </Avatar>
            

          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>

  <List>
    {['Profile'].map((text,) => (
      <ListItem key={text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 100,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          component={Link}
          href={"/profile"}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}>
              <Avatar sx={{ bgcolor: pink[500] }}>
  <Person2OutlinedIcon  />
  </Avatar>
        

          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
 
  <List>
    {['Orders'].map((text,) => (
      <ListItem key={text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 100,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          component={Link}
          href={"#"}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}>
              <Avatar sx={{ bgcolor: red[300] }}>
  < ListAltIcon />
  </Avatar>
        

          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>

  <List sx={{ fontFamily: "'EB Garamond', serif"}}>
    {['Clients'].map((text,) => (
      <ListItem key={text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 100,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          component={Link}
          href={"#"}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}>
              <Avatar sx={{ bgcolor: green[300] }}>
  < PeopleIcon />
  </Avatar>
        

          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
  <List>
    {['Logout'].map((text,) => (
      <ListItem key={text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 250,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          component={Link}
        
        >
           <LogoutPage/>
           
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}>
          

          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
  </Drawer>
  </Box>
 );
}