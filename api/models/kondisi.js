const mongoose = require('mongoose');

const kondisiSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    sayuran: {type: String},
    time: {type: Date, default: Date.now},
    TCB: {type: String, required: true },
    HUMB: {type: String, required: true },
    soilmoisture: {type: String },
    PA: {type: String, required: true },
    BAT: {type: String, required: true }
});

module.exports = mongoose.model('kondisiku', kondisiSchema);