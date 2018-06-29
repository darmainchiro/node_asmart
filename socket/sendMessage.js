var request = require('request');
var sendMessageToDevice = function(deviceId, title, message) {
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
            "to": deviceId
        })
    }, function(error, response, body) {
        if (error)
            console.log(error);
        else if (response.statusCode >= 400)
            console.log("HTTP Error" + response.statusCode + "-" + 
                        response.statusCode + "\n" + body);
        else
            console.log(body);
        });
    };

module.exports.sendMessageToDevice = sendMessageToDevice;