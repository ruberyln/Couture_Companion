// Notifications.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h2>Upcoming Birthdays</h2>
      {upcomingBirthdays.map(client => (
        <div key={client.id}>
          <p>{client.firstName}'s birthday is coming up on {client.birthday}</p>
        </div>
      ))}
      <h2>Due Deliveries</h2>
      {dueDeliveries.map(client => (
        <div key={client.id}>
          <p>Delivery for {client.firstName} is due on {client.deliveryDate}</p>
        </div>
      ))}
    </div>
  )
}

export default Notifications;
