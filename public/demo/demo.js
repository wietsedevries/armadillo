var game;
// function start(){
  game = new Phaser.Game(1280, 680, Phaser.CANVAS, 'Game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = '/demo/';
    game.load.crossOrigin = 'anonymous';

    game.load.spritesheet('armadillo', 'images/armadillo-walk.png', 250, 120, 23);
    game.load.image('background', 'images/background.png');
    game.load.image('tumbleweed', 'images/tumbleweed.png');
    game.load.image('floor', 'images/floor.png');

}
var armadillo;
var cursors;
var jumpButton;
var bg;
var bg2;
var tw1;
var tw2;
var tw3;
var ground;
var airborn = false;

function create() {

    bg = game.add.sprite(0, 0, 'background');
    bg2 = game.add.sprite(4000, 0, 'background');

    ground = game.add.physicsGroup();

    ground.create(0, 640, 'floor');

    ground.setAll('body.immovable', true);


    armadillo = game.add.sprite(100, 200, 'armadillo');
    armadillo.anchor.setTo(0.5, 0.5);
    armadillo.animations.add('walk',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
    armadillo.animations.add('jump',[20,21,22]);
    armadillo.animations.add('land',[22,21,20]);
    armadillo.animations.play('walk', 40, true);

    armadillo.angle = 0;

    tw1 = game.add.sprite(1500, 610, 'tumbleweed');
    tw2 = game.add.sprite(1800, 600, 'tumbleweed');
    tw3 = game.add.sprite(2100, 590, 'tumbleweed');
    tw1.anchor.setTo(0.5, 0.5);
    tw2.anchor.setTo(0.5, 0.5);
    tw3.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(armadillo);
    game.physics.arcade.enable(tw1);
    game.physics.arcade.enable(tw2);
    game.physics.arcade.enable(tw3);
    game.physics.arcade.enable(ground);

    armadillo.body.collideWorldBounds = true;
    armadillo.body.gravity.y = 500;

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);



}
function destroyTw1(){
  tw1.position.x =  1280 + (Math.random() * 1000);
  tw1.position.y = 610;
}
function destroyTw2(){
  tw2.position.x =  1280 + (Math.random() * 1000);
  tw2.position.y = 600;
}
function destroyTw3(){
  tw3.position.x =  1280 + (Math.random() * 1000);
  tw3.position.y = 590;
}

function update () {

    game.physics.arcade.overlap(armadillo,tw1,destroyTw1);
    game.physics.arcade.overlap(armadillo,tw2,destroyTw2);
    game.physics.arcade.overlap(armadillo,tw3,destroyTw3);

    game.physics.arcade.collide(armadillo, ground);


    armadillo.body.velocity.x = 0;

    if(tw1.position.x < -100) {
      tw1.position.x =  1280 + (Math.random() * 1000);
    }
    if(tw2.position.x < -100) {
      tw2.position.x =  1280 + (Math.random() * 1000);
    }
    if(tw3.position.x < -100) {
      tw3.position.x =  1280 + (Math.random() * 1000);
    }
    tw1.position.x = tw1.position.x - 5;
    tw2.position.x = tw2.position.x - 7;
    tw3.position.x = tw3.position.x - 6;

    console.log(tw1.position.y);

    tw1.angle += -2;
    tw2.angle += -2;
    tw3.angle += -2;

    if(bg.position.x == -4000){
      bg.position.x = 4000;
    }
    if(bg2.position.x == -4000){
      bg2.position.x = 4000;
    }
    bg.position.x = bg.position.x -2;
    bg2.position.x = bg2.position.x -2;

    if ((cursors.left.isDown || left) && airborn === false)
    {
      armadillo.body.velocity.x = -250;

    }
    else if ((cursors.left.isDown || left) && airborn === true)
    {
      armadillo.body.velocity.x = -150;
    }
    else if ((cursors.right.isDown || right) && airborn === false)
    {
      armadillo.body.velocity.x = 250;
    }
    else if ((cursors.right.isDown || right) && airborn === true)
    {
      armadillo.body.velocity.x = 150;
    }

    if ((jumpButton.isDown || jump) && (armadillo.body.onFloor() || armadillo.body.touching.down))
    {
      armadillo.body.velocity.y = -450;
      armadillo.animations.play('walk', 0, false);
      armadillo.animations.play('jump', 20, false);
      airborn = true;
      setTimeout(function(){
        armadillo.animations.play('land', 20, false);
        airborn = false;
        armadillo.animations.play('walk', 40, true);
      }, 1850);
    }
    if(flip && airborn){
      armadillo.angle = (armadillo.angle + 360);
      console.log(armadillo.angle);
    }
}
function render () {

}
