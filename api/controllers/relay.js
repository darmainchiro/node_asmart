const mongoose = require('mongoose');
const Relayku = require('../models/relay');

exports.relay_get_all = (req, res) => {
    Relayku.findById("5b1254d3fe6d4822af5671bb", function(err, data){
        if(err){
            return console.log(err);
        }
        res.json(data.relay);
        console.log(data.relay);
    });
}

// exports.relay_create = (req, res, next) => {
//     const relay = new Relayku({
//         motorpump:req.body.motorpump,
//         solenoid:req.body.solenoid,
//     });
//     relay
//         .save()
//         .then(result => {
//             console.log(result);
//             res.status(201).json({
//                 message: 'created relay successfully',
//                 data: {
//                     motorpump: result.motorpump,
//                     solenoid: result.solenoid,
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// }

exports.relay_Motor_update = (req, res) => {
    var id_user = "5b1254d3fe6d4822af5671bb";
    var updateState = {
        "relay.motor": req.body.state
    }
    Relayku.findByIdAndUpdate(id_user, updateState, function(err, data){
        if(err){
            return console.log(err);
        }
        Relayku.findById(id_user, (err, result) => {
            res.json(result.relay);
        });
    });
};

exports.relay_Solenoid_update = (req, res) => {
    var id_user = "5b1254d3fe6d4822af5671bb";
    var updateState = {
        "relay.solenoid": req.body.state
    }
    Relayku.findByIdAndUpdate(id_user, updateState, function(err, data){
        if(err){
            return console.log(err);
        }
        Relayku.findById(id_user, (err, result) => {
            res.json(result.relay);
        });
    });
};
// exports.products_delete_product = (req, res, next) => {
//     const id = req.params.productId;
//     Product.remove({_id: id})
//     .exec()
//     .then(result => {
//         res.status(200).json({
//             message: 'Product deleted',
//             request: {
//                 type: 'POST',
//                 url: 'http://localhost:3000/products',
//                 body: { name: 'String', price: 'Number'}
//             }
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     });
// }