var SerialPort = require('serialport');
var Readline = SerialPort.parsers.Readline;
var serialport = SerialPort.serialport;

function readSerialData(data) {
   console.log(data);
}
// var serialPort = new SerialPort('/dev/ttyUSB1', {
//   baudRate: 115200,
//   dataBits: 8,
//   parity: 'none',
//   stopBits: 1,
//   flowControl: false
// });

var serialPort = new SerialPort('/dev/ttyUSB0', {
  baudRate: 115200,
  parsers: SerialPort.parsers.Readline
},false);

var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
serialPort.pipe(parser);

parser.on('data', readSerialData);

serialPort.on('close', function(err){
    console.log('closed');
});

serialPort.on('open', function () {
  console.log("sukses")
});
