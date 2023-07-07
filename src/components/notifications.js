// Notifications.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import { red } from '@mui/material/colors'; 

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
    <div>
   {/* <Card sx={{ minWidth: 400, margin: '0 5px', bgcolor: red[100] }}> */}
      <Card>
       <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
     <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 50, textAlign: 'center', color: red[300] }}>Upcoming Birthdays</Typography>
      {upcomingBirthdays.map(client => (
        <div key={client.id}>
                  <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 14, textAlign: 'center', color: red[300] }}>{client.firstName}'s birthday is coming up on {client.birthday}
                  </Typography>
        </div>
        
      ))}
      </CardContent>
      </Card>
      <Card>
      <h2>Due Deliveries</h2>
      {dueDeliveries.map(client => (
        <div key={client.id}>
          <p>Delivery for {client.firstName} is due on {client.deliveryDate}</p>
        </div>
      ))}
      </Card>
    {/* </Card> */}
    </div>
  )
}

export default Notifications;
