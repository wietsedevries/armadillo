var angle,
    jump,
    left,
    right,
    flip;

// 'B' Button //
function button1() {
  if (jump === true) {
    jump = false;
  }else{
    jump = true;
  }

}
// 'A' Button //
function button2() {

  flip = true;

}
// Joystick //
function button3(x) {

      angle = x;
      if(angle !== 0 && (angle > -90 && angle < 90)) {
        right = true;
        left =  false;
      }else if (angle === 0){
        right = false;
        left =  false;
      }else{
        right = false;
        left =  true;
      }


}
