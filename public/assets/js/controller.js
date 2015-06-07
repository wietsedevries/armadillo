var jump;
var left;
var right;
var tiny;

function button1() {
  tiny = true;
}

function button2() {
  if (jump === true) {
    jump = false;
  }else{
    jump = true;
  }
}

function joystick(hour) {
  switch (hour) {
    case 0:
      right = false;
      left =  false;
      break;
    case 1: case 2: case 3: case 4: case 5: case 6:
      right = true;
      left =  false;
      break;
    case 7: case 8: case 9: case 10: case 11: case 12:
      right = false;
      left =  true;
      break;
    default:
      right = false;
      left =  false;
      break;
  }
}
