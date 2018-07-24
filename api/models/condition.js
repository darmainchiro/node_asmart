const mongoose = require('mongoose');

const conditionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sayuran: {type: String, required: true},
    time: {type: Date, default: Date.now},
    temperature: {type: Number, required: true },
    humidity: {type: Number, required: true },
    soilmoisture: {type: Number, required: true },
    airpressure: {type: Number, required: true },
    volume: Number,
    batteray: {type: Number, required: true }
});

module.exports = mongoose.model('Conditionku', conditionSchema);