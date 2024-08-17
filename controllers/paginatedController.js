const asyncHandler = require('express-async-handler');
const { getDataFromDatabase, getTotalItemCount } = require('./productController'); // Import functions from your model

// Pagination, Filtering, Searching, and Sorting Controller
const getPaginatedData = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const category = req.query.category || "";
        const brand = req.query.brand || "";
        const priceRange = req.query.priceRange ? req.query.priceRange.split(',').map(Number) : [];
        const searchTerm = req.query.searchTerm || "";
        const sortOrder = req.query.sortOrder || "date-desc"; // Default sorting by newest

        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: 'Page and limit must be greater than 0' });
        }

        const startIndex = (page - 1) * limit;

        // Fetch filtered, searched, and sorted data from the database
        const data = await getDataFromDatabase({
            startIndex,
            limit,
            category,
            brand,
            // priceRange,
            searchTerm,
            sortOrder
        });

        // Fetch the total number of filtered and searched items in the collection
        const totalCount = await getTotalItemCount({ category, brand, priceRange, searchTerm });
        const totalPages = Math.ceil(totalCount / limit);

        const paginatedResponse = {
            page,
            limit,
            totalPages,
            totalCount,
            data,
        };
        res.status(200).json(paginatedResponse);
    } catch (error) {
        console.error('Error fetching paginated data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

module.exports = {
    getPaginatedData,
};
