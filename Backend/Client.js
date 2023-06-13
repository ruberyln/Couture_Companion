const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ClientSchema = new Schema({
    firstName: String,
    lastName: String,
    birthday: String,
    phoneNumber: String,
    email: String,
    streetAddress: String,
    postalCode: String,
    city: String,
    state: String,
    price: String,
    deliveryDate: String,
    amountPaid: String,
    noofOrders: String,
    fabricType: String,
    orderSummary: String,
    // Include other form fields...
    images: [String],
    additionalMeasurements: [String]
});

module.exports = mongoose.model('Client', ClientSchema);
