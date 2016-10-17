var express=require("express");
var app=express();
var five= require("johnny-five");
var board= new five.Board();


app.set("view engine","jade");
app.set('views', __dirname + "\\..\\frontend");


var ready=false;
//home
app.get("/",function(req,res){

	res.render("index");
	console.log("Conectándose con DomoHouse Server");

});



var led,toggle;
app.post("/led1",function(req,res){

	console.log("prendiendo el led1");

	if(ready){
		if(toggle)
			led.write(0x01);
		else
			led.write(0x00);
		toggle=!toggle;
	}

});


board.on("ready",function(){
	ready=true;
	console.log("Arduino esta listo");
	led= new five.Pin(7);
	toggle=true;
});

app.listen(3000);