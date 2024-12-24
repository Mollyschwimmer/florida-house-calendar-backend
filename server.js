const express = require('express');
const cors = require('cors');
const app = express();

const allowedIPs = ['38.117.193.186', '184.152.72.177', '184.152.72.177', '192.157.92.88', '184.152.72.177']; // Replace with actual IPs

// In-memory array to store blocked dates
let blockedDates = [];

// Middleware to check IP
app.use((req, res, next) => {
  const clientIP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0].trim();
  console.log('Request received from IP:', clientIP);
  if (!allowedIPs.includes(clientIP)) {
    console.log(`Access denied for IP: ${clientIP}`);
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
});

app.use(cors());
app.use(express.json());

// Root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Route to get the blocked dates
app.get('/blocked-dates', (req, res) => {
  res.json({ blockedDates: blockedDates });  // Return the actual blocked dates
});

// Route to block a date
app.post('/block-date', (req, res) => {
  const { date } = req.body;  // Expecting a 'date' field in the request body

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  // Add the blocked date to the array
  blockedDates.push(date);
  res.json({ message: 'Date blocked', blockedDate: date });
});

// Use the PORT environment variable provided by Render
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
