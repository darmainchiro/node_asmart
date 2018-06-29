const express = require('express');
const router = express.Router();
const dateFormat = require('dateformat');
const kondisi = require('../api/models/kondisi');

router.post('/create', function(req, res, next){
    var kondisiku = new kondisi({
        // _id: new mongoose.Types.ObjectId(),
        time: req.body.time,
        sayuran: req.body.sayuran,
        TCB: req.body.TCB,
        HUMB: req.body.HUMB,
        soilmoisture: req.body.soilmoisture,
        PA: req.body.PA,
        BAT: req.body.BAT,
    });
    kondisiku.save(function(err, data){
        if(err){return console.log(err);}
        res.send("sukses yo");
    });
});

router.get('/',function(req,res,next){
    kondisi.find({}, function(err, data){
        res.render('tampil',{datasensor: data});
    });
});

router.get('/hapus', function(req, res, next){
    kondisi.remove({}, function(err, data){
        res.render('tampil',{datasensor: data});
    });
});

module.exports = router;