import React from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import OnlyDrawer from "./onlydrawer";
import { useNavigate } from "react-router-dom";
export default function  Notifications () {
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
      }}
      > 
       <OnlyDrawer/>
        <Typography > Oops you have no Notifications </Typography>
      <Button onClick = {handleClick} > Return to Home Page</Button>
       </Box> 
    )

}