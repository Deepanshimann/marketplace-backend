const firstProductService = require('../services/product-service/createProduct');
const secondProductService = require('../services/product-service/getAllProducts');

const createProduct = async (req, res) => {
    try {
        console.log("createProduct called");
        const product = await firstProductService.createProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        console.error("Error in createProduct:", error);
        return res.status(500).send({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        console.log("updateProduct called");
        const productId = req.params.id;
        const product = await firstProductService.updateProduct(productId, req.body);
        return res.status(201).send(product);
    } catch (error) {
        console.error("Error in updateProduct:", error);
        return res.status(500).send({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        console.log("deleteProduct called");
        const productId = req.params.id;
        const product = await firstProductService.deleteProduct(productId);
        return res.status(201).send(product);
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        return res.status(500).send({ error: error.message });
    }
};

const findProductById = async (req, res) => {
    try {
        console.log("findProductById called");
        const productId = req.params.id;
        const product = await firstProductService.findProductById(productId);
        return res.status(201).send(product);
    } catch (error) {
        console.error("Error in findProductById:", error);
        return res.status(500).send({ error: error.message });
    }
};

const createMultipleProducts = async (req, res) => {
    try {
        console.log("createMultipleProducts called");
        await firstProductService.createMultipleProduct(req.body);
        return res.status(201).send({ message: 'Products created successfully' });
    } catch (error) {
        console.error("Error in createMultipleProducts:", error);
        return res.status(500).send({ error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        console.log("getAllProducts called");
        console.log("get call");
        const products = await secondProductService.getAllProducts(req.query);
        return res.status(201).send(products);
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    findProductById,
    createMultipleProducts,
    getAllProducts,
};
