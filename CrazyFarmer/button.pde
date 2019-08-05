class button
{
  int _bx;
  int _by;
  int _bw;
  int _bh;
  boolean _bo = false;
  String _bString = "LAL";

  PGraphics _bg;

  button(int bx, int by, int bw, int bh, String bString)
  {
    _bx = bx;
    _by = by;
    _bw = bw;
    _bh = bh;
    _bString = bString;

    _bg = createGraphics(_bw, _bh);
    drawPrepare();
  }

  void draw()
  {
    _bg.beginDraw();
    if (_bo == true)
    {
      _bg.fill(255, 150, 150);
    } else
    {
      _bg.fill(255);
    }
    _bg.rect(0, 0, _bw, _bh);
    _bg.fill(0, 255, 0);
    _bg.text(_bString, _bw/2, _bh/2);
    _bg.endDraw();

    image(_bg, _bx, _by);
  }

  void drawPrepare()
  {
    _bg.beginDraw();
    _bg.background(0);

    //PFont pf = createFont("sans.ttf", 72);
    //_bg.textFont(pf);
    _bg.textAlign(CENTER, CENTER);
    _bg.textSize(50);

    _bg.endDraw();
  }

  void mouseMoved(int mx, int my)
  {
    if (mx >= _bx && mx <= _bx + _bw && my >= _by && my <= _by + _bh)
    {
      _bo = true;
    } else
    {
      _bo = false;
    }
  }

  boolean mousePressed(int mx, int my)
  {
    boolean bp = (mx >= _bx && mx <= _bx + _bw && my >= _by && my <= _by + _bh);
    //println(bp);
    return bp;
  }
}