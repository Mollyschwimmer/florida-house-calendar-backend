const express = require('express');
const cors = require('cors');
const app = express();

const allowedIPs = ['38.117.193.186', '184.152.72.177', '184.152.72.177', '192.157.92.88', '184.152.72.177']; // Replace with actual IPs
let blockedDates = []; // This will store the blocked dates

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

// Route to get blocked dates
app.get('/blocked-dates', (req, res) => {
  res.json({ blockedDates });
});

// Route to block or unblock a date
app.post('/block-date', (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  if (blockedDates.includes(date)) {
    // If the date is already blocked, remove it
    blockedDates = blockedDates.filter(d => d !== date);
    console.log(`Date ${date} unblocked`);
    return res.json({ message: 'Date unblocked', blockedDates });
  } else {
    // Otherwise, block the date
    blockedDates.push(date);
    console.log(`Date ${date} blocked`);
    return res.json({ message: 'Date blocked', blockedDates });
  }
});

// Use the PORT environment variable provided by Render
const port = process.env.PORT || 10000; // Use the Render-provided port or fallback to 10000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
