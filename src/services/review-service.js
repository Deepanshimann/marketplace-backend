const Review = require('../models/review-model');
const productService = require('./product-service/createProduct');

async function createReview(reqData, user) {
    try {
        // Find the product by its ID
        const product = await productService.findProductById(reqData.productId);
        if (!product) {
            throw new Error("Product not found: " + reqData.productId);
        }

        // Create a new review
        const review = new Review({
            user: user._id,
            product: product._id,
            review: reqData.review,
            createdAt: new Date(),
        });

        // Save the review
        const savedReview = await review.save();
        return savedReview;
    } catch (error) {
        console.error("Error creating review:", error);
        throw new Error("Error creating review: " + error.message);
    }
}

async function getAllReview(productId) {
    try {
        // Find the product by its ID
        const product = await productService.findProductById(productId);
        if (!product) {
            throw new Error("Product not found: " + productId);
        }

        // Get all reviews for the product
        const reviews = await Review.find({ product: productId }).populate('user');
        return reviews;
    } catch (error) {
        console.error("Error getting product reviews:", error);
        throw new Error("Error getting product reviews: " + error.message);
    }
}

module.exports = {
    createReview,
    getAllReview,
};
