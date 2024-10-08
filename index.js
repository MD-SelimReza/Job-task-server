const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());

/** api routes */
app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/productRoutes'));

// Connect to the database
connectDB();

/** HTTP GET request */
app.get('/', (req, res) => {
    res.status(201).json('Server is running...');
});

/** server start */
app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
});
