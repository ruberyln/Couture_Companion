require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

const uri =  "mongodb+srv://tofunmi:jafsmat@cluster0.qz8lf4t.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const Client = require('./models/Client'); // import the Client model

app.post('/save-client', (req, res) => {
    const clientData = new Client(req.body);
    clientData.save()
        .then(client => res.json('Client saved!'))
        .catch(err => res.status(400).json('Error: ' + err));
});





app.listen(5005, () => {
    console.log("Server is running on Port: 5005");
});
