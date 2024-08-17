---

### Backend README.md

````markdown
# Backend for Product Search Application

## Overview

This is the backend application for the Product Search Application. It is built using Node.js, Express.js, and MongoDB. It includes API endpoints for product management and user authentication.

## Features

- API endpoints for fetching, searching, filtering, and sorting products
- Pagination for efficient loading of products
- User authentication using Google and Email/Password via Firebase
- Insert dummy product data (at least 40 products)

## Setup

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/product-search-backend.git
   cd product-search-backend
   ```
````

2.  Install dependencies:
    npm install

3.  Set up environment variables:
    -Create a .env file in the root directory.
    -Add your MongoDB URI

    MONGO_URI=your_mongodb_uri

4.  Start the server:
    npm run dev

5.  Open your browser or API client and use the API endpoints available at http://localhost:9000
