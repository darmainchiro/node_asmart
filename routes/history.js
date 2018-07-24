const express = require('express');
const router = express.Router();
const async = require('async');
const Conditionku = require('../api/models/condition');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('history', { title: 'Express' });
// });
router.get('/', function(req, res){
  Conditionku.find()
  .sort({time: -1})
  .select('sayuran time _id temperature humidity soilmoisture airpressure volume batteray')
  .then(docs => {
      res.render('history',{
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
