const asyncHandler = require('express-async-handler');
const { getDataFromDatabase, getTotalItemCount } = require('./productController'); // Import functions from your model

// Pagination Controller
const getPaginatedData = asyncHandler(async (req, res) => {
    try {
        // Extract pagination parameters from the request query
        const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit, 10) || 3; // Default to 3 items per page if not provided

        // Validate pagination parameters
        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: 'Page and limit must be greater than 0' });
        }

        // Calculate the starting index for the query
        const startIndex = (page - 1) * limit;

        // Fetch data from the database using pagination parameters
        const data = await getDataFromDatabase(startIndex, limit);

        // Fetch the total number of items in the collection (for calculating total pages)
        const totalCount = await getTotalItemCount();
        // Calculate the total number of pages
        const totalPages = Math.ceil(totalCount / limit);

        // Construct the paginated response
        const paginatedResponse = {
            page: page,
            limit: limit,
            totalPages: totalPages,
            totalCount: totalCount,
            data: data,
        };
        // Send the paginated response
        res.status(200).json(paginatedResponse);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching paginated data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

module.exports = {
    getPaginatedData,
};
