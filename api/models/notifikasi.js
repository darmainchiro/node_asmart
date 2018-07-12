const mongoose = require('mongoose');

const notifikasiSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: {type: String}
});

module.exports = mongoose.model('notifikasiku', notifikasiSchema);