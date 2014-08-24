var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname));
app.get('/', function (req, res) {
    res.sendfile('index.html');
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(function () {
    var data = getRandomInt(0, 100);
    io.sockets.emit('cpu', data);
}, 300);

server.listen(3000);