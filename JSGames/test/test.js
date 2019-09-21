var x = 100;
var y = 100;
var cx = 100;
var cy = 100;
var el = true;
var hit = false;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('sounds/bell.mp3');
}

function setup() {
  createCanvas(500, 500);
  randomCoin();
}

function draw() {
  background(240);
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    x -= 5;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    x += 5;
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    y -= 5;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    y += 5;
  }
  if (document.getElementById("checkbox").checked == true && el == false)
  {
    randomCoin();
  }
  hit = collideRectCircle(x,y,50,50,cx,cy,25);

  fill(255, 0, 0);
  rect(x, y, 50, 50);
  fill(255, 255, 0);
  if (hit)
  {
    if (el == true)
    {
      mySound.play();
    }
    el = false
  }
  if (el == true)
  {
    ellipse(cx, cy, 25, 25);
    fill(0);
    text("Coin X: " + cx + "Y: " + cy, cx-45, cy-20);
  }
  fill(0);
  // console.log("Coin X: " + cx + "Y: " + cy, 10, 0);
  text("Rect X: " + (x+25) + " Y: " + (y+25), x-20, y-5);

}

function keyPressed()
{
  print(keyCode);
}

function randomCoin()
{
  el = true;
  cx = (int(random(0, 100))*5);
  cy = (int(random(0, 100))*5);
}
