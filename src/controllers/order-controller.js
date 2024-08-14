const firstOrderService=require('../services/order-services/allOrderStatus');
const {createOrder}= require('../services/order-services/createOrder');
const thirdOrderService=require('../services/order-services/findGetDeleteOrder');
const User = require('../models/user-model');

// const createOrder = async (req, res) => {
//     try {

//         const user = await User.findById(req.user);
//     console.log("Request body:", req.body); 

//         if (!user) {
//             return res.status(404).send({ error: 'User not found' });
//         }
        
//         const shippingAddress = req.body.shippingAddress;

//         const order = await createOrder(user, shippingAddress);
//         return res.status(201).send(order);
//     } catch (error) {
//         console.error("Error creating order: ", error);
//         return res.status(500).send({ error: error.message });
//     }
// };

const createOrderController = async (req, res) => {
    const user = req.user;
    console.log("userr ",user,req.body)
    try {
      let createdOrder = await createOrder(user, req.body);
  
      console.log("order ", createdOrder);
  
      return res.status(201).send(createdOrder);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

const findOrderById = async (req, res) => {
    const user =await req.user;
    try {
        let createdOrder = await thirdOrderService.findOrderById(req.params.id);
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const orderHistory = async (req, res) => {
    const user =await req.user;
    try {
        let createdOrder = await thirdOrderService.usersOrderHistory(user._id);
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders =await await thirdOrderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


module.exports = {
    createOrderController,
    findOrderById,
    orderHistory,
    getAllOrders,
};
