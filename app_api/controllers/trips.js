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

module.exports = {
    tripsList,
    tripsFindByCode
};