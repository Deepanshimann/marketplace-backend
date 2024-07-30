const userService = require('../user-services');
const { findCartItemById }=require("./findCartItemById");
//Increasing number of products of an item
async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        // Find the cart item by its ID
        const item = await findCartItemById(cartItemId);
        if (!item) {
            throw new Error("Cart item not found: " + cartItemId);
        }

        // Find the user by the user ID from the cart item
        const user = await userService.findUserById(item.userId);
        if (!user) {
            throw new Error("User not found: " + userId);
        }

        // Check if the user is the owner of the cart item
        if (user._id.toString() === userId.toString()) {
            // Update the cart item details
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;

            // Save the updated cart item
            const updatedCartItem = await item.save();
            return updatedCartItem;
        } else {
            throw new Error("You can't update this cart item");
        }
    } catch (error) {
        console.error("Error updating cart item:", error);
        throw new Error(error.message);
    }
}


module.exports = { updateCartItem };
