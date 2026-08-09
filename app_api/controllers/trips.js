const mongoose = require('mongoose');
const Trip = mongoose.model('trips');


// GET: /api/trips - Lists all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        
        if (!trips || trips.length === 0) {
            return res.status(404).json({ "message": "No trips found" });
        }
        
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json(err);
  }
};

// GET: /api/trips/:tripCode - Gets a single trip by code
const tripsFindByCode = async (req, res) => {
    try {
        // We use find() instead of findById() because we are searching by the custom 'code' field
        const trip = await Trip.find({ 'code': req.params.tripCode }).exec();
        
        if (!trip || trip.length === 0) {
            return res.status(404).json({ "message": "Trip not found" });
        }
        
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// PUT: /api/trips/:tripCode - Updates a trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    );
    
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE: /api/trips/:tripCode - Deletes a trip
const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};