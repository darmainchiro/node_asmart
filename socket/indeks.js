var tokenAji = "AAAAXvg2x2Q:APA91bHj5_XZG-c9dhoru-ULrk6jO2Y4aTR1wrmIK5jBbUZ47FzuF5Xfks7fc_FPPmk8VwGyTnLKh5j7TK9MSbnJLnmuZ9a0wLY9W7gerc0GkXPnWF8MANy1h78ZLwC2X3Hc1jBYO-Sv";

var FCM = require('./sendMessage').sendMessageToDevice;

function sendMessageToDevice(idDevice, title, message) {
    request({
     url: 'https://fcm.googleapis.com/fcm/send',
     method: 'POST',
     headers: {
      'Content-Type': ' application/json',
      'Authorization': 'key=AIzaSyDxycxMIR_rp7GBiV9L0IpGwD2lkNIjCEE'
     },
     body: JSON.stringify({
       notification: {
       title: title,
       body: message               
      },
       'to': idDevice  
      })
     }, function(error, response, body) {
      if (error)
       console.log(error);
      else if (response.statusCode >= 400)
       console.log("HTTP Error" + response.statusCode + "-" + response.statusCode + "\n" + body);
      else
       console.log(body);
    });
}

LED18.watch(function(err, value){
    console.log(value);
    var optionPut = {
     url: "https://trackcar.herokuapp.com/api/mobil/log/"+IDMOBIL,
     method: "PUT",
     form: {
      jenis: "engine",
      keterangan: "Engine Triggered, please check your car now!."
     }
    };
    request.put(optionPut, function(err, resp, body){
     if(err) return console.log(err);
     console.log(body);
    });
    FCM(tokenAji, "Warning Notification", "Engine on triggered, please check your car.");
});
   