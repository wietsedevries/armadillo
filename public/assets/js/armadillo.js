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
            IO.socket.on('connected', IO.onConnected );
            IO.socket.on('gameCreated', IO.gameCreated );
            IO.socket.on('joined', IO.joined );
            IO.socket.on('clicked', IO.clicked );
        },

        // Clientside is connected
        onConnected : function() {
            // set session id
            App.mySocketId = IO.socket.socket.sessionid;
        },

        // A new game has been created and a random game ID has been generated.
        gameCreated : function(data) {
            App.Host.startGame(data);
        },

        //A player has successfully joined the game.
        joined : function(data) {
            // Update screens for both player and host
            App[App.myRole].changeLayout(data);
        },

        //click on button
        clicked: function (data) {
          App.Host.clickButton(data);
        }
    };

    App = {

        //game id
        gameId: 0,

        //This is used to differentiate between 'Host' and 'Player' browsers.
        myRole: '',

        //socket id
        mySocketId: '',

        //This runs when the page initially loads.
        init: function () {
            App.bindEvents();

            // Initialize the fastclick library
            FastClick.attach(document.body);
        },
				//Button functions
				controller: function (x,y) {
					App.$doc.on('touchstart', x, function(){ App.Player.buttonA(y); });
					App.$doc.on('touchend', x, function(){ App.Player.buttonA(y); });
				},

        //Create some click handlers for the various buttons that appear on-screen.
        bindEvents: function () {
            App.$doc = $(document);
            // Desktop
            App.$doc.on('click', '#play', App.Host.createGame);

            // Player
            App.$doc.on('click', '#join',App.Player.onJoin);

						//Phonetroller (3 buttons, add more by adding more 'controller' functions)
						App.controller('#button1',1);
						App.controller('#button2',2);
						App.controller('#button3',3);

        },

        Host : {

            //Handler for the "Start" button on the introScreen.
            createGame: function () {
                IO.socket.emit('createNewGame');
                console.log('yup');
            },
            //The Host screen is displayed for the first time.
            startGame: function (data) {
                App.gameId = data.gameId;
                App.mySocketId = data.mySocketId;
                App.myRole = 'Host';
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
							    case 1:
											button1();
							        break;
							    case 2:
											button2();
							        break;
							    case 3:
											button3();
							        break;
							    case 4:
											button4(data.angle);
							        break;
							}
						},

            //Update the Host screen when the first player joins
            changeLayout: function(data) {

                // show canvas and start game
                $('#host').hide();
                $('#game').show();
								// play();

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
                // Send the gameId and playerName to the server
                IO.socket.emit('JoinGame', data);

                // Set data for the current player.
                App.myRole = 'Player';
            },

            //Display the waiting screen for player
            changeLayout : function(data) {
                if(IO.socket.socket.sessionid === data.mySocketId){
                    App.myRole = 'Player';
                    App.gameId = data.gameId;

                    $('#connect').hide();
                    $('#controller').show();
										//set offset for joystick
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
            },


        }

    };

    IO.init();
    App.init();

}($));
