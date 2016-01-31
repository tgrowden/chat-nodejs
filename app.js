var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Port = 3000; //set Port here


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Chat-Nodejs'
  });
});

io.on('connection', function(socket){
  io.emit('updateReq');
  io.emit('alert', "A new user has connected");
  socket.on('msg', function(msg){
    io.emit('msg', msg);
  });
  socket.on('namechange', function(olduser, user){
    io.emit('alert', "user \'" + olduser + "\' is now known as \'" + user +"\'");
    io.emit('updateReq');
  });
  socket.on('userUpdate', function(user){
    io.emit('addUser', user);
  });

});
io.on('disconnect', function(socket){
  io.emit('updateReq');
  io.emit('alert', "A user has disconnected");
});

http.listen(Port, function(){
  console.log('listening on *:' + Port);
});
