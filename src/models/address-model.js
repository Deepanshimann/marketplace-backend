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
      mobile: {
        type: Number,
        required: [true, 'Mobile number is required'],
        unique: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
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
    match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid postcode'],
  },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"users"
  }
});
const Address=mongoose.model("addresses",AddressSchema);
module.exports = Address;
