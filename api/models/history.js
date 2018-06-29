const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sayuran: {type: String, required: true},
    time: Date,
    temperature: {type: Number, required: true },
    humidity: {type: Number, required: true },
    soilmoisture: {type: Number, required: true },
    airpressure: {type: Number, required: true },
    volume: {type: Number, required: true}
});

module.exports = mongoose.model('Historyku', historySchema);