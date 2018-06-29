volumeCol = new Mongo.Collection('dataVolume');
volCount = new Mongo.Collection('counters');
dataCol = new Mongo.Collection('dataReal');
realCount = new Mongo.Collection('countersReal');
dataStream = new Meteor.Stream('temphum');

//datatables volume
TabularTables = {};
Meteor.isClient && Template.registerHelper("TabularTables", TabularTables);

    TabularTables.DataVolume = new Tabular.Table({
      name: "volumeCol",
      collection: volumeCol,
      columns: [
        {data: "num", title: "No.", width: "10%", align:"right"},
        {data: "tem", title: "Temperature (°C)", width: "20%"},
        {data: "hum", title: "Humidity (%RH)", width: "20%"},
        {data: "vol", title: "Volume (mL)", width: "20%"},
        {data: "date", title: "Date", width: "30%"}
      ]
    });
//end of datatables volume

//datatables tem hum realtime
Meteor.isClient && Template.registerHelper("TabularTables", TabularTables);

    TabularTables.DataVariable = new Tabular.Table({
      name: "dataCol",
      collection: dataCol,
      columns: [
        {data: "num", title: "No.", width: "10%", align:"right"},
        {data: "tem", title: "Temperature (°C)", width: "25%"},
        {data: "hum", title: "Humidity (%RH)", width: "25%"},
        {data: "date", title: "Date", width: "40%"}
      ]
    });
//end of datatables volume



//client
if (Meteor.isClient) {

var datatem;
var datahum;
var datatime;
var datadate;

var volume=0; var calTem=0; var calHum=0; var calDate; var calTime;

//setting alert
Meteor.startup(function () {

    sAlert.config({
        effect: '',
        position: 'bottom',
        timeout: 0,
        html: true,
        onRouteClose: true,
        stack: false,
        offset: 0
    });

});
//akhir setting alert

  dataStream.on('te', function (hasil){
    var tem = hasil[0];
    var hum = hasil[1];
    var date = hasil[2];
    var time = hasil[3];
    var bat = hasil[4];
    var since = hasil[5];
    datatem = tem;
    datahum = hum;
    datatime = time;
    datadate = date;
    $('#datatem').replaceWith('<h3><span id="datatem" class="label label-lg label-danger" value="'+tem+'">'+tem+' °C</span></h3>');
    $('#datahum').replaceWith('<h3><span id="datahum" class="label label-lg label-info" value="'+hum+'">'+hum+' %RH</span><h3>');
    $('#datadatetime').replaceWith('<div id="datadatetime">Retrieved : '+date+' @ '+time+'</div>');
    $('#databat').replaceWith('<div id="databat">'+bat+'%</div>');

    if (hum < 80){
        var humWarning = sAlert.error('<strong>WARNING!!</strong> - Humidity is below 80 %RH, since ' + since+'');
    } else 
        sAlert.closeAll();

    datatem = 34;
    datahum = 67;
    

    //langsung dihitung
        volume = Math.round((calculateFuzzy(datatem, datahum))*50);
            $('#volume').replaceWith('<div id="volume"><h2>Water Volume = <span class="label label-success">'+volume+'mL</span></h2><small> when Temperature : '+datatem+'°C and Humidity: '+datahum+' %RH</small></div>');
            var curr = new Date();
            calDate = (curr.getFullYear())+"/"+("0"+(curr.getMonth()+1)).slice(-2)+"/"+("0"+curr.getDate()).slice(-2);
            calTime = ("0"+curr.getHours()).slice(-2)+":"+("0"+curr.getMinutes()).slice(-2)+":"+("0"+curr.getSeconds()).slice(-2);
            calTem = datatem;
            calHum = datahum; 
  });

//save realtime variable every hour
        function getNextSequence1(name) {
            var ret = realCount.findAndModify(
                {
                    query: { _id: name },
                    update: { $inc: { seq: 1 } },
                    new: true
                 }
            );
            return ret.seq;
        }

        function savehourly() {
            console.log("masuk ngesave");
            var countReal = parseInt(getNextSequence1("userid").toString());
            var saveDT = new Date();
            var saveDate = (saveDT.getFullYear())+"/"+("0"+(saveDT.getMonth()+1)).slice(-2)+"/"+("0"+saveDT.getDate()).slice(-2);
            var saveTime = ("0"+saveDT.getHours()).slice(-2)+":"+("0"+saveDT.getMinutes()).slice(-2)+":"+("0"+saveDT.getSeconds()).slice(-2);
            var datetime = saveDate+" , "+saveTime;
            if(dataCol.insert({
                num : countReal,
                tem : datatem,
                hum : datahum,
                date : datetime
            })){
                console.log('pesan',"hourly record saved");
            }
        }

        setInterval(savehourly, 3600000);         
        // end of save realtime variable every hour

    //chart
   function builtChart() {

        $(document).ready(function() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
 
        var chart;
        $('#adminChartLevel').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {
 
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var series2 = this.series[1];
                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = datatem;
                                z = datahum;
                            series.addPoint([x, y], false, true);
                            series2.addPoint([x, z], true, true);
                        }, 60000);
                    }
                }
            },title: {
                text:''
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: [{
                title: {
                    text: 'Data'
                },
                plotLines: [{

                    value: 0,
                    width: 1,
                    color: '#CC3300'
                }]
            },
            {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#00E6E6'
                }]
            }],
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Temperature (°C)',
                color: '#CC3300',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
 
                    for (i = -9; i <= 0; i++) {
                        data.push({
                            x: time + i * 60000,
                            y: Math.random()  * (32 - 29) + 29
                        });
                    }
                    return data;
                })()
            },
                    {
                name: 'Humidity (%RH)',
                color: '#00E6E6',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
 
                    for (i = -9; i <= 0; i++) {
                        data.push({
                            x: time + i * 60000,
                            y: Math.random() * (95 - 83) + 83
                        });
                    }
                    return data;
                })()
            }]
        });
    });
};


  Template.adminChartLevel.helpers({
   
  });

  Template.adminChartLevel.rendered = function() {    
      this.autorun(function (c) {
          builtChart();
      });
  };

    //end of chart


  //save volume to database
    function getNextSequence(name) {
        var ret = volCount.findAndModify(
            {
                query: { _id: name },
                update: { $inc: { seq: 1 } },
                new: true
             }
        );
        return ret.seq;
    }

    Template.buttonSave.events({
        'click .save': function(){
            var test = parseInt(getNextSequence("userid").toString());
            var datetime = calDate+" , "+calTime;
            if(volumeCol.insert({
                num : test,
                tem : calTem,
                hum : calHum,
                vol : volume,
                date : datetime
            })){
                sAlert.success('Record saved', {position: 'top-right', timeout: '5000', onRouteClose: true, stack: false, offset: '80px'});
            }
        }
    });
    //end of save volume to database


};


