const mongoose = require('mongoose');
const dateFormat = require('dateformat');
const Conditionku = require('../models/condition');


exports.conditions_get_all = (req, res, next) => {
    Conditionku.find()
    .sort({time: -1})
    .select('sayuran time _id temperature humidity soilmoisture airpressure batteray')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            conditions: docs.map(doc => {
                return {
                    time: dateFormat(doc.time, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                    sayuran: doc.sayuran,
                    temperature: doc.temperature,
                    humidity: doc.humidity,
                    soilmoisture: doc.soilmoisture,
                    airpressure: doc.airpressure,
                    batteray: doc.batteray,
                    _id: doc._id,
                    request: {
                        type:'GET',
                        url: 'http://localhost:3000/conditions/'+ doc._id
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

exports.conditions_current = (req, res, next) => {
    Conditionku.find()
    .sort({time: -1})
    .limit(1)
    .select('sayuran time _id temperature humidity soilmoisture airpressure batteray')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            conditions: docs.map(doc => {
                return {
                    time: dateFormat(doc.time, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                    sayuran: doc.sayuran,
                    temperature: doc.temperature,
                    humidity: doc.humidity,
                    soilmoisture: doc.soilmoisture,
                    airpressure: doc.airpressure,
                    batteray: doc.batteray,
                    _id: doc._id,
                    request: {
                        type:'GET',
                        url: 'http://localhost:3000/conditions/'+ doc._id
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

exports.conditions_create = (req, res, next) => {
    const conditionku = new Conditionku({
        _id: new mongoose.Types.ObjectId(),
        sayuran: req.body.sayuran,
        time: new Date(),
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        soilmoisture: req.body.soilmoisture,
        airpressure: req.body.airpressure,
        batteray: req.body.batteray
    });
    conditionku
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
                    batteray: result.batteray,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/conditions/"+ result._id
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

exports.conditions_get_item = (req, res, next) => {
    const id = req.params.conditionId;
    Conditionku.findById(id)
    .select('sayuran time _id temperature humidity soilmoisture airpressure batteray')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json({
                conditionku: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/conditions'
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

exports.conditions_update_item = (req, res, next) => {
    const id = req.params.conditionId;
    const updateOps ={};
    for(const ops of req.body){
        updateOps[ops.propSayuran] = ops.value;
    }
    Conditionku.update({_id: id}, { $set: {updateOps}})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Condition updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/conditions/'+id
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

exports.conditions_delete_item = (req, res, next) => {
    const id = req.params.conditionId;
    Conditionku.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Conditions deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/conditions',
                body: {
                    sayuran: 'String', 
                    time: 'Date', 
                    temperature: 'Number',
                    humidity: 'Number',
                    soilmoisture: 'Number',
                    airpressure: 'Number',
                    batteray: 'Number'
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