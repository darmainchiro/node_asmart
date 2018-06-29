const express = require('express');
const router = express.Router();
const async = require('async');
const Conditionku = require('../api/models/condition');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res){
  Conditionku.find()
    .sort({time: -1})
    .limit(1)
    .select('sayuran time _id temperature humidity soilmoisture airpressure batteray')
    .exec()
    .then(docs => {
        res.render('index',{
          temp_sekarang : docs[0].temperature,
          humb_sekarang : docs[0].humidity,
          soil_sekarang : docs[0].soilmoisture,
          air_sekarang  : docs[0].airpressure
      });
      console.log(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;
