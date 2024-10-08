const express = require('express');
const app = express();
const port = 3000;

let lift1Floor = 0; // Variable to store the current floor of Lift 1

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Route to receive data from ESP32
app.get('/update-lift', (req, res) => {
  const lift = req.query.lift;  // Get lift identifier (e.g., lift1)
  const floor = req.query.floor;  // Get floor data from query parameter
  
  if (lift === 'lift1') {
    lift1Floor = floor;  // Update Lift 1's floor
    console.log(`Lift 1 is at floor: ${lift1Floor}`);
  }
  
  res.send(`Received floor data for ${lift}: ${floor}`);
});

// Route to get the current lift data (for the dashboard)
app.get('/get-lift-data', (req, res) => {
  res.json({ lift1Floor });  // Send the lift data in JSON format
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
