const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Allowed IP addresses
const allowedIPs = ['38.117.193.186']; // Replace with your allowed IPs

// In-memory storage for blocked dates
let blockedDates = [];

// Middleware to check IP address
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (!allowedIPs.includes(clientIP)) {
    return res.status(403).send('Access denied');
  }
  next();
});

// Endpoint to block a date
app.post('/block-date', (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).send('Date is required');
  
  if (!blockedDates.includes(date)) {
    blockedDates.push(date);
  }
  res.send({ message: 'Date blocked successfully', blockedDates });
});

// Endpoint to get blocked dates
app.get('/blocked-dates', (req, res) => {
  res.send(blockedDates);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
