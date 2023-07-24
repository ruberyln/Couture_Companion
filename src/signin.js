import * as React from 'react';
import { useState } from 'react';
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
import image3 from './myImage/image3.png'
import { useNavigate } from 'react-router-dom';
import  {red} from '@mui/material/colors'



const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate(); 
 
  const [errorMessage, setErrorMessage] = useState(''); // new state for error messages
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
  
    const response = await fetch('http://localhost:5005/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      }),
    });
  
    const result = await response.json();
  
    if (response.ok) {
      localStorage.setItem('userId', result.id); 
      navigate('/drawer'); 
    } else {
      if(result.message === 'Invalid email'){
        setErrorMessage('Invalid email. Please try again.');
      } else if (result.message === 'Invalid password'){
        setErrorMessage('Invalid password. Please try again.');
      } else {
        setErrorMessage('Oops ! Invalid Email or Password.');
      }
    }
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
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
             WELCOME BACK 
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {errorMessage && <Typography sx= {{color:red[400]}} > {errorMessage}</Typography>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              
             
              />
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
            
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               LOG IN
              </Button>
              <Grid container>
                <Grid item xs>
                
                </Grid>
                <Grid item>
                  <Link href="http://localhost:3000/signup">
                    {"Dont have an account? Sign Up"}
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
           <img src={image3}
            alt="My Image" 
            style={{width: '100%', height: 'auto'}} />


      </Grid>
      </Grid>
    </ThemeProvider>
  );
}