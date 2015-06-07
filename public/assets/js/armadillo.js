window.onload = function() {
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
var offset;

jQuery( function($) {
  'use strict';

  var IO = {

    init: function() {
        IO.socket = io.connect();
        IO.bindEvents();
    },

    bindEvents : function() {
        IO.socket.on('connected', IO.Connected );
        IO.socket.on('gameCreated', IO.gameCreated );
        IO.socket.on('joined', IO.joined );
        IO.socket.on('clicked', IO.clicked );
    },

    Connected : function() {
        App.socketId = IO.socket.socket.sessionid;
    },

    gameCreated : function(data) {
        App.Host.startGame(data);
    },

    joined : function(data) {
        App[App.role].changeLayout(data);
    },

    clicked: function(data) {
      App.Host.clickAction(data);
    }
  };

  App = {

    activeRoom: 0,

    role: '',

    socketId: '',

    init: function() {
      App.bindEvents();
      FastClick.attach(document.body);
    },

    endGame: function (score) {
      $('#game').hide();
      $('#getCode').hide();
      $('#menu').hide();
      $('#host').show();
      $('#score').show();
      $('#newScore').html(score + ' Points');

    },

    restart: function() {
      restartGame();
      $('#host').hide();
      $('#game').show();

    },

		controller: function(x,y) {
			App.$doc.on('touchstart', x, function() { App.Player.button(y); });
			App.$doc.on('touchend', x, function() { App.Player.button(y); });
		},

    bindEvents: function() {
      App.$doc = $(document);
      App.$doc.on('click', '#play', App.Host.createGame);
      App.$doc.on('click', '#playAgain', App.restart);
      App.$doc.on('click', '#join',App.Player.onJoin);

			// Controller functions
      // To add more buttons to the controller just use this function:
      // App.controller(UNIQUE_BUTTON_ID, UNIQUE_NUMBER);
      // UNIQUE_BUTTON_ID being the id of the button
      // and UNIQUE_NUMBER as an identifier

      App.controller('#button1',1);
			App.controller('#button2',2);
      // Example: App.controller('#anyDiv',272);

    },

    Host : {

      createGame: function() {
        IO.socket.emit('createNewGame');
      },

      startGame: function(data) {
        App.activeRoom = data.activeRoom;
        App.socketId = data.socketId;
        App.role = 'Host';
        App.Host.showCode();
      },

      showCode : function() {
        $('#menu').hide();
				$('#getCode').show();
        $('#code').html(App.activeRoom);
      },

      // Once the button has been received by the Host it will run the function
      // with the asigned identifier on the controller.js file
      clickAction: function(data) {
        var cases = {
            0: joystick,
            1: button1,
            2: button2
            // Example: '272: functionName'
        };
        if (cases[data.button]) {
            cases[data.button](data.angle);
        }
			},

      changeLayout: function(data) {
        $('#host').hide();
        $('#game').show();
				start();
      }

    },

    Player : {

		  setNum: 0,

      onJoin: function() {
        var data = {
            activeRoom : $('#input').val(),
        };
        IO.socket.emit('JoinGame', data);
        App.role = 'Player';
      },

      changeLayout : function(data) {
        if(IO.socket.socket.sessionid === data.socketId){
          App.role = 'Player';
          App.activeRoom = data.activeRoom;

          $('#connect').hide();
          $('#controller').show();
					offset = $('#joystick').offset();

        }
      },

			button: function(x,y) {
				var data = {
          gameId : App.gameId,
					button : x,
					angle : y
        };
				IO.socket.emit('pressButton', data);
      },
    }
  };

  IO.init();
  App.init();

}($));
