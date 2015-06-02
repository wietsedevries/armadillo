// Import the Express module
var express = require('express');

// Import the 'path' module (packaged with Node.js)
var path = require('path');

// Create a new instance of Express
var app = express();

// Import the dillo module
var armadillo = require('dillo');

// Turn down the logging activity
app.use(express.logger('dev'));

// Serve static html, js, css, and image files from the 'public' and 'Views' directories
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));

// Create server on port 3000
var server = require('http').createServer(app).listen(3000);

// Create a Socket.IO server and attach it to the http server
var io = require('socket.io').listen(server);

// Reduce the logging output of Socket.IO
io.set('log level',1);

// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
    armadillo.initGame(io, socket);
});
