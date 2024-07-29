const Order = require('../../models/order-model');


// Function to find an order by its ID
async function findOrderById(orderId) {
    try {
        const order = await Order.findById(orderId)
            .populate("user")
            .populate({ path: "orderItems", populate: { path: "product" } })
            .populate("shippingAddress");
        if (order) {
            return order;
        } else {
            throw new Error("Order not found with id: " + orderId);
        }
    } catch (error) {
        console.error("Error finding order by ID:", error);
        throw new Error(error.message);
    }
}

// Function to get order history for a specific user
async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } })
            .lean();
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to get all orders
async function getAllOrders() {
    try {
        return await Order.find()
            .populate({ path: "orderItems", populate: { path: "product" } })
            .lean();
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to delete an order by its ID
async function deleteOrder(orderId) {
    try {
        const order = await findOrderById(orderId);
        await Order.findByIdAndDelete(order._id);
        return "Order deleted successfully";
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports = {
    usersOrderHistory,
    getAllOrders,
    deleteOrder,
    findOrderById,
};
