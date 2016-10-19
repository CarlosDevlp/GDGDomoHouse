var express=require("express");
var app=express();
var five= require("johnny-five");
var path= require("path");
var board= new five.Board();
//var fs=require("fs");


app.use(express.static("../../bower_components"));
app.use(express.static("../frontend/public"));

//app.use(express.static(path.join(__dirname + "/../frontend", 'public')));


//middleware
app.set("view engine","jade");
app.set('views', __dirname + "/../frontend");





//apis & routes

//home
app.get("/",function(req,res){
	res.render("index");		
	console.log("Conectándose con DomoHouse Server");

});



//for(var pos=0;pos<relay.length;pos++)
	app.get("/led/:id",function(req,res){

		//console.log("led "+req.param("id")+" "+req.param("state"));
		var str=" led "+req.param("id")+" is "+req.query.state;
		console.log(str);		

		 res.writeHead(200, {"Content-Type": "application/json"});
		 var json = JSON.stringify({ 
		    message:"ok"
		 });
		 res.end(json);
		/*if(boardReady){
			if(toggle)
				led.write(0x01);
			else
				led.write(0x00);
			toggle=!toggle;
		}*/

	});



app.listen(3000);



//Arduino
var boardReady=false;
var toggle;
var relay=[
			{
			pin:5,
			state:false	
			},{
			pin:6,
			state:false
			},{
			pin:7,
			state:false
			},{
			pin:8,
			state:false
	    	}
		 ];


board.on("boardReady",function(){
	boardReady=true;
	console.log("Arduino esta listo");
	led= new five.Pin(7);
	toggle=true;
});
