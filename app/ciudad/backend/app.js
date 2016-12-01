var express=require("express");
var app=express();
var server = require('http').Server(app);
var path= require("path");
var io=require("socket.io")(server);


app.use(express.static("../../../bower_components"));
app.use(express.static("../frontend/public"));



//middleware
app.set("view engine","jade");
app.set('views', __dirname + "/../frontend");

//conexion y código de socket
io.on('connection', function (socket) {	
	socket.emit('casas', houses);

	socket.on('agregar_casa', function (data) {
		houses=data;
		//reenviar a todos los sockets
		io.sockets.emit('casas', houses);

		console.log("agregando casa y notificando");
	});

	console.log("conectandose y entregando lista de casas");
});

var houses=[];



//apis & routes

//home
app.get("/ciudad",function(req,res){
	res.render("index");		
	console.log("Conectándose con DomoHouse Server");

});




server.listen(3000);