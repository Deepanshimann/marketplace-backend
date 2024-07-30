const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
 
  },
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orderItems',
   
  }],
  orderDate: {
    type: Date,
   
    default: Date.now(),
  },
  deliveryDate: {
    type: Date,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'addresses',
   
  },
  paymentDetails: {
    paymentMethod: {
      type: String,
     
    },
    transactionId: {
      type: String,
    
    },
    paymentId: {
      type: String,
      
    },
    paymentStatus: {
      type: String,
      default: "PENDING",
    },
  },
  totalPrice: {
    type: Number,
   
  },
  totalDiscountedPrice: {
    type: Number,
   
  },
  discount: {
    type: Number,
   
  },
  orderStatus: {
    type: String,
  
    default: "PENDING",
  },
  totalItem: {
    type: Number,
  
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
