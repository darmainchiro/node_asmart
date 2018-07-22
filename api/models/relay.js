const mongoose = require('mongoose');

const RelaySchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    relay:{
        motorpump: Boolean,
        solenoid: Boolean
    },
    logs:[{
        title:String,
        keterangan: String,
        tanggal: {type: Date, default: Date.now}
    }]
});

module.exports = mongoose.model('relayku', RelaySchema);