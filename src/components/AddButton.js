import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';


export default function AddButtons() {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Button 
        variant="outlined" 
        startIcon={<AddCircleIcon />} 
        sx={{ 
          fontSize: '20px', 
          padding: '20px 40px',
          backgroundColor: indigo[50], '&:hover': { backgroundColor: indigo[500] }, borderRadius:'25px'  }}
      >
      <Typography sx={{ fontFamily: "'EB Garamond', serif" }}>
        Add New Client
        </Typography>
      </Button>
    </Box>
  );
}
