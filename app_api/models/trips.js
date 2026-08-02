const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});

mongoose.model('trips', tripSchema);