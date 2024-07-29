const Rating = require('../models/ratings-model');
const productService = require('./product-service/createProduct');

async function createRating(req, user) {
    try {
        // Find the product by its ID
        const product = await productService.findProductById(req.productId);
        if (!product) {
            throw new Error("Product not found: " + req.productId);
        }

        // Create a new rating
        const rating = new Rating({
            product: product._id,
            user: user._id,
            rating: req.rating,
            createdAt: new Date(),
        });

        // Save the rating
        const savedRating = await rating.save();
        return savedRating;
    } catch (error) {
        console.error("Error creating rating:", error);
        throw new Error("Error creating rating: " + error.message);
    }
}

async function getProductRating(productId) {
    try {
        // Find the product by its ID
        const product = await productService.findProductById(productId);
        if (!product) {
            throw new Error("Product not found: " + productId);
        }

        // Get all ratings for the product
        const ratings = await Rating.find({ product: productId }).populate('user');
        return ratings;
    } catch (error) {
        console.error("Error getting product ratings:", error);
        throw new Error("Error getting product ratings: " + error.message);
    }
}

module.exports = {
    createRating,
    getProductRating,
};
