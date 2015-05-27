var io;
var connectSocket;
var thisGameId = 100;

exports.initGame = function(sio, socket){
    io = sio;
    connectSocket = socket;
    connectSocket.emit('connected', { message: "You are connected!" });

    // Host Events
    connectSocket.on('createNewGame', createNewGame);

    // Player Events
    connectSocket.on('JoinGame', JoinGame);
    connectSocket.on('pressButton', pressButton);
};
//player clicked button on the controller
function pressButton(data) {
  io.sockets.in(data.gameId).emit('clicked', data);
}
//The 'START' button was clicked and 'hostCreateNewGame' event was triggered.
function createNewGame() {
    // Create an unique game code

    thisGameId += 47;
    //reset var to limit code length to 4 digits
    if ( thisGameId > 9999) {
      thisGameId = 100;
    }
    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    this.emit('gameCreated', {gameId: thisGameId, mySocketId: this.id});

    // Join the Room and wait for the players
    this.join(thisGameId.toString());
}

//Player clicked start
function JoinGame(data) {

    //Set new data to include player number
    data = {
        gameId : data.gameId
    };
    //Player's Socket.IO socket object
    var sock = this;

    // Look up the game code in the Socket.IO manager object.
    var room = connectSocket.manager.rooms["/" + data.gameId];

    // If the room exists...
    if( room !== undefined ){
        // attach the socket id to the data object.
        data.mySocketId = sock.id;

        // Join the room
        sock.join(data.gameId);

        //Run function 'playerJoinedRoom' on client side
        io.sockets.in(data.gameId).emit('joined', data);

    }
}
