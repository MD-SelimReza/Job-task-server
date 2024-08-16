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
const listProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    listProducts,
};
