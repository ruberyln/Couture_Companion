const router = require('express').Router();
let User = require('../models/user.model');

router.route('/add').post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({firstname, lastname, email, password});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
        if(user.password === password) res.json('Login successful!')
        else res.status(400).json('Invalid password')
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/save-client').post((req, res) => {
  const data = req.body;
  
  const newClient = new Client(data);

  newClient.save()
    .then(() => res.json('Client added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;
