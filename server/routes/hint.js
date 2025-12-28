const express = require('express');
const router = express.Router();

// Simple Hint Route (No OpenAI Key Required)
router.post('/', async (req, res) => {
  // We simulate a delay to make it feel like AI is thinking
  setTimeout(() => {
    res.json({ 
      hint: "💡 Demo Hint: Try using the WHERE clause to filter the results. Check if you are selecting the correct columns." 
    });
  }, 1000); 
});

module.exports = router;