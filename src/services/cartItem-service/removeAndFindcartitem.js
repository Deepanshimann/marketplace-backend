const userService = require('../user-services');
const CartItem = require('../../models/cartitem-model');
const {findCartItemById} = require('./findCartItemById');

async function removeCartItem(userId, cartItemId) {
    try {
        // Find the cart item by its ID
        const cartItem = await findCartItemById(cartItemId);
        if (!cartItem) {
            throw new Error("Cart item not found: " + cartItemId);
        }

        // Find the user by the user ID
        const user = await userService.findUserById(userId);
        if (!user) {
            throw new Error("User not found: " + userId);
        }

        // Check if the user is the owner of the cart item
        if (user._id.toString() === cartItem.userId.toString()) {
            // Remove the cart item
            await CartItem.findByIdAndDelete(cartItemId);
            return "Item removed from cart";
        } else {
            throw new Error("You can't remove another user's item");
        }
    } catch (error) {
        console.error("Error removing cart item:", error);
        throw new Error(error.message);
    }
}

module.exports = { removeCartItem };
