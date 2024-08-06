const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize the app
const app = express();
const port = 3100;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoDBconnection = async () => {
  const mongodbUrl = "mongodb+srv://deepanshimann96:ZeeK7uC8a317T6kz@cluster0.rgzxrs7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};
mongoDBconnection();

// // Example login route
// app.post('/auth/login', (req, res) => {
//   const { email, password } = req.body;
//   res.json({ success: true, token: 'example-jwt-token' });
// });

// // Example signup route
// app.post('/auth/signup', (req, res) => {
//   const { firstName, lastName, email, password, phoneNumber, role } = req.body;
//   res.json({ success: true, message: 'Registration successful' });
// });

// Test connection route
app.get('/test', (req, res) => {
  res.json({ success: true, message: 'Connection is successful!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
