const mongoose = require('mongoose');
const dateFormat = require('dateformat');
const Waterku = require('../models/water');


exports.water_get_all = (req, res, next) => {
    Waterku.find()
    .sort({time: -1})
    .select('time _id volume')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            water: docs.map(doc => {
                return {
                    time: dateFormat(doc.time, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                    volume: doc.volume,
                    _id: doc._id,
                    request: {
                        type:'GET',
                        url: 'https://guna.jagopesan.com/water/'+ doc._id
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

exports.water_create = (req, res, next) => {
    const waterku = new Waterku({
        _id: new mongoose.Types.ObjectId(),
        time: new Date(),
        volume: req.body.volume
    });
    waterku
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'created water successfully',
                createdCondition: {
                    time: result.time,
                    volume: result.volume,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "https://guna.jagopesan.com/water/"+ result._id
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

exports.water_get_item = (req, res, next) => {
    const id = req.params.waterId;
    Waterku.findById(id)
    .select('time _id volume')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json({
                waterku: doc,
                request: {
                    type: 'GET',
                    url: 'https://guna.jagopesan.com/water'
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
