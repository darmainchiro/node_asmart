const mongoose = require('mongoose');

const waterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    time: {type: Date, default: Date.now},
    volume: {type: Number, required: true}
});

module.exports = mongoose.model('Waterku', waterSchema);