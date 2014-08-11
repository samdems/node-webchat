var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs'); 
var sqlite3 = require('sqlite3').verbose();
var loginMsg = 'this website uses cookies <br><iframe width="560" height="315" src="//www.youtube-nocookie.com/embed/FxAEXO1lxpA" frameborder="0" allowfullscreen></iframe>'

///////////////////////////////////
//int database 
///////////////////////////////////
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE Users (name  PRIMARY KEY, password)");
  });


///////////////////////////////////
//int webserver 
///////////////////////////////////
app.get('/assets/*', function(req, res){
	url = req.url.split("?")
	console.log(url);
 	 res.sendfile(__dirname + url[0]);
});

app.get('/', function(req, res){
	res.sendfile('/assets/html/index.html');
});

///////////////////////////////////
//int websocket
///////////////////////////////////
io.on('connection', function(socket){
	io.emit('chat message',','+loginMsg+',');
  	socket.on('chat message', function(msg){
	    msg1 = msg.split(",");
	    msg1 = msg1[1].split(" ");
	    console.log(msg1[2]);
	  	if (msg1[2] == "//login" ){
	  	}
	  	else
	  	{
	    	io.emit('chat message', msg);
		};
  });
});

///////////////////////////////////
//start http server
///////////////////////////////////

http.listen(3000, function(){
  console.log('listening on *:3000');
});



