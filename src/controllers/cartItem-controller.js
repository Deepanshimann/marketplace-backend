const firstCartService=require('../services/cartItem-service/updateCartItem');
const cartItemService = require('../services/cartItem-service/removeAndFindcartitem');

const updateCartItem = async (req, res) => {
    const user = req.user;
    try {
        const updatedCartItem = await firstCartService.updateCartItem(user._id, req.params.id, req.body);
        return res.status(200).send({
            updatedCartItem,
            message: "Item added to cart successfully",
        }
        )
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


const removeCartItem = async (req, res) => {
    const user = req.user;
    try {
        await cartItemService.removeCartItem(user._id, req.params.id);
        return res.status(200).send({ message: "Cart item removed successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


module.exports = {
    updateCartItem,removeCartItem
};