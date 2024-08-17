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

/**
 * Fetches paginated data from the database with optional filtering, searching, and sorting.
 * @param {Object} params - Parameters for filtering, searching, sorting, and pagination.
 * @param {number} params.startIndex - The starting index for pagination.
 * @param {number} params.limit - The number of items per page.
 * @param {string} [params.category] - Category filter.
 * @param {string} [params.brand] - Brand filter.
 * @param {Array<number>} [params.priceRange] - Price range filter [min, max].
 * @param {string} [params.searchTerm] - Search term for product names.
 * @param {string} [params.sortOrder] - Sort order (e.g., 'price-asc', 'price-desc', 'date-asc', 'date-desc').
 * @returns {Promise<Array>} - The paginated, filtered, and sorted data.
 */
const getDataFromDatabase = asyncHandler(async ({
    startIndex,
    limit,
    category = "",
    brand = "",
    priceRange = [],
    searchTerm = "",
    sortOrder = "date-desc"
}) => {
    try {
        // Build the query object for filtering and searching
        const query = {};

        if (category) {
            query.category = category;
        }

        if (brand) {
            query.brand = brand;
        }

        if (priceRange.length === 2) {
            query.price = {
                $gte: priceRange[0] || 0,
                $lte: priceRange[1] || Number.MAX_SAFE_INTEGER,
            };
        }

        if (searchTerm) {
            query.name = { $regex: searchTerm, $options: 'i' }; // Case-insensitive search on product name
        }

        // Build the sorting object
        let sort = {};
        if (sortOrder === "price-asc") {
            sort.price = 1;
        } else if (sortOrder === "price-desc") {
            sort.price = -1;
        } else if (sortOrder === "date-asc") {
            sort.createdAt = 1;
        } else if (sortOrder === "date-desc") {
            sort.createdAt = -1;
        }
        console.log("Query", query);
        // Fetch products from the database with filtering, searching, sorting, and pagination
        const products = await Product.find(query)
            .sort(sort)           // Apply sorting
            .skip(startIndex)      // Skip the number of items according to the startIndex
            .limit(limit)          // Limit the number of items returned
            .exec();               // Execute the query
        console.log(products);
        return products;
    } catch (error) {
        console.error('Error fetching paginated data:', error);
        throw new Error('Error fetching paginated data');
    }
});

/**
 * Gets the total number of items in the collection based on the filters and search criteria.
 * @param {Object} params - Parameters for filtering and searching.
 * @param {string} [params.category] - Category filter.
 * @param {string} [params.brand] - Brand filter.
 * @param {Array<number>} [params.priceRange] - Price range filter [min, max].
 * @param {string} [params.searchTerm] - Search term for product names.
 * @returns {Promise<number>} - The total count of filtered and searched items.
 */
const getTotalItemCount = asyncHandler(async ({
    category = "",
    brand = "",
    priceRange = [],
    searchTerm = ""
}) => {
    try {
        // Build the query object for filtering and searching
        const query = {};

        if (category) {
            query.category = category;
        }

        if (brand) {
            query.brand = brand;
        }

        if (priceRange.length === 2) {
            query.price = {
                $gte: priceRange[0] || 0,
                $lte: priceRange[1] || Number.MAX_SAFE_INTEGER,
            };
        }

        if (searchTerm) {
            query.name = { $regex: searchTerm, $options: 'i' }; // Case-insensitive search on product name
        }

        // Count the total number of filtered and searched items in the database
        const count = await Product.countDocuments(query).exec();
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
