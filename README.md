![alt text](https://github.com/wietsedevries/armadillo/raw/master/public/assets/css/images/icon.png "Armadillo, interdevice HTML5 game framework")

Use your phone as a controller for any HTML 5 game!
Armadillo is an interdevice HTML5 game framework and can be modified to be used for any HTML5 game.
<br/>
Armadillo is built with Node.js and Socket.io, so it's 100% javascript code.
Fork this repository and see what you can do with it!

##  Installation
###### 1. Install node.js ([nodejs.org](http://nodejs.org))

###### 2. Clone repository:
```sh
$ git clone https://github.com/wietsedevries/armadillo.git
```
###### 3. Open folder
```sh
$ cd Armadillo
```
###### 4. Install dependencies:
```sh
$ npm install
```
###### 5. Start server:
```sh
$ node server.js
```
###### 6. Go to http://localhost:3000 and play game!:)
<br/>
## Documentation
#####Controller buttons
The controller currently has 2 buttons, but can have as many as you need. To add a new button you need to add 2 new lines of code in the **armadillo.js** file.<br/><br/>
1.  Set eventlistener for button (@line 100)<br/>
`App.controller('#UNIQUE_BUTTON_ID',UNIQUE_INT_IDENTIFIER);`<br/><br/>
2.  Add function to button using the cases var (@line 130)<br/>
 `UNIQUE_INT_IDENTIFIER: functionName`<br/>

Now you can use the 'functionName' function in the **controller.js** to do whatever you like. As is, the function wil execute twice; ontouch & onTouchEnd.<br/>
The ** armadillo.js** file contains comments that will hopefully help you better understand these steps.


#####Joystick
This repository contains 2 types joysticks in je **joystick.js** file; an efficient one and an accurate one. The joystick is optional.
<br/>Both joysticks are dependent on jQuery's UI Draggable function and and rely on Dave Furfero's [Touch Punch](http://touchpunch.furf.com/) to enable the draggable function on mobile devices. (included in the file). <br/><br/>
**Efficient joystick**  `calculateHour();` <br/>
The efficient joystick sends less data packets to the server, but at a cost. The server will only register the angle of the joystick if the joystick moves more than 30degrees relative to its former position. The joysticks knows 12 positions equal to the hours on the clock.<br/><br/>
**Accurate joystick** `calculateAngle();` <br/>
The accurate joystick send a data packets, containing the angle of the joystick, to the server on every movement (± 50 p/sec). This joystick is a must if accuracy is important, but it will slow down performance.



##  Contributing
The main goal of this open-source project is to advance the use of interdevice connectivity, so your contribution is much appreciated! Feel free to add, modify and improve whatever you like, but your help is currently most needed with the following points;
- Enabling multi touch (to use joystick and buttons at the same time);
- Implementing a lighter alternative for fastclick.js
- Improve the demo game;

**Don't know how to contribute? Check out this [article](https://guides.github.com/activities/contributing-to-open-source/).**

##  Credits
**Created by:** Wietse de Vries | [wietsedevries.eu](http://wietsedevries.eu) <br/>
**Inspired by:** Eric Terpstra's "Anagrammatix" | [Github Repository](https://github.com/ericterpstra/anagrammatix)
##### Contributors
- Tijmen Helder | [@Github](https://github.com/TijmenH)
- Tim Bartels | [@Github](https://github.com/timbartels)

##  License
The MIT License (MIT)

Copyright (c) 2015 Wietse de Vries

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
