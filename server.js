var request = require('request');
var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);

// listen on 8080
server.listen(8080);

// servers static files in public folder
app.use(express.static('public'));

var url = "http://janus.evl.uic.edu:8181/onos/v1/flows";
var name = "onos";
var pwd = "rocks"; 

// socket io
io.on('connection', function (socket) {

  console.log('Server> new connection');

  socket.on('getFlows', function (data) {



    var myflows = {};

  	request({url: url, auth:{user: name, pass: pwd}}, function(error, response, body){
  		
  		if (error) { 
  			console.log("Error: ", error);
  		}
  		else
  		{
     		var info = JSON.parse(body);
     		socket.emit("listFlows", info);	
  		}

  	});

  });

});

