const Cart = require("../../models/cart-model");
const CartItem = require('../../models/cartitem-model');


async function findUserCart(userId) {
  try {
      // Find the cart for the user
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
          throw new Error('Cart not found');
      }

      // Find the cart items for the cart
      const cartItems = await CartItem.find({ cart: cart._id }).populate('product');
      cart.cartItems = cartItems;

      // Initialize totals
      let totalPrice = 0;
      let totalDiscountedPrice = 0;
      let totalItem = 0;

      // Calculate totals
      for (let cartItem of cart.cartItems) {
          totalPrice += cartItem.price;
          totalDiscountedPrice += cartItem.discountedPrice;
          totalItem += cartItem.quantity;
      }

      // Update cart with totals
      cart.totalPrice = totalPrice;
      cart.totalItem = totalItem;
      cart.discount = totalPrice - totalDiscountedPrice;

      // Return the cart with updated values
      return cart;
  } catch (error) {
      console.error("Error finding user cart:", error);
      throw error;
  }
}

module.exports = { findUserCart };
