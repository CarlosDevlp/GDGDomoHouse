var express=require("express");
var app=express();
var five= require("johnny-five");
var path= require("path");
var board= new five.Board();

app.use(express.static("../../bower_components"));
app.use(express.static("../frontend/public"));



//middleware
app.set("view engine","jade");
app.set('views', __dirname + "/../frontend");





//apis & routes

//home
app.get("/",function(req,res){
	res.render("index");		
	console.log("Conectándose con DomoHouse Server");

});




	app.get("/led/:id",function(req,res){

		//console.log("led "+req.param("id")+" "+req.param("state"));
		var str=" led "+req.params.id+" is "+req.query.command;
		console.log(str);		

		 res.writeHead(200, {"Content-Type": "application/json"});
		 var json = JSON.stringify({ 
		    message:"ok"
		 });
		 res.end(json);


		 //mandar al arduino
		if(boardReady){

			try{
				var pos=Number(req.params.id);
				//mandar apagado o encendido
				if(req.query.command=="on")
					relay[pos].led.low();
					//relay[pos].led.write(0x00);
				else
					relay[pos].led.high();
					//relay[pos].led.write(0x01);				


				console.log("sending to arduino");
			}catch(err){
				console.log(err);
			}			
		}

		

	});







//Arduino
var boardReady=false;
var relay=[
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
		
	//inicializar los pines del relay/led
	for(var pos=0;pos<relay.length;pos++)	
		relay[pos].led = new five.Pin(relay[pos].pin);
	
});




app.listen(3000);