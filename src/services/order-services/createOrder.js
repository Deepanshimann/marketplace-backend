const Address = require('../../models/address-model');
const Cart = require('../../models/cart-model');
const CartItem = require('../../models/cartitem-model');
const Order = require('../../models/order-model');
const OrderItem = require('../../models/orderitem-model');
const userService = require('../user-services');
const cartService = require('../cart-services');

async function createOrder(user, shippingAddress) {
    let address;

    // Check if shipping address already exists
    if (shippingAddress._id) {
        let existAddress = await Address.findById(shippingAddress._id);
        address = existAddress;
    } else {
        // Create a new address if it does not exist
        address = new Address(shippingAddress);
        address.user = user;
        await address.save();

        // Add the new address to the user's addresses
        user.addresses.push(address);
        await user.save();
    }

    // Find the user's cart
    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    // Loop through each cart item to create corresponding order items
    for (const item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice,
        });

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }

    // Create the order
    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discount: cart.totalPrice - cart.totalDiscountedPrice,
        totalItem: cart.totalItem,
        shippingAddress: address,
    });

    const savedOrder = await createdOrder.save();
    return savedOrder;
}

module.exports = { createOrder };
