const { addCartItem } = require('../services/cartItem-service/addCartItem');
const { findUserCart } = require('../services/cart-services/findUserCart');

const findUserCartController = async (req, res) => {
    const user = req.user;
    try {
        const cart = await findUserCart(user._id);
        return res.status(200).send(cart);
    } catch (error) {
        console.error("Error in findUserCart:", error);
        return res.status(500).send({ error: error.message });
    }
};

const addItemToCartController = async (req, res) => {
    const user = req.user;
    try {
        const cartItem = await addCartItem(user._id, req.body);
        return res.status(200).send(cartItem);
    } catch (error) {
        console.error("Error in addItemToCart:", error);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    findUserCart: findUserCartController,
    addItemToCart: addItemToCartController
};
