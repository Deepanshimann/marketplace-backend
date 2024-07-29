const orderService = require('../services/order-services/createOrder');
const allOrderStatusService = require('../services/order-services/allOrderStatus');
const findGetDeleteOrderService = require('../services/order-services/findGetDeleteOrder');

// Function to get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await findGetDeleteOrderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Function to confirm an order
const confirmOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await allOrderStatusService.confirmOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Function to ship an order
const shipOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await allOrderStatusService.shippOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Function to deliver an order
const deliverOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await allOrderStatusService.deliverOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Function to cancel an order
const cancelOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await allOrderStatusService.cancelOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Function to delete an order
const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const result = await findGetDeleteOrderService.deleteOrder(orderId);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Function to get user order history
const usersOrderHistory = async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await findGetDeleteOrderService.usersOrderHistory(userId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getAllOrders,
    confirmOrder,
    shipOrder,
    deliverOrder,
    cancelOrder,
    deleteOrder,
    usersOrderHistory,
};
