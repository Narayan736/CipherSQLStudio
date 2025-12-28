require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongo, pgClient } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connections
connectMongo();

// --- ROUTES ---
app.use('/api/execute', require('./routes/execute'));
app.use('/api/hint', require('./routes/hint')); // <--- MAKE SURE THIS LINE IS HERE

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));