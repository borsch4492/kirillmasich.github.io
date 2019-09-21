var r = 0;
var g = 0;
var b = 0;

function setup()
{

}


function draw()
{
  document.getElementById('body').style.background = 'rgb('+r+','+g+','+b+')';
  setTimeout(rainbow, 1000);
}

function rainbow()
{
  if (r <= 255 && g == 0 && b == 0) {
		r ++;
	}

	if (r == 255 && b == 0 && g <= 255) {
		g ++;
	}

	if (r == 255 && g == 255 && b <= 255) {
		b ++;
	}

	if (b == 255 && g == 255 && r > 0) {
		r --;
	}

	if (r == 0 && b == 255 && g > 0) {
		g --;
	}

	if (r == 0 && g == 0 && b > 0) {
		b --;
  }
}
