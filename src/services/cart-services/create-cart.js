const Cart = require("../../models/cart-model");

async function createCart(user) {
    try {
      //new cart instance with user as object
      const cart = new Cart();
      cart.user=user;
      const createdCart = await cart.save();
      return createdCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  module.exports = { createCart };