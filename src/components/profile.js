import * as React from 'react';
import { useEffect, useState } from 'react';
import { rest } from 'lodash';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { pink } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import OnlyDrawer from './onlydrawer';
import { Container } from '@mui/system';


const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));


const label = { inputProps: { 'aria-label': 'Color switch demo' } };


export default function Profile() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { firstName } = location.state || {};
  const { lastName } = location.state || {};
  const { email } = location.state || {};
  const { password } = location.state || {};


  const [editedFirstName, setEditedFirstName] = useState(firstName);
const [editedLastName, setEditedLastName] = useState(lastName);
const [editedPassword, setEditedPassword] = useState(password);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userId = localStorage.getItem('userId');
  //     if (!userId) {
  //       console.log('No user ID found');
  //       return;
  //     }
  //     const response = await fetch(`http://localhost:5005/users/${userId}`);
  //     const userData = await response.json();
  //     setUser(userData);
  //   };
  //   fetchData();
  // }, []);

  // const handleSave = async () => {
  //   const userId = localStorage.getItem('userId');
  //   if (!userId) {
  //     console.log('No user ID found');
  //     return;
  //   }
  //   const response = await fetch(`http://localhost:5005/users/${userId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(user),
  //   });
  //   const result = await response.json();
  //   console.log(result); // 'User updated!' if the request was successful
  // };

  // if (!user) {
  //   return <div>Loading...</div>; // or your loading screen
  // }

  return (

    <>
 
<Container >

<OnlyDrawer /> 
<Box sx={{ mx: 5, 
 display: 'flex',
 flexDirection: 'column', 
 alignItems: 'center' ,
 marginLeft: '150px',
  marginTop: '200px'}}>

  <Avatar  src="/static/images/avatar/1.jpg" 
    sx= {{ width: 56, height: 56 }}/>

     
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        marginLeft: '15px',
        marginTop: '20px'
      }}
      noValidate
      autoComplete="off"
    >
     <TextField
          margin="normal"
          fullWidth
          id="firstName"
          label="First Name"
          variant="standard"
          value={firstName}
          onChange={e => setUser({...user, firstName: e.target.value})}
        />
        <TextField
          fullWidth
          id="lastName"
          label="Last Name"
          variant="standard"
          value={lastName}
          onChange={e => setUser({...user, lastName: e.target.value})}
        />

<TextField
          fullWidth
          id="email"
          label="Email"
          variant="standard"
          value={email}
          onChange={e => setUser({...user, email: e.target.value})}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          variant="standard"
          value={password}
          onChange={e => setUser({...user, email: e.target.value})}
        />
    
     
      <Box >

      <Typography sx={{ fontFamily: "'EB Garamond', serif" }}>Notification Settings</Typography>

    <Stack direction="row" spacing={5}> 
    <Typography sx={{ fontFamily: "'EB Garamond', serif" }}>Client birthday</Typography>  <PinkSwitch {...label} defaultChecked /> 
    <Typography sx={{ fontFamily: "'EB Garamond', serif" }}> Due Delivery </Typography>  <PinkSwitch {...label} defaultChecked />
    <Typography variant="h6" noWrap>
      Hello,
    </Typography>
     </Stack>
     </Box>
     {/* <Button onClick={handleSave}>Save</Button> */}
    </Box>
   

     </Box>

   
   
     </Container>
    </>
  
  );
}