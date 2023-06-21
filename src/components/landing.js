import React from "react"

import { Grid } from "@mui/material";
import image1 from './myImage/image1.png'
export default function Landing () {
    return (

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
    );
}


