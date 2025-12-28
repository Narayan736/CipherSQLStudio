const express = require('express');
const router = express.Router();
const { pgClient } = require('../config/db');

router.post('/', async (req, res) => {
  const { sql } = req.body;

  // 1. Basic Security Check (Prevent deleting tables)
  const forbiddenKeywords = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER'];
  const containsForbidden = forbiddenKeywords.some(keyword => 
    sql.toUpperCase().includes(keyword)
  );

  if (containsForbidden) {
    return res.status(400).json({ error: "For security, data modification queries are not allowed in this demo." });
  }

  try {
    // 2. Execute the query on PostgreSQL
    const result = await pgClient.query(sql);
    
    // 3. Send results back to Frontend
    res.json({ 
      rows: result.rows,
      rowCount: result.rowCount 
    });

  } catch (error) {
    // 4. Handle SQL Errors (Syntax errors, etc.)
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;