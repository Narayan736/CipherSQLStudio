const mongoose = require('mongoose');
const { Client } = require('pg');

// 1. Connect to MongoDB (For storing assignments)
const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // We don't exit process here so the server keeps running even if DB fails initially
    }
};

// 2. Connect to PostgreSQL (For executing SQL queries)
const pgClient = new Client({
    connectionString: process.env.PG_URI,
});

pgClient.connect()
    .then(() => console.log('PostgreSQL Connected Successfully'))
    .catch(err => console.error('PostgreSQL Connection Error:', err.message));

module.exports = { connectMongo, pgClient };