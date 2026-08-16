const express = require('express');
const path = require('path');
require('dotenv').config();
require('./app_api/models/db');
const passport = require('passport');
require('./app_api/config/passport');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = 3000;

// View engine setup for Handlebars
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Tell Express to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(passport.initialize());

// Register the new traveler route
const travelRouter = require('./app_server/routes/travel');
app.use('/travel', travelRouter);

// Enable CORS for the Angular App
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Register the API route
const apiRouter = require('./app_api/routes/index');
app.use('/api', apiRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    res.status(401).json({"message": err.name + ": " + err.message});
  }
});