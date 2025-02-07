const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Set up MySQL connection
const db = mysql.createConnection({
    host: '192.168.1.160',
    user: 'virtual',  
    password: 'Admin@1234', 
    database: 'ecommerce'  
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the database.');
});

// Routes for Orders

// GET all orders
app.get('/orders', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching orders' });
        }
        res.json(results);
    });
});

// POST a new order
app.post('/orders', (req, res) => {
    const { id, productName, quantity } = req.body;
    if (!id || !productName || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    db.query('INSERT INTO orders (id, productName, quantity) VALUES (?, ?, ?)', [id, productName, quantity], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting order' });
        }
        res.status(201).json({
            id,
            productName,
            quantity
        });
    });
});

// Routes for Categories

// GET all categories
app.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching categories' });
        }
        res.json(results);
    });
});

// POST a new category
app.post('/categories', (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    db.query('INSERT INTO categories (id, name) VALUES (?, ?)', [id, name], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting category' });
        }
        res.status(201).json({
            id,
            name
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Microservice running at http://localhost:${port}`);
});
