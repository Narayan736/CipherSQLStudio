require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongo, pgClient } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to read JSON data sent from frontend

// Test Route (To check if server is working)
app.get('/', (req, res) => {
    res.send('CipherSQLStudio API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));