var express = require('express');
var path = require('path');
var app = express();
var dillo = require('dillo');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);
io.set('log level',1);
io.sockets.on('connection', function (socket) {
    dillo.initGame(io, socket);
});
