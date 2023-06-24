import React from "react";
import { Grid, Button } from "@mui/material";
import image3 from './myImage/image3.png'

export default function Landing() {
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      style={{
        backgroundImage: `url(${image3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" style={{ marginRight: '16px' }}>
          Login
        </Button>
        <Button variant="contained" color="secondary">
          Sign Up
        </Button>
      </div>
    </Grid>
  );
}
