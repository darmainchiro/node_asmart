var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('controller');

//     res.io.on('connection', function(socket){
//         console.log('User Connected');

//         socket.on('led1', function(data){
//             console.log('LED : ',data);
//             io.emit('led1',data);
//         });

//         socket.on('led2', function(data){
//             console.log('LED : ',data);
//             io.emit('led2',data);
//         });

//         socket.on('disconnect', function(){
//             console.log('User disconnect');
//         });
//     });
// });

router.get('/', function(req, res, next) {
    res.render('controller', { title: 'Express' });
  });

module.exports = router;
