var express=require("express");
var app= express();
var path= require("path");
var SerialPort = require("serialport");
//configurando que puerto vamos a usar
var port = new SerialPort("COM3", {
  baudRate: 9600
});

//middleware
app.use(express.static("../../bower_components"));
app.use(express.static("../frontend/public"));
app.set("view engine","jade");
app.set('views', __dirname + "/../frontend");

//home
app.get("/spider",function(req,res){
	res.render("index");
});

app.get("/spider/control",function(req,res){
	var str=req.query.command;
	
	setTimeout(function(){
		port.write(str);
		console.log("sending: "+str);
	},500);



	//regresar json de respuesta
	res.writeHead(200, {"Content-Type": "application/json"});
		 var json = JSON.stringify({ 
		    message:"ok"
		 });
	res.end(json);

});

//escuchando y escribiendo en el puerto
port.on('open', function () {
  console.log('-Puerto Abierto-');
});

port.on('data', function(data) {
  console.log(data.toString());
});


app.listen(3000);