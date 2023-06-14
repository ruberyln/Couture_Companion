const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

router.post('/save-client', async (req, res) => {
    const newClient = new Client(req.body);
    
    try {
        await newClient.save();
        res.status(200).json(newClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
