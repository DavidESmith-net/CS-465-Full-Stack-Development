const express = require('express');
const router = express.Router();

// Import the API controller we just created
const tripsController = require('../controllers/trips');

// Define the routes for the trips API
router
    .route('/trips')
    .get(tripsController.tripsList);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;