import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { IconButton } from '@mui/material';
import  {Avatar}  from '@mui/material';
import axios from 'axios';
import { indigo } from '@mui/material/colors';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

function LogoutPage() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
   
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    const handleLogout = async () => {
        
        const response = await fetch('http://localhost:5005/logout', {
            method: 'post',
            withCredentials: true
        })
        .then(function(response) {
            // Handle success
            console.log('Logged out');
            handleClose();
            navigate('/signin'); // or wherever you want to redirect after logging out
        })
        .catch(function(error) {
            // Handle error
            console.log('Logout error:', error);
        });
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <Avatar sx={{ bgcolor: indigo[500] }}>
                    <PowerSettingsNewIcon/>
                </Avatar>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Log Out"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick = {handleLogout} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LogoutPage;
