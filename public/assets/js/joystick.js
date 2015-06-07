/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

var current;

// This joystick function will only send a data packet to the server if the
// joystick rotates more than 30 degrees (recommended)
function calculateHour(y,x) {
  var angle;
  var hour;
  var yAxis = y - offset.top;
  var xAxis = x - offset.left;

  if ( (xAxis < -12 || yAxis < -12) || (xAxis > 12 || yAxis > 12) ||
      (xAxis > 12 || yAxis < -12) || (xAxis < -12 || yAxis > 12)) {

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
    App.Player.button(0,hour);
    current = hour;
  }
}

$(function() {

  $( "#joystick" ).draggable({
    revert: function() {
      App.Player.button(0,0);
      return true;
    },
  	drag: function() {
  		var rect = document.getElementById('joystick').getBoundingClientRect();
      calculateHour(rect.top,rect.left);
	  },

    // Lock joystick on axis (optional)
    axis: "x"

  });
});


// This joystick function will send a data packet on every move (±50 p/sec)
// Recommended when precision is important.
// To use this function edit the function in joystick.js as well

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

// Replace the jostick() function in controller.js with this:

// function joystick(angle) {
//
//       if(angle !== 0 && (angle > -90 && angle < 90)) {
//         right = true;
//         left =  false;
//       }else if (angle === 0){
//         right = false;
//         left =  false;
//       }else{
//         right = false;
//         left =  true;
//       }
// }
