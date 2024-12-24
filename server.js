const express = require('express');
const app = express();
const PORT = process.env.PORT || 1000;
app.use(express.json());

// Define allowed IP addresses (hardcoded)
const allowedIPs = ['38.117.193.186', '184.152.72.177', '184.152.72.177', '192.157.92.88', '184.152.72.177']; // Replace with actual IPs

// Middleware to check IP address before blocking dates
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Check if the IP is allowed
  if (!allowedIPs.includes(clientIP)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  next();
});

// A temporary in-memory array to store blocked dates (you can replace this with a database later)
let blockedDates = [];

// POST route to block a date (only allowed IPs can do this)
app.post('/block-date', (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  if (!blockedDates.includes(date)) {
    blockedDates.push(date);
  }

  res.json({ message: 'Date blocked successfully', blockedDates });
});

// GET route to fetch blocked dates
app.get('/blocked-dates', (req, res) => {
  res.json(blockedDates);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