if(Meteor.isServer){
    var since;
    var check = 0;
    var tem, hum, bat, date, time;

  var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0",{
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\n')
  });

  serialPort.on('open', function(){
    console.log('Port Open');
  });

  serialPort.on('data', function(data){
    var str = data.split("#");
    console.log('line', data);
    var nilai_te = str[5].split(":");
    var nilai_hu = str[6].split(":");

    var nilai_bat = str[7].split(":");

     tem = parseFloat(nilai_te[1]);
     hum = parseFloat(nilai_hu[1]);
     bat = parseFloat(nilai_bat[1]);

    var curr = new Date();
     date = ("0"+curr.getDate()).slice(-2)+"/"+("0"+(curr.getMonth()+1)).slice(-2)+"/"+curr.getFullYear();
     time = ("0"+curr.getHours()).slice(-2)+":"+("0"+curr.getMinutes()).slice(-2)+":"+("0"+curr.getSeconds()).slice(-2);

    if(!isNaN(tem) && !isNaN(hum) && !isNaN(bat)){

      var hasil=[];
      hasil[0] = {}; hasil[1]={};hasil[2]={};hasil[3]={};hasil[4]={};hasil[5]={};

      if (hum < 80 && check == 0){
        check = 1;
        since = time;
      } else if (hum > 80){
        check = 0;
      }

      hasil[0] = tem;
      hasil[1] = hum;
      hasil[2] = date;
      hasil[3] = time;
      hasil[4] = bat;
      hasil[5] = since;
      console.log('message', hasil);

      dataStream.emit('te', hasil);
    }
  });

    /*var datetime = date+' , '+time;
    setInterval(save, 10000);
    function save(){
        dataCol.insert({
            num : 1,
            tem : tem,
            hum : hum,
            date : datetime});
        console.log(tem+' '+hum+' '+datetime+'----------------------------------');
    }*/

    
        /*//save realtime variable every hour
        function getNextSequence1(name) {
            var ret = realCount.findAndModify(
                {
                    query: { _id: name },
                    update: { $inc: { seq: 1 } },
                    new: true
                 }
            );
            return ret.seq;
        }

        function savehourly() {
            console.log("masuk ngesave");
            var countReal = parseInt(getNextSequence1("userid").toString());
            var datetime = datadate+" , "+datatime;
            if(dataCol.insert({
                num : countReal,
                tem : datatem,
                hum : datahum,
                date : datetime
            })){
                console.log('pesan',"hourly record saved");
            }
        }

        setInterval(savehourly, 600000);         
        // end of save realtime variable every hour*/
};
