const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  phoneNumber: {
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
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
    required: [true, 'Role is required'],
  },
  address: [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses",
    }
  ],
  paymentInformation:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment_information"
    }
  ],
  ratings:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratings"  
    }
  ],
  reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews"  
    }
  ],
}, { timestamps: true });

 const User= mongoose.model('users', userSchema);
 module.exports=User;