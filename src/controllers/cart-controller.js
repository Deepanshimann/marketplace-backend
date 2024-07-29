const addCartItem=require('../services/cart-services/addCartItem');
const findUserCart=require('../services/cart-services/findUserCart');

const findUserCart = async (req, res) => {
    const user = req.user;
    try {
        const cart = await findUserCart.findUserCart(user.id);
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const addItemToCart = async (req, res) => {
    const user = req.user;
    try {
        const cartItem = await addCartItem.addCartItem(user.id, req.body);
        return res.status(200).send(cartItem);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    findUserCart,
    addItemToCart
};