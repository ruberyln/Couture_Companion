// Notifications.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Avatar, IconButton, Tooltip, AlertTitle } from '@mui/material';

import { indigo,black, red, blue, cyan, orange } from '@mui/material/colors'; 
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import CakeIcon from '@mui/icons-material/Cake';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import OnlyDrawer from './onlydrawer';
import{Alert} from '@mui/material';
const Notifications = () => {
  const [clients, setClients] = useState([]);

  
  useEffect(() => {
    axios
    .get('http://localhost:5005/clients/get-client',{headers:{Authorization:localStorage.getItem('userId')}})
      .then(res => {
        setClients(res.data);

      
      })
      .catch(err => {
        console.error(err);
      })
  }, []);
  const checkUpcomingDates = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = Math.abs(targetDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };



  const upcomingBirthdays = clients.filter(client => checkUpcomingDates(client.birthday));
  const dueDeliveries = clients.filter(client => checkUpcomingDates(client.deliveryDate));


  // console.log(upcomingBirthdays)
  // console.log(dueDeliveries)
  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '120px' }}>
   <OnlyDrawer/>
   <Card sx={{ minWidth: 40, margin: '0 5px'}}>
       <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <Avatar sx={{ bgcolor: blue[300], alignItems: 'center' }}>
       <CakeIcon/>
          </Avatar>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 25, textAlign: 'center', color: blue[300] }}>Upcoming Birthdays</Typography>
      {upcomingBirthdays.map(client => (
        <div key={client.id}>
                <Alert severity="info"> 
                <AlertTitle>Birthday</AlertTitle>
                 {client.firstName}'s birthday is coming up on {client.birthday}  <Tooltip title="Email" arrow ><IconButton sx= {{color: blue[500]}} 
                  component="a" href={`mailto:${client.email}?subject=Happy Birthday ${client.firstName}&body=Happy Birthday ${client.firstName}!! Your birthday is  on ${client.birthday} and we specially want to thank you for your patronage with our brand.  Here is 20% off your next order using code Birthday${client.firstName} 
                ` }  >  <EmailIcon/> </IconButton></Tooltip>

                 <Tooltip title="Message" arrow>
    <IconButton sx={{color: blue[500]}} component="a" href={`sms:${client.phoneNumber}`}>
      <MessageIcon/>
    </IconButton>
  </Tooltip>
                </Alert>
        </div>
        
      ))}
      </CardContent>
      </Card>
      <Card sx={{ minWidth: 40, margin: '0 5px'}}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ bgcolor: orange[300], alignItems: 'center' }}>
        <LocalShippingIcon/>
          </Avatar>
      <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 25, textAlign: 'center', color: orange[300] }}>Upcoming Deliveries</Typography>
      {dueDeliveries.map(client => (
        <div key={client.id}>
     <Alert severity="warning">
     <AlertTitle>Due Delivery</AlertTitle>
          Delivery for {client.firstName} is due on {client.deliveryDate}  <Tooltip title="Email" arrow ><IconButton sx= {{color: orange[500]}} 
          component="a" href={`mailto:${client.email}?subject=Your Order is ready ${client.firstName} !&body=Hi ${client.firstName}!!  Your Order is ready and we will be delivered to  ${client.streetAddress}, ${client.phoneNumber}  if you would like to opt for  pick up please call company line  +234803309878 or response to this email . Thank you again for patronizing us, looking forward to more orders. 
         `} >  <EmailIcon/> </IconButton></Tooltip>
          <Tooltip title="Message" arrow>
    <IconButton sx={{color: orange[500]}} component="a" href={`sms:${client.phoneNumber}`}>
      <MessageIcon/>
    </IconButton>
  </Tooltip>
          </Alert>
        </div>
      ))}
      </CardContent>
      </Card>
    {/* </Card> */}
    </div>
  )
}

export default Notifications;
