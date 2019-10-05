var drum;

function preload() {
  drum = loadSound('sound.mp3');
}

function setup() {
  drum.reverseBuffer();
  drum.play();
}
