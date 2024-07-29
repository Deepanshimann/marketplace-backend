const Cart = require('../../models/cart-model');  // Ensure the correct path
const CartItem = require('../../models/cartitem-model');  // Ensure the correct path
const Product = require('../../models/product-model');  // Ensure the correct path

async function addCartItem(userId, req) {
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        // Find the product by ID
        const product = await Product.findById(req.productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Check if the item is already in the cart
        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });
        
        if (!isPresent) {
            // Create a new cart item if not present
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice || product.price,
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return "Item added to cart";
        } else {
            // If item is present, update the quantity
            isPresent.quantity += 1;
            await isPresent.save();
            return "Item quantity updated in cart";
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw new Error(error.message);
    }
}

module.exports = { addCartItem };
