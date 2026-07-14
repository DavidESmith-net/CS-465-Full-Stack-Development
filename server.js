const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// View engine setup for Handlebars
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Tell Express to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public'))); 

// Register the new traveler route
const travelRouter = require('./app_server/routes/travel');
app.use('/travel', travelRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});