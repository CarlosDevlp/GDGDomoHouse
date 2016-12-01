var express=require("express");
var app=express();
var server = require('http').Server(app);
var five= require("johnny-five");
var path= require("path");
var board= new five.Board();
var io=require("socket.io")(server);


app.use(express.static("../../../bower_components"));
app.use(express.static("../frontend/public"));



//middleware
app.set("view engine","jade");
app.set('views', __dirname + "/../frontend");


//conexion y código de socket
io.on('connection', function (socket) {	
	console.log("nueva conexion en socket");
	socket.emit('leds', { "devices": devices.map(function(a){return a.state;})});
	socket.on('led', function (data) {
		var pos=data.index;
		var state=data.state;
		devices[pos].state=data.state;
		
		if(devices[pos].state)				
			devices[pos].led.high();
		else 	
			devices[pos].led.low();
		//reenviar a todos los sockets
		io.sockets.emit('led', data);

		console.log("sending to arduino");

	});
});



//apis & routes

//home
app.get("/casa",function(req,res){
	res.render("index");
	res.end("end");		
	console.log("Conectándose con DomoHouse Server");

});



//Arduino
var boardReady=false;
var devices=[
			{
			led:null,
			pin:2,
			state:false			
			},{
			led:null,
			pin:3,
			state:false
			},{
			led:null,				
			pin:4,
			state:false
			},{
			led:null,
			pin:5,
			state:false
			}
		 ];


board.on("ready",function(){
	boardReady=true;
	console.log("Arduino esta listo");
		
	//inicializar los pines del devices/led
	for(var pos=0;pos<devices.length;pos++)	
		devices[pos].led = new five.Pin(devices[pos].pin);
	
});




server.listen(3300);