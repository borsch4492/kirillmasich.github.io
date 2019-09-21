var x = 100;
var y = 100;
var cx = 100;
var cy = 100;
var el = true;

function setup() {
  createCanvas(500, 500);
  randomCoin();
}

function draw() {
  background(240);
  if (keyIsDown(LEFT_ARROW)) {
    x -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    y -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    y += 5;
  }


  fill(255, 0, 0);
  rect(x, y, 50, 50);
  fill(255, 255, 0);
  if (cy == y+25 && cx == x+25)
  {
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

function randomCoin()
{
  el = true;
  cx = (int(random(0, 100))*5);
  cy = (int(random(0, 100))*5);
}
