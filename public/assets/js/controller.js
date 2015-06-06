var angle,
    jump,
    left,
    right,
    tiny;

// Joystick  for angle//
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

// joystick for hour
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


// 'B' Button //
function button1() {

   tiny = true;


}
// 'A' Button //
function button2() {
  if (jump === true) {
    jump = false;
    var n = new Date();
    buttTime = (n.getTime() - buttTime);
    console.log("button 1 & 2: " + buttTime+" ms");
    buttTime = 0;
  }else{
    jump = true;
  }
}
