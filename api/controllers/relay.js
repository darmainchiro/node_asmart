const mongoose = require('mongoose');
const Relayku = require('../models/relay');

exports.relay_get_all = (req, res, next) => {
    // Relayku.find({},)
    // .select('motorpump solenoid')
    // .exec()
    // .then(function(data){
    //     res.status(200).json({
    //         data: data
    //     });
        
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //         error: err
    //     });
    // });
    Relayku.findById("5b1254d3fe6d4822af5671bb", function(err, data){
        res.json(data);
    });
}

exports.relay_create = (req, res, next) => {
    const relay = new Relayku({
        motorpump:req.body.motorpump,
        solenoid:req.body.solenoid,
    });
    relay
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'created relay successfully',
                data: {
                    motorpump: result.motorpump,
                    solenoid: result.solenoid,
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

// exports.products_update_product = (req, res, next) => {
//     const id = req.params.productId;
//     const updateOps ={};
//     for(const ops of req.body){
//         updateOps[ops.propName] = ops.value;
//     }
//     Product.update({_id: id}, { $set: updateOps})
//     .exec()
//     .then(result => {
//         res.status(200).json({
//             message: 'Product updated',
//             request: {
//                 type: 'GET',
//                 url: 'http://localhost:3000/products/'+id
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