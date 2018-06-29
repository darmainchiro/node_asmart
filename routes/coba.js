const express = require('express');
const router = express.Router();
const async = require('async');
const Conditionku = require('../api/models/condition');
// const ConditionsController = require('../api/controllers/conditions');

router.get('/', function(req, res){
    Conditionku.find()
    .select('sayuran time _id temperature humidity soilmoisture airpressure batteray')
    .then(docs => {
        res.render('coba',{
            datakondisi: docs
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;