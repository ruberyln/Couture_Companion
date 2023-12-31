import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image1 from './myImage/image1.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const defaultTheme = createTheme();

export default function SignUp() {

  const navigate = useNavigate(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        
        const response = await fetch('http://localhost:5005/users/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: data.get('firstName'),
            lastname: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
          }),
        });
    console.log('response',response);
        const result = await response.json();
      
        console.log(result); // 'User added!' if the request was successful

        if (response.ok) { // If the request was successful
          localStorage.setItem('userId', result._id);
          localStorage.setItem('firstName', data.get('firstName')); // Save the user's ID for later
          navigate('/drawer','/profile', {
            state: {
              firstName: data.get('firstName'),
              lastName: data.get('lastName'),
              email: data.get('email'),
              password: data.get('password')
            }
          });
        
        }
      };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box 
          onSubmit={handleSubmit}
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
           CREATE ACCOUNT
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
           
            <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstName"
                autoComplete="off"
                autoFocus
              />

<TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastName"
                autoComplete= "off"
             
              />
              
               <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
            
              />
            

              <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
              />
              </Grid>
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                CREATE ACCOUNT
              </Button>
              <Grid container>
                <Grid item xs>
                  
                </Grid>
                <Grid item>
                  <Link href="http://localhost:3000/signin">
                    {" have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
             
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7} 
          >
           <img src={image1}
            alt="My Image" 
            style={{width: '100%', height: 'auto'}} />

         
      </Grid>
      </Grid>
    </ThemeProvider>
  );
}