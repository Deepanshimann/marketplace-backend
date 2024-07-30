const Cart = require("../../models/cart-model");
const CartItem = require('../../models/cartitem-model');

async function addCartItem(userId, itemData) {
    try {
        // Find the cart for the user
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId });
            await cart.save();
        }

        // Check if the item already exists in the cart
        let cartItem = await CartItem.findOne({ cart: cart._id, product: itemData.productId });
        if (cartItem) {
            // Update the quantity if the item exists
            cartItem.quantity += itemData.quantity;
        } else {
            // Create a new cart item if it doesn't exist
            cartItem = new CartItem({
                cart: cart._id,
                product: itemData.productId,
                size: itemData.size,
                quantity: itemData.quantity,
                price: itemData.price,
                discountedPrice: itemData.discountedPrice,
                userId: userId
            });
        }

        await cartItem.save();

        // Add the cart item to the cart
        cart.cartItems.push(cartItem._id);
        await cart.save();

        return cart;
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
}

module.exports = { addCartItem };
