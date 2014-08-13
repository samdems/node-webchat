var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");
var file = "database.db";
var exists = fs.existsSync(file);
var loginMsg = 'welcome'

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

///////////////////////////////////
//int database 
///////////////////////////////////

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Users (username TEXT,password TEXT)");
  }
});

///////////////////////////////////
//int webserver 
///////////////////////////////////
app.get('/assets/*', function(req, res){
	url = req.url.split("?")
 	 res.sendfile(__dirname + url[0]);
});

app.get('/', function(req, res){
	res.sendfile(__dirname + '/assets/html/index.html');
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
	    io.emit('chat message', msg);
  	});

  	socket.on('login', function(msg){
		msg1 = msg.split("|");
		username = msg1[0]
		password = msg1[1]
		db.serialize(function() {
		  db.each("SELECT rowid AS id,username, password FROM Users", function(err, row) {
		    if (username == row.username || password == row.password){
		    	console.log('user confermed');
		    }
		  });
		});
	});
});

///////////////////////////////////
//start http server
///////////////////////////////////


http.listen(3000, function(){
  console.log('listening on *:3000');
});


