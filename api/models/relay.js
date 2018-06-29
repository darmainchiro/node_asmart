const mongoose = require('mongoose');

const RelaySchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    motorpump: {type: Boolean},
    solenoid: Boolean,
});

module.exports = mongoose.model('relayku', RelaySchema);