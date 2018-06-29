var SerialPort = require('serialport');
var Readline = SerialPort.parsers.Readline;

var serialPort = new SerialPort('/dev/ttyUSB0', {
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

var isReadyOpen = false

var parser = new Readline();
serialPort.pipe(parser);
parser.on('data', function (data) {
	if(isReadyOpen){
		var sensor = data.split('#');
		var dataSensor = sensor.slice(5, 10) 
		var nativeJson = '{'
		for(var i = 0 ; i<dataSensor.length ; i++) {
			var piece = dataSensor[i].split(":")
			if(i < dataSensor.length - 1)
				nativeJson += '"'+piece[0]+'":'+'"'+piece[1]+'",'
			else 
				nativeJson += '"'+piece[0]+'":'+'"'+piece[1]+'"}'
		}
		var dataJSON = JSON.parse(nativeJson)
		console.log(dataJSON)
	}

	if(!isReadyOpen){
		isReadyOpen = true
	}
});

serialPort.on('open', function () {
  console.log("sukses")
});
