require('dotenv').config();
const { Client } = require('pg');

const client = new Client({ connectionString: process.env.PG_URI });

const seedData = async () => {
  try {
    await client.connect();
    
    // Create Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        joined_date DATE,
        total_orders INT
      );
    `);

    // Insert Dummy Data
    await client.query(`
      INSERT INTO customers (name, email, joined_date, total_orders) VALUES
      ('Alice Johnson', 'alice@example.com', '2023-01-15', 5),
      ('Bob Smith', 'bob@example.com', '2023-02-20', 12),
      ('Charlie Brown', 'charlie@test.com', '2023-03-10', 2);
    `);

    console.log("Database Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();