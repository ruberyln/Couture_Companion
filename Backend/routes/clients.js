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
router.put('/update-client/:id', async (req, res) => {
    const id = req.params.id;
    const updatedClient = req.body;

    try {
        const client = await Client.findByIdAndUpdate(id, updatedClient, { new: true });

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
