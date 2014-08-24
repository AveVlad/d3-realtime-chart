$(function() {
    console.log( "ready!" );
    var socket = io('http://localhost:3000');
    socket.on('cpu', function (msg) {
        console.log(msg);
    });
});