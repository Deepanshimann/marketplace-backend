const CartItem = require('../../models/cartitem-model');

async function findCartItemById(cartItemId) {
    try {
        const cartItem = await CartItem.findById(cartItemId).populate('product');
        if (cartItem) {
            return cartItem;
        } else {
            throw new Error("Cart item not found with id: " + cartItemId);
        }
    } catch (error) {
        console.error("Error finding cart item by ID:", error);
        throw new Error(error.message);
    }
}

module.exports = {findCartItemById};
