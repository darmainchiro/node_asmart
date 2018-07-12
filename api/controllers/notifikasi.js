const mongoose = require('mongoose');
const dateFormat = require('dateformat');
const Notifikasiku = require('../models/notifikasi');


exports.notifikasi_get_all = (req, res, next) => {
    Notifikasiku.find()
    .sort({time: -1})
    .select('_id token')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            notifikasi: docs.map(doc => {
                return {
                    token: doc.token,
                    _id: doc._id,
                    request: {
                        type:'GET',
                        url: 'http://guna.jagopesan.com/notifikasi/token/'+ doc._id
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

exports.notifikasi_create = (req, res, next) => {
    const notifikasiku = new Notifikasiku({
        _id: new mongoose.Types.ObjectId(),
        token: req.body.token
    });
    notifikasiku
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'created water successfully',
                createdToken: {
                    token: result.token,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://guna.jagopesan.com/notifikasi/token/"+ result._id
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

exports.notifikasi_get_item = (req, res, next) => {
    const id = req.params.waterId;
    Notifikasiku.findById(id)
    .select('_id token')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json({
                notifikasiku: doc,
                request: {
                    type: 'GET',
                    url: 'http://guna.jagopesan.com/notifikasi/token/'
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
