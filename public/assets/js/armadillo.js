// Detect device to prepare the correct landing page
window.onload = function(){
  detectDevice();
};
function detectDevice() {
  if(  /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent) ){
    $('#player').show();
  }else{
    $('#host').show();
  }
}
var App;
var buttTime = 0;

jQuery(function($){
   'use strict';

   var IO = {

        // Connect client to server
        init: function() {
            IO.socket = io.connect();
            IO.bindEvents();
        },

        // Listen to events coming from the server
        bindEvents : function() {
            IO.socket.on('connected', IO.Connected );
            IO.socket.on('gameCreated', IO.gameCreated );
            IO.socket.on('joined', IO.joined );
            IO.socket.on('clicked', IO.clicked );
        },

        // Clientside is connected
        Connected : function() {
            // set session id
            App.mySocketId = IO.socket.socket.sessionid;
        },

        // A new game has been created and a random game ID has been generated.
        gameCreated : function(data) {
            App.Host.startGame(data);
        },

        // A player has successfully joined the game.
        joined : function(data) {
            // Update screens for both player and host
            App[App.role].changeLayout(data);
        },

        // Click on button
        clicked: function (data) {
          App.Host.clickButton(data);
        }
    };

    App = {

        // gameId number
        gameId: 0,

        // This is used to differentiate between 'Host' and 'Player' browsers.
        role: '',

        // Socket ID
        mySocketId: '',

        // This runs when the page initially loads.
        init: function () {
            App.bindEvents();

            // Initialize the fastclick library
            FastClick.attach(document.body);
        },
        // End game
        endGame: function (score) {
          $('#game').hide();
          $('#getCode').hide();
          $('#menu').hide();
          $('#host').show();
          $('#score').show();
          $('#newScore').html(score+" Points");

        },
        // Restart game
        restart: function () {
          restartGame();
          $('#host').hide();
          $('#game').show();

        },
				// Button functions
				controller: function (x,y) {
					App.$doc.on('touchstart', x, function(){App.Player.button(y); });
					App.$doc.on('touchend', x, function(){ App.Player.button(y); });
				},

        // Create some event handlers
        bindEvents: function () {
            App.$doc = $(document);
            // Desktop
            App.$doc.on('click', '#play', App.Host.createGame);
            App.$doc.on('click', '#playAgain', App.restart);

            // Player
            App.$doc.on('click', '#join',App.Player.onJoin);

						// Phonetroller (3 buttons, add more by adding more 'controller' functions)
						App.controller('#button1',1);
						App.controller('#button2',2);
            // App.controller('#button3',3);

        },

        Host : {

            //Handler for the "Start" button on the introScreen.
            createGame: function () {
                IO.socket.emit('createNewGame');
            },
            //The Host screen is displayed for the first time.
            startGame: function (data) {
                App.gameId = data.gameId;
                App.mySocketId = data.mySocketId;
                App.role = 'Host';
								//show code
                App.Host.showCode();
            },

            //Show the Host screen containing the game URL and code
            showCode : function() {
                //show desktop lobby
                $('#menu').hide();
								$('#getCode').show();

                // Show the gameId on screen
                $('#code').html(App.gameId);
            },

						//move player div on hostscreen
						clickButton: function (data) {

							switch (data.button) {
                  case 0:
                      joystick(data.angle);
                      break;
							    case 1:
											button1();
							        break;
							    case 2:
											button2();
							        break;

							}
						},

            //Update the Host screen when the first player joins
            changeLayout: function(data) {

                // show canvas and start game
                $('#host').hide();
                $('#game').show();
								start();

            }

        },

        Player : {

						setNum: 0,

            //The player entered their name and gameId (hopefully) and clicked Start.
            onJoin: function() {

                // collect data to send to the server
                var data = {
                    gameId : $('#input').val(),
                };
                // Send the gameId to the server
                IO.socket.emit('JoinGame', data);

                // Set data for the current player.
                App.role = 'Player';
            },

            //Change show controller for player
            changeLayout : function(data) {
                if(IO.socket.socket.sessionid === data.mySocketId){
                    App.role = 'Player';
                    App.gameId = data.gameId;

                    $('#connect').hide();
                    $('#controller').show();
										//set offset for joystick (needed to calculate angle of joystick)
										offset = $( "#joystick" ).offset();

                }
            },

						//Run function when controller buttons are clicked
						button: function(x,y) {

							//redefine data to include which button was pressed
							var data = {
                  gameId : App.gameId,
									button : x,
									angle : y
              };
							//Send data to server
							IO.socket.emit('pressButton', data);

              var n = new Date();
              buttTime = n.getTime();
            },


        }

    };

    IO.init();
    App.init();

}($));
