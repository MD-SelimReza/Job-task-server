const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler')

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    try {
        const { product_name, product_image, description, price, category, ratings } = req.body;

        const newProduct = new Product({
            product_name,
            product_image,
            description,
            price,
            category,
            ratings,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// List all products
// const listProducts = asyncHandler(async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error', details: error.message });
//     }
// });

/**
 * Fetches paginated data from the database.
 * @param {number} startIndex - The starting index for pagination.
 * @param {number} limit - The number of items per page.
 * @returns {Promise<Array>} - The paginated data.
 */
const getDataFromDatabase = asyncHandler(async (startIndex, limit) => {
    try {
        // Fetch products from the database with pagination
        const products = await Product.find()
            .skip(startIndex)   // Skip the number of items according to the startIndex
            .limit(limit)       // Limit the number of items returned
            .exec();            // Execute the query
        return products;
    } catch (error) {
        console.error('Error fetching paginated data:', error);
        throw new Error('Error fetching paginated data');
    }
});

/**
 * Gets the total number of items in the collection.
 * @returns {Promise<number>} - The total count of items.
 */
const getTotalItemCount = asyncHandler(async () => {
    try {
        // Count the total number of products in the database
        const count = await Product.countDocuments().exec(); // Use countDocuments for accuracy
        return count;
    } catch (error) {
        console.error('Error counting items:', error);
        throw new Error('Error counting items');
    }
});


module.exports = {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getDataFromDatabase,
    getTotalItemCount,
};
