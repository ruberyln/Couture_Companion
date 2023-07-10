// Notifications.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

import { indigo, red } from '@mui/material/colors'; 

const Notifications = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5005/clients/get-client')
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '120px' }}>
   {/* <Card sx={{ minWidth: 400, margin: '0 5px', bgcolor: red[100] }}> */}
   <Card sx={{ minWidth: 40, margin: '0 5px', bgcolor: red[100] }}>
       <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <Avatar sx={{ bgcolor: red[300], alignItems: 'center' }}>
           
          </Avatar>
     <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 50, textAlign: 'center', color: red[300] }}>Upcoming Birthdays</Typography>
      {upcomingBirthdays.map(client => (
        <div key={client.id}>
                  <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 14, textAlign: 'center', color: red[300] }}>{client.firstName}'s birthday is coming up on {client.birthday}
                  </Typography>
        </div>
        
      ))}
      </CardContent>
      </Card>
      <Card sx={{ minWidth: 40, margin: '0 5px', bgcolor: indigo[100] }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ bgcolor: indigo[300], alignItems: 'center' }}>
        
          </Avatar>
      <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 50, textAlign: 'center', color: indigo[300] }}>Due Deliveries</Typography>
      {dueDeliveries.map(client => (
        <div key={client.id}>
        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 14, textAlign: 'center', color: indigo[300] }}>
          Delivery for {client.firstName} is due on {client.deliveryDate}</Typography>
        </div>
      ))}
      </CardContent>
      </Card>
    {/* </Card> */}
    </div>
  )
}

export default Notifications;
