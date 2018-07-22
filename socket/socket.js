module.exports = function(io){
    var userSocket = 0;

    io.on('connection', function(socket){
        userSocket++;
        console.log("user: ", userSocket);
        socket.on('relay1', (data)=>{
            console.log('relay1: ',data.msg);
            io.emit('relay1',{msg: data.msg});
        });
        
        socket.on('statuswater', (data)=>{
            console.log('relay2: ',data.msg);
            io.emit('statuswater',{msg: data.msg});
        });

        socket.on('readsensor', function(data){
			console.log('Waspmote agriculture sensor: ', data.msg);
			io.emit('readsensor', {status: data.msg});
		});

        socket.on('disconnect',function(){
            userSocket--;
            console.log("disconnect");
            console.log("user: ", userSocket);
        });
    });
}