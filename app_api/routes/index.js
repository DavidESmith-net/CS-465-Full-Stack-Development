const express = require('express');
const router = express.Router();

// Import the API controller we just created
const tripsController = require('../controllers/trips');

// Define the routes for the trips API
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip)
  .delete(tripsController.tripsDeleteTrip);

module.exports = router;