require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clientsRouter = require('./routes/clients');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

const uri =  "mongodb+srv://tofunmi:jafsmat@cluster0.qz8lf4t.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})

.then(() => console.log('MongoDB database connection established successfully'))
.catch(err => console.error('Could not connect to MongoDB', err));

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

app.use('/clients', clientsRouter);
app.use('/users', usersRouter);

const Client = require('./models/Client'); // import the Client model

// app.post('/users/save-client', (req, res) => {
//     const clientData = new Client(req.body);
//     clientData.save()
//         .then(client => res.json('Client saved!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//         console.log('Endpoint /users/save-client hit');
// });

app.delete('/clients/delete-client/:id', (req, res) => {
    const clientId = req.params.id;
    Client.findByIdAndDelete(clientId)
      .then(() => res.json('Client deleted!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
  
  // Your other code...

// Changed '/users/save-client' to '/clients/save-client'
app.post('/clients/save-client', (req, res) => {
    const clientData = new Client(req.body);
    clientData.save()
        .then(client => res.json('Client saved!'))
        .catch(err => res.status(400).json('Error: ' + err));
        console.log('Endpoint /clients/save-client hit');
});

app.put('/clients/update-client/:id', (req, res) => {
    const clientId = req.params.id;
    const updatedClientData = req.body;
  
    Client.findByIdAndUpdate(clientId, updatedClientData, { new: true })
      .then(client => {
        if (!client) {
          return res.status(404).json('Client not found');
        }
        res.json('Client updated!');
      })
      .catch(err => {
        console.error('Error updating client:', err);
        res.status(500).json('Error updating client');
      });
  });
  




app.get('/clients/get-client', (req, res) => {
    Client.find()
      .then((clients) => res.json(clients))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
app.listen(5005, () => {
    console.log("Server is running on Port: 5005");
});
