function setup() {
  createCanvas(100, 100, WEBGL);
  fill(230);
}
function draw() {
  background(255);
  rotateX(millis() / 1000);
  rotateY(millis() / 1000);
  rotateZ(millis() / 10000);
  box();
}
