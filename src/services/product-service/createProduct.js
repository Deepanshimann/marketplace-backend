const Product = require('../../models/product-model');
const Category = require('../../models/category-model');

// Function to create a product
async function createProduct(reqData) {
    // Check and create top level category
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1
        });
        await topLevel.save();
    }

    // Check and create second level category
    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id
    });
    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        });
        await secondLevel.save();
    }

    // Check and create third level category
    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id
    });
    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        });
        await thirdLevel.save();
    }

    // Create the product
    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountPercent: reqData.discountPercent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.sizes,
        quantity: reqData.quantity,
        category: thirdLevel._id,
    });

    return await product.save();
}

// Function to find a product by ID
async function findProductById(id) {
    const product = await Product.findById(id).populate('category').exec();
    if (!product) {
        throw new Error("Product not found with id " + id);
    }
    return product;
}

// Function to delete a product by ID
async function deleteProduct(productId) {
    const product = await findProductById(productId);
    await Product.findByIdAndDelete(productId);
    return "Product deleted successfully";
}

// Function to update a product by ID
async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData, { new: true });
}

async function createMultipleProduct(products) {
    const results = [];
    for (let product of products) {
        try {
            const createdProduct = await createProduct(product);
            results.push({ status: 'success', product: createdProduct });
        } catch (error) {
            console.error("Error creating product:", error);
            results.push({ status: 'error', message: error.message, product });
        }
    }
    return results;
}

// Export the functions
module.exports = {
    createProduct,
    findProductById,
    deleteProduct,
    updateProduct,
    createMultipleProduct
};
