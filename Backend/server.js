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
app.put('/clients/update-client/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;
  console.log('Update client route hit with id:', req.params.id);
  Client.findByIdAndUpdate(id, update, { new: true }, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

app.delete('/clients/delete-client/:id', (req, res) => {
  const clientId = req.params.id;
  Client.findByIdAndDelete(clientId)
    .then(() => res.json('Client deleted!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

  
app.post('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy((err) => {
      if(err) {
        return res.json({ logout: false, error: 'Failed to logout.' });
      }
      res.clearCookie('session-name');
      return res.json({ logout: true });
    });
  } else {
    return res.json({ logout: false, error: 'No active session.' });
  }
});


// Changed '/users/save-client' to '/clients/save-client'
app.post('/clients/save-client', (req, res) => {
    const clientData = new Client(req.body);
    clientData.save()
        .then(client => res.json('Client saved!'))
        .catch(err => res.status(400).json('Error: ' + err));
        console.log('Endpoint /clients/save-client hit');
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new MongoClient.ObjectID(id) };
  db.collection('users').findOne(details, (err, item) => {
    if (err) {
      res.status(500).send({ error: 'An error has occurred' });
    } else {
      res.send(item);
    }
  });
});
  




app.get('/clients/get-client', (req, res) => {

    Client.find({addedBy:req.headers.authorization})
      .then((clients) => res.json(clients))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
app.listen(5005, ()  => {
    console.log("Server is running on Port: 5005");
});
