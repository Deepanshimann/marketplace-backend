const Address = require('../../models/address-model');
const Order = require('../../models/order-model');
const OrderItem = require('../../models/orderitem-model');
const thirdCartService = require("../cart-services/findUserCart");

async function createOrder(user, shippingAddress) {
    try {
        let address;

        // Check if shipping address already exists
        if (shippingAddress._id) {
            address = await Address.findById(shippingAddress._id);
        } else {
            // Create a new address if it does not exist
            address = new Address(shippingAddress);
            address.user = user._id;
            await address.save();
        }

        // Find the user's cart
        const cart = await thirdCartService.findUserCart(user._id);
        if (!cart) {
            throw new Error('Cart not found for user');
        }

        // Create order items from cart items
        const orderItems = await Promise.all(cart.cartItems.map(async (cartItem) => {
            const orderItem = new OrderItem({
                product: cartItem.product,
                quantity: cartItem.quantity,
                price: cartItem.price,
                discountedPrice: cartItem.discountedPrice,
                size: cartItem.size,
                userId: user._id
            });
            return await orderItem.save();
        }));

        // Create the order
        const order = new Order({
            user: user._id,
            orderItems: orderItems.map(item => item._id),
            shippingAddress: address._id,
            totalPrice: cart.totalPrice,
            totalDiscountedPrice: cart.totalDiscountedPrice,
            discount: cart.discount,
            totalItem: cart.totalItem,
            orderStatus: 'PENDING'
        });

        const savedOrder = await order.save();
        return savedOrder;
    } catch (error) {
        console.error("Error creating order: ", error);
        throw error;
    }
}

module.exports = { createOrder };
