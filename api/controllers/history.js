const mongoose = require('mongoose');
const dateFormat = require('dateformat');
const Historyku = require('../models/history');


exports.history_get_all = (req, res, next) => {
    Historyku.find()
    .sort({time: -1})
    .select('sayuran time _id temperature humidity soilmoisture airpressure volume')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            history: docs.map(doc => {
                return {
                    time: dateFormat(doc.time, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                    sayuran: doc.sayuran,
                    temperature: doc.temperature,
                    humidity: doc.humidity,
                    soilmoisture: doc.soilmoisture,
                    airpressure: doc.airpressure,
                    volume: doc.volume,
                    _id: doc._id,
                    request: {
                        type:'GET',
                        url: 'http://localhost:3000/historyku/'+ doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.history_create = (req, res, next) => {
    const historyku = new Historyku({
        _id: new mongoose.Types.ObjectId(),
        sayuran: req.body.sayuran,
        time: new Date(),
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        soilmoisture: req.body.soilmoisture,
        airpressure: req.body.airpressure,
        volume: req.body.volume
    });
    historyku
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'created conditions successfully',
                createdCondition: {
                    sayuran: result.sayuran,
                    time: result.time,
                    temperature: result.temperature,
                    humidity: result.humidity,
                    soilmoisture: result.soilmoisture,
                    airpressure: result.airpressure,
                    volume: result.volume,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/historyku/"+ result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.history_get_item = (req, res, next) => {
    const id = req.params.historyId;
    Historyku.findById(id)
    .select('sayuran time _id temperature humidity soilmoisture airpressure volume')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json({
                historyku: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/historyku'
                }
            });
        }else{
            res.status(404).json({message: "No Valid provided ID"});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}
