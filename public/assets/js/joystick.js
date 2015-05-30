(function ($) {

  // Detect touch support
  $.support.touch = 'ontouchend' in document;

  // Ignore browsers without touch support
  if (!$.support.touch) {
  return;
  }

  var mouseProto = $.ui.mouse.prototype,
    _mouseInit = mouseProto._mouseInit,
    _mouseDestroy = mouseProto._mouseDestroy,
    touchHandled;

  /**
  * Simulate a mouse event based on a corresponding touch event
  * @param {Object} event A touch event
  * @param {String} simulatedType The corresponding mouse event
  */
  function simulateMouseEvent (event, simulatedType) {

  // Ignore multi-touch events
  if (event.originalEvent.touches.length > 1) {
    return;
  }

  event.preventDefault();

  var touch = event.originalEvent.changedTouches[0],
      simulatedEvent = document.createEvent('MouseEvents');

  // Initialize the simulated mouse event using the touch event's coordinates
  simulatedEvent.initMouseEvent(
    simulatedType,    // type
    true,             // bubbles
    true,             // cancelable
    window,           // view
    1,                // detail
    touch.screenX,    // screenX
    touch.screenY,    // screenY
    touch.clientX,    // clientX
    touch.clientY,    // clientY
    false,            // ctrlKey
    false,            // altKey
    false,            // shiftKey
    false,            // metaKey
    0,                // button
    null              // relatedTarget
  );

  // Dispatch the simulated event to the target element
  event.target.dispatchEvent(simulatedEvent);
  }

  /**
  * Handle the jQuery UI widget's touchstart events
  * @param {Object} event The widget element's touchstart event
  */
  mouseProto._touchStart = function (event) {

  var self = this;

  // Ignore the event if another widget is already being handled
  if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
    return;
  }

  // Set the flag to prevent other widgets from inheriting the touch event
  touchHandled = true;

  // Track movement to determine if interaction was a click
  self._touchMoved = false;

  // Simulate the mouseover event
  simulateMouseEvent(event, 'mouseover');

  // Simulate the mousemove event
  simulateMouseEvent(event, 'mousemove');

  // Simulate the mousedown event
  simulateMouseEvent(event, 'mousedown');
  };

  /**
  * Handle the jQuery UI widget's touchmove events
  * @param {Object} event The document's touchmove event
  */
  mouseProto._touchMove = function (event) {

  // Ignore event if not handled
  if (!touchHandled) {
    return;
  }

  // Interaction was not a click
  this._touchMoved = true;

  // Simulate the mousemove event
  simulateMouseEvent(event, 'mousemove');
  };

  /**
  * Handle the jQuery UI widget's touchend events
  * @param {Object} event The document's touchend event
  */
  mouseProto._touchEnd = function (event) {

  // Ignore event if not handled
  if (!touchHandled) {
    return;
  }

  // Simulate the mouseup event
  simulateMouseEvent(event, 'mouseup');

  // Simulate the mouseout event
  simulateMouseEvent(event, 'mouseout');

  // If the touch interaction did not move, it should trigger a click
  if (!this._touchMoved) {

    // Simulate the click event
    simulateMouseEvent(event, 'click');
  }

  // Unset the flag to allow other widgets to inherit the touch event
  touchHandled = false;
  };

  /**
  * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
  * This method extends the widget with bound touch event handlers that
  * translate touch events to mouse events and pass them to the widget's
  * original mouse event handling methods.
  */
  mouseProto._mouseInit = function () {

  var self = this;

  // Delegate the touch handlers to the widget's element
  self.element.bind({
    touchstart: $.proxy(self, '_touchStart'),
    touchmove: $.proxy(self, '_touchMove'),
    touchend: $.proxy(self, '_touchEnd')
  });

  // Call the original $.ui.mouse init method
  _mouseInit.call(self);
  };

  /**
  * Remove the touch event handlers
  */
  mouseProto._mouseDestroy = function () {

  var self = this;

  // Delegate the touch handlers to the widget's element
  self.element.unbind({
    touchstart: $.proxy(self, '_touchStart'),
    touchmove: $.proxy(self, '_touchMove'),
    touchend: $.proxy(self, '_touchEnd')
  });

  // Call the original $.ui.mouse destroy method
  _mouseDestroy.call(self);
  };

})(jQuery);
  var current;
  function calculateHour(y,x) {
    var angle,
        hour,
  			yAxis = y - offset.top,
  			xAxis = x - offset.left;

        if ((xAxis < -12 || yAxis < -12) || (xAxis > 12 || yAxis > 12) || (xAxis > 12 || yAxis < -12) || (xAxis < -12 || yAxis > 12)) {

          cal =  Math.round(Math.atan(yAxis/xAxis)*180/Math.PI*10000)/10000;

          if ( yAxis < 0 && xAxis < 0 ) {
      			angle = cal - 180;
      		}else if (yAxis > 1 && xAxis < 0) {
      			angle = cal + 180;
      		}else{
            angle = cal;
          }
          if (angle < -60 && angle >= -90) {
              hour = 1;
          }else if (angle < -30 && angle >= -60) {
              hour = 2;
          }else if (angle < 0 && angle >= -30) {
              hour = 3;
          }else if (angle < 30 && angle >= 0) {
              hour = 4;
          }else if (angle < 60 && angle >= 30) {
              hour = 5;
          }else if (angle < 90 && angle >= 60) {
              hour = 6;
          }else if (angle < 120 && angle >= 90) {
              hour = 7;
          }else if (angle < 150 && angle >= 120) {
              hour = 8;
          }else if (angle < 180 && angle >= 150) {
              hour = 9;
          }else if (angle < -150 && angle >= -180) {
              hour = 10;
          }else if (angle < -120 && angle >= -150) {
              hour = 11;
          }else if (angle < -90 && angle >= -120) {
              hour = 12;
          }

        }else{
          hour = 0;
        }
        if (hour != current) {
          App.Player.button(3,hour);
          current = hour;
        }

  }


	// function calculateAngle(y,x) {
	// 	var angles,
	// 		yAxis = y - offset.top,
	// 		xAxis = x - offset.left;
  //
	// 	cal =  Math.round(Math.atan(yAxis/xAxis)*180/Math.PI*10000)/10000;
  //
	// 	if ( yAxis < -12 && xAxis < -12 ) {
	// 		angle = cal - 180;
	// 	}else if (yAxis > 12 && xAxis < -12) {
	// 		angle = cal + 180;
	// 	}else if (yAxis > 12 || yAxis < -12 || xAxis < -12 || xAxis >12) {
  //     angle = cal;
  //   }else{
	// 		angle = 0;
	// 	}
  //   App.Player.button(3,angle);
  //
	// }

	  $(function() {

	    $( "#joystick" ).draggable({
        revert: function() {
          App.Player.button(3,0);
          return true;
        },
	    	drag: function() {
	    		var rect = document.getElementById('joystick').getBoundingClientRect();

				  // calculateAngle(rect.top,rect.left);
          calculateHour(rect.top,rect.left);
			  },

	    });
	  });
