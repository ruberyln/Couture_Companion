import { Box } from '@mui/system';
import React from 'react';
import image6 from './myImage/image6.png'
import { Button, Typography, Stack } from '@mui/material';
import {pink, orange, blue, violet, red, indigo, deepOrange} from '@mui/material/colors'

const Album = () => (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      backgroundImage: `url(${image6})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >

    <Box 
     sx={{

      marginLeft: '150px',
    
    }}> 
   <Typography 
   sx={{ fontFamily: "'EB Garamond', serif", fontSize: 80 
    }}> COUTURE 
    </Typography>
    <Typography 
   sx={{ fontFamily: "'EB Garamond', serif", fontSize: 50 
    }}> COMPANION 
    </Typography>
    <Typography 
   sx={{ fontFamily: "'EB Garamond', serif", fontSize:15 
    }}> A fashion designers best friend
 
    </Typography>
 
    <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              // justifyContent="center"
            >
    <Button variant="contained" sx= {{  bgcolor:deepOrange [400],}} >SIGN UP</Button>
    <Button variant="contained"> SIGN IN </Button>
    </Stack>
   </Box>
  </Box>
);

export default Album;
