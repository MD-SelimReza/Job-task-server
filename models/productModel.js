const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    product_name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    product_image: {
        type: String,
        required: [true, 'Product image URL is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 150,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'Personal Care',
            'Clothing',
            'Electronics',
            'Outdoor',
            'Accessories',
            'Home',
            'Fitness',
        ],
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        enum: [
            'GreenLiving',
            'EcoWear',
            'SoundMax',
            'BrightHome',
        ],
    },
    ratings: {
        type: Number,
        required: [true, 'Ratings are required'],
        min: 1,
        max: 5,
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
