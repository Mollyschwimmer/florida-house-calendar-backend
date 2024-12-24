const express = require('express');
const cors = require('cors');
const app = express();

const allowedIPs = ['38.117.193.186', '184.152.72.177', '184.152.72.177', '192.157.92.88', '184.152.72.177']; // Replace with actual IPs

// Middleware to check IP
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Request received from IP:', clientIP);
  if (!allowedIPs.includes(clientIP)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
});

app.use(cors());
app.use(express.json());

// Define your routes
app.get('/blocked-dates', (req, res) => {
  // Your logic to return blocked dates
  res.json({ blockedDates: [] });  // Example response
});

app.post('/block-date', (req, res) => {
  // Your logic to block a date
  res.json({ message: 'Date blocked' });  // Example response
});

// Use the PORT environment variable provided by Render
const port = process.env.PORT || 10000;  // Use the Render-provided port or fallback to 10000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
