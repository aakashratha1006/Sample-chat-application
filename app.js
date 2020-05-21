var express = require('express');
var socket  = require('socket.io');

var app = express();

var server = app.listen(3000, function(){
    console.log("Server is listening at port 3000");
});

// APP CONFIG...
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
});

var io = socket(server);

io.on('connection', function(socket){
    socket.on("chat", function(data){
        io.sockets.emit("chat", data);
    });
    socket.on("typing", function(data){
        socket.broadcast.emit("typing", data);
    });
});

