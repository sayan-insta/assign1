const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data storage
let orders = [];
let categories = [];

// Routes for Orders

// GET all orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

// POST a new order
app.post('/orders', (req, res) => {
    const newOrder = req.body;
    if (!newOrder.id || !newOrder.productName || !newOrder.quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Routes for Categories

// GET all categories
app.get('/categories', (req, res) => {
    res.json(categories);
});

// POST a new category
app.post('/categories', (req, res) => {
    const newCategory = req.body;
    if (!newCategory.id || !newCategory.name) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

// Start server
app.listen(port, () => {
    console.log(`Microservice running at http://localhost:${port}`);
});
