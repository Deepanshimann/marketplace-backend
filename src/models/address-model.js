const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    street: {
        type: String,
        required: [true, 'Street is required'],
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
    },
    county: {
        type: String,
        required: [true, 'County is required'],
        trim: true,
    },
    postcode: {
        type: String,
        required: [true, 'Postcode is required'],
        trim: true,
        match: [/^[A-Za-z]{2}\d{1}\s\d{1}[A-Za-z]{2}$/, 'Please enter a valid postcode']
    },
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    }
});

const Address = mongoose.model("addresses", AddressSchema);
module.exports = Address;
