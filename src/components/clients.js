
import React from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import OnlyDrawer from "./onlydrawer";
import { useNavigate } from "react-router-dom";
import { green, pink } from "@mui/material/colors";
import EngineeringIcon from '@mui/icons-material/Engineering';
export default function  Clients () {
    const handleClick = () => {
        navigate("/drawer" )// Navigate back to Display page with the formData for editing
      }
    const navigate = useNavigate();

    return (
     
      <Box   sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: '150px',
        marginTop: '200px'
      }}
      > 
       <OnlyDrawer/>
        <Typography > This Page is still under construction and will be avilable in the next update </Typography>
<EngineeringIcon fontSize="large" sx={{ color: green[300] }}/>
      <Button variant="contained"  sx={{ bgcolor: green[300] }} onClick = {handleClick} > Return to Home Page</Button>
       </Box> 
    )

}
  