var soundFile, reverb;
function preload() {
  soundFile = loadSound("sound.mp3");
}

function setup() {
  reverb = new p5.Reverb();
  soundFile.disconnect(); // so we'll only hear reverb...

  // connect soundFile to reverb, process w/
  // 3 second reverbTime, decayRate of 2%
  reverb.process(soundFile, 3, 2);
  soundFile.play();
}
