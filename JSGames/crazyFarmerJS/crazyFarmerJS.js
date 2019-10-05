var imgSwamp, imgGrass, imgRiver, imgRoad, imgLoot, imgCar, imgPlayer1, imgPlayer2, imgPlayer3, imgPlayer4, imgEnemy1, imgEnemy2, imgEnemy3, imgEnemy4, imgGranade;
var map = new Array();
var gameWin = false;
var gameOver = false;
var debugMode = false;
var GoD = false;
var gameStopped = true;
var gameStart = false;
var bombPlanted = false;
var reset = [];
var x = 0;
var y = 0;
var px;
var py;
var lpx;
var lpy;
var lmx;
var lmy;
var cx;
var cy;
var sx;
var sy;
var mx = 1;
var my = 1;
var scoreLoot = 0;
var need = 5;
var lenX;
var lenY;
var DIM = 20;
var di;
var score = 0;
var level = 1;
var cooldownBomb = 3;
var readyBomb = 0;
var MCD = 7;
var monsterCooldown = MCD;
var az = 1;
var paz = 1;
var FAZE_MAX = 4;
var faze = 0;
var mFaze = 0;
var Gx;
var Gy;
var cooldown;
var lastKeyCode;
var wPressed = false;
var aPressed = false;
var sPressed = false;
var dPressed = false;


button buttonStart;
button buttonRusume;
button buttonRestart;


function setup() {

} setup()
{
  size(600, 625);
  frameRate(25);
  background(255);
  noStroke();
  mapGenerator();

  imgSwamp = loadImage("assets/mapTextures/swamp_2.jpg");
  imgGrass = loadImage("assets/mapTextures/grass_2.jpg");
  imgRiver = loadImage("assets/mapTextures/river_2.jpg");
  imgRoad = loadImage("assets/mapTextures/road_2.jpg");
  imgLoot = loadImage("assets/otherTextures/loot.png");
  imgCar = loadImage("assets/otherTextures/car.png");
  imgPlayer1 = loadImage("assets/playerTextures/player1.png");
  imgPlayer2 = loadImage("assets/playerTextures/player2.png");
  imgPlayer3 = loadImage("assets/playerTextures/player3.png");
  imgPlayer4 = loadImage("assets/playerTextures/player4.png");
  imgEnemy1 = loadImage("assets/monsterTextures/monster1.png");
  imgEnemy2 = loadImage("assets/monsterTextures/monster2.png");
  imgEnemy3 = loadImage("assets/monsterTextures/monster3.png");
  imgEnemy4 = loadImage("assets/monsterTextures/monster4.png");
  imgGranade = loadImage("assets/otherTextures/granade.png");
  saveStrings("map.txt", map);

  
  buttonRestart = new button(120, 140, 200, 100, "RESTART");
  buttonRusume = new button(300, 340, 200, 100, "RESUME");
}


function draw()
{
  background(255);
  noStroke();
  gameLogic();
  drawMap();
  drawPlayer();
  drawMonster();
  drawgameWinCar();
  if (faze > 0)
  {
    faze--;
  }
  if (mFaze > 0)
  {
    mFaze--;
  }

  if (keyCode != 0)
  {
    lastKeyCode = keyCode;
  }

  if (gameStopped == true)
  {
    if (gameStart == false)
    {
      buttonStart.draw();
    }
    if (gameStart == true)
    {
      buttonRestart.draw();
      buttonRusume.draw();
    }
  }
  if (gameOver == true)
  {
    buttonRestart.draw();
  }
}


int CS = 30;


void swamp(int x, int y)
{
  image(imgSwamp, x*CS, y*CS, CS, CS);
}


void grass(int x, int y)
{
  image(imgGrass, x*CS, y*CS, CS, CS);
}

void river(int x, int y)
{
  image(imgRiver, x*CS, y*CS, CS, CS);
}


void road(int x, int y)
{

  image(imgRoad, x*CS, y*CS, CS, CS);
}


void loot(int x, int y)
{
  image(imgLoot, x*CS, y*CS, CS, CS);
}


void drawgameWinCar()
{
  if (scoreLoot >= need)
  {
    image(imgCar, cx*CS, cy*CS, CS, CS);
  }
}


//void drawStartCar()
{
  sx = cx;
  sy = cy;
  //image(imgCar, sx*CS, sy*CS, CS, CS);
}


void drawMap()
{
  for (y = 0; y < map.length; y++)
  {
    for (x = 0; x < map[y].length(); x++)
    {
      if (map[y].charAt(x) == '%')
      {
        swamp(x, y);
      }
      if (map[y].charAt(x) == '.')
      {
        grass(x, y);
      }
      if (map[y].charAt(x) == '~')
      {
        river(x, y);
      }
      if (map[y].charAt(x) == '=')
      {
        road(x, y);
      }
      if (map[y].charAt(x) == '@')
      {
        grass(x, y);
        loot(x, y);
      }
    }
  }
  if (bombPlanted)
  {
    if (cooldown == frameRate)
    {
      readyBomb++;
    }
    if (readyBomb == cooldownBomb)
    {
      bombPlanted = false;
    }
    drawGranade();
  }
  cooldown--;
}


void drawPlayer()
{
  //fill(255);
  //ellipse(px*CS + CS/2, py*CS + CS/2, CS, CS);
  //image(imgPlayer1, px*CS, py*CS, CS, CS);
  PImage pen = imgPlayer1;
  if (paz == 1)
  {
    pen = imgPlayer1;
  }
  if (paz == 2)
  {
    pen = imgPlayer2;
  }
  if (paz == 3)
  {
    pen = imgPlayer3;
  }
  if (paz == 4)
  {
    pen = imgPlayer4;
  }
  //image(pen, px*CS, py*CS, CS, CS);
  float fpx = px - 1.0 * faze / FAZE_MAX * (px - lpx);
  float fpy = py - 1.0 * faze / FAZE_MAX * (py - lpy);


  image(pen, fpx*CS, fpy*CS, CS, CS);
}

void drawMonster()
{
  //fill(255, 0, 0);
  //ellipse(mx*CS + CS/2, my*CS + CS/2, CS, CS);
  //image(imgEnemy, mx*CS, my*CS, CS, CS);
  PImage en = imgEnemy1;
  if (az == 1)
  {
    en = imgEnemy1;
  }
  if (az == 2)
  {
    en = imgEnemy2;
  }
  if (az == 3)
  {
    en = imgEnemy3;
  }
  if (az == 4)
  {
    en = imgEnemy4;
  }

  float fmx = mx - 1.0 * mFaze / FAZE_MAX * (mx - lmx);
  float fmy = my - 1.0 * mFaze / FAZE_MAX * (my - lmy);

  if (scoreLoot >= 1) image(en, fmx*CS, fmy*CS, CS, CS);
}

void gameLogic()
{
  //if ()
  {

  }

  if (!gameStopped)
  {
    monsterCooldown--;
  }

  if (monsterCooldown <= 0 && gameOver != true && gameWin != true && scoreLoot > 0)
  {
    monsterCooldown = MCD;
    az = monsterStep();
    if (az == 1)
    {
      copyMonsterCoords();
      mx++;
    }
    if (az == 2)
    {
      copyMonsterCoords();
      my++;
    }
    if (az == 3)
    {
      copyMonsterCoords();
      mx--;
    }
    if (az == 4)
    {
      copyMonsterCoords();
      my--;
    }
  }

  if (px == mx && py == my && scoreLoot >= 1 && GoD == false)
  {
    gameOver = true;
    println("game over");
  }
  if (map[py].charAt(px) == '@')
  {
    map[py] = replace(map[py], px, '.');
    scoreLoot++;
    score++;
  }
  if (px == cx && py == cy && gameWin != true && scoreLoot >= 5)
  {
    //gameWin = true;
    println("gameWin");
    mapGenerator();
    scoreLoot = 0;
    level++;
  }
  fill(0);
  text("SCORE: " + score, 10, 620);
  text("LEVEL: " + level, 80, 620);
  if (debugMode != false)
  {
    text("GOT_LOOT: " + scoreLoot, 150, 620);
    text("FPS: " + int(frameRate), 250, 620);
    text("DEBUG: " + debugMode, 310, 620);
    text("KEY_CODE: " + lastKeyCode, 400, 620);
  }
}

void keyPressed()
{
  if (faze != 0)
  {
    return;
  }
  //println("keyCode = ", keyCode);
  if (gameWin != true && gameOver != true)
  {
    if (keyCode == 87 && py != 0 && gameStopped == false) // w = 87
    {
      wPressed = true;
      copyPlayerCoords();
      py -= 1;
      if (map[py].charAt(px) != '.' && map[py].charAt(px) != '=' && map[py].charAt(px) != '@')
      {
        py += 1;
      }
      paz = 4;
    }
    if (keyCode == 65 && px != 0 && gameStopped == false) // a = 65
    {
      aPressed = true;
      copyPlayerCoords();
      px -= 1;
      if (map[py].charAt(px) != '.' && map[py].charAt(px) != '=' && map[py].charAt(px) != '@')
      {
        px +=1;
      }
      paz = 3;
    }
    if (keyCode == 83 && py != DIM - 1 && gameStopped == false) // s = 83
    {
      sPressed = true;
      copyPlayerCoords();
      py += 1;
      if (map[py].charAt(px) != '.' && map[py].charAt(px) != '=' && map[py].charAt(px) != '@')
      {
        py -= 1;
      }
      paz = 2;
    }
    if (keyCode == 68 && px != DIM - 1 && gameStopped == false) // d = 68
    {
      dPressed = true;
      copyPlayerCoords();
      px += 1;
      if (map[py].charAt(px) != '.' && map[py].charAt(px) != '=' && map[py].charAt(px) != '@')
      {
        px -= 1;
      }
      paz = 1;
    }
  }

  if (keyCode == 32 && bombPlanted == false && gameStopped == false) // SPACE = 32
  {
    bombPlanted = true;
    Gy = py;
    Gx = px;
  }

  if (keyCode == 47 && debugMode == true && gameStopped == false)
  {
    scoreLoot++;
    GoD = true;
  }

  if (key == ESC)
  {
    if (gameStopped == false)
    {
      gameStopped = true;
    } else
    {
      gameStopped = false;
    }
    key = 0;
  }
}

void drawGranade()
{
  image(imgGranade, Gx*CS, Gy*CS, CS, CS);
}
String replace(String s, int p, char ch)
{
  String newS = s.substring(0, p) + ch + s.substring(p+1);
  return newS;
}


int monsterStep()
{
  int mdu;
  int mdr;
  int mdd;
  int mdl;

  int DIM = 20;
  //String[] imput;

  int n1 = 1000; // right
  int n2 = 1000; // down
  int n3 = 1000; // left
  int n4 = 1000; // up

  int VERY_MUCH = 1000;


  //map = loadStrings("map.txt");
  /*
  px = 10 + int(random(-5, 5));
   py = 10 + int(random(-5, 5));
   println("player", px, py);


   mx = int(random(DIM));
   my = int(random(DIM));
   println("monster", mx, my);
   */


  int a = min( min(n1, n2), min(n3, n4));

  float d0 = dist(mx, my, px, py);

  float dr = dist(mx+1, my, px, py);
  float dd = dist(mx, my+1, px, py);
  float dl = dist(mx-1, my, px, py);
  float du = dist(mx, my-1, px, py);

  char sc;


  //println("d0", d0);

  sc = map[my].charAt(constrain(mx+1, 0, DIM-1));
  //println("dr", "\""+sc+"\"", dr);

  sc = map[constrain(my+1, 0, DIM-1)].charAt(mx);
  //println("dd", "\""+sc+"\"", dd);

  sc = map[my].charAt(constrain(mx-1, 0, DIM-1));
  //println("dl", "\""+sc+"\"", dl);

  sc = map[constrain(my-1, 0, DIM-1)].charAt(mx);
  //println("du", "\""+sc+"\"", du);

  char ch;

  if (mx+1 < DIM)
  {
    ch = map[my].charAt(mx+1);
    if (ch == '~' || ch == '%')
    {
      dr = VERY_MUCH;
    }
  }

  if (my+1 < DIM)
  {
    ch = map[my+1].charAt(mx);
    if (ch == '~' || ch == '%')
    {
      dd = VERY_MUCH;
    }
  }

  if (mx-1 >= 0)
  {
    ch = map[my].charAt(mx-1);
    if (ch == '~' || ch == '%')
    {
      dl = VERY_MUCH;
    }
  }

  if (my-1 >= 0)
  {
    ch = map[my-1].charAt(mx);
    if (ch == '~' || ch == '%')
    {
      du = VERY_MUCH;
    }
  }

  //int i = int(min(min(dr, dd), min(dl, du)));

  float rm = d0;
  int azimut = -1;
  if (dr < rm)
  {
    rm = dr;
    azimut = 1;
  }

  if (dd < rm)
  {
    rm = dd;
    azimut = 2;
  }

  if (dl < rm)
  {
    rm = dl;
    azimut = 3;
  }

  if (du < rm)
  {
    rm = du;
    azimut = 4;
  }
  //println(azimut);

  mdu = int(dist(px, py, px, my));  //up 234
  mdr = int(dist(px, py, mx, py));  //right 134
  mdd = int(dist(px, my, px, py));  //down  12
  mdl = int(dist(mx, py, px, py));  //left


  return azimut;
}

void copyPlayerCoords()
{
  lpx = px;
  lpy = py;
  faze = FAZE_MAX;
}

void copyMonsterCoords()
{
  lmx = mx;
  lmy = my;
  mFaze = FAZE_MAX;
}

void addRandomSwamp()
{
  int sx = int(random(DIM-1));
  int sy = int(random(DIM-1));
  map[sy] = replace(map[sy], sx, '%');
  map[sy] = replace(map[sy], sx+1, '%');
  map[sy+1] = replace(map[sy+1], sx, '%');
  map[sy+1] = replace(map[sy+1], sx+1, '%');
}

void addRandomRiver()
{
  di = int(random(0, 2));
  //println("dimantion", di);
  if (di == 0)
  {
    addRandomHRiver();
  } else
  {
    addRandomVRiver();
  }
}

void addRandomHRiver()
{
  int ry = int(random(5, DIM-1-5));
  for (int x = 0; x < DIM; x++)
  {
    int dy = 0;//int(random(2));
    map[ry+dy] = replace(map[ry+dy], x, '~');
  }
}

void addRandomVRiver()
{
  int rx = int(random(5, DIM-1-5));
  for (int y = 0; y < DIM; y++)
  {
    map[y] = replace(map[y], rx, '~');
  }
}

void addRandomWay()
{
  if (di == 1)
  {
    addRandomHWay();
  } else
  {
    addRandomVWay();
  }
}

void addRandomHWay()
{
  int ry = int(random(5, DIM-1-5));
  for (int x = 0; x < DIM; x++)
  {
    int dy = 0;//int(random(2));
    map[ry+dy] = replace(map[ry+dy], x, '=');
  }
}

void addRandomVWay()
{
  int rx = int(random(5, DIM-1-5));
  for (int y = 0; y < DIM; y++)
  {
    map[y] = replace(map[y], rx, '=');
  }
}

void addRandomLoot()
{
  int sx = int(random(DIM-1));
  int sy = int(random(DIM-1));

  int coLoot = 7;
  for (int f = 0; f<coLoot; f++)
  {
    while (map[sy].charAt(sx) != '.')
    {
      sx = int(random(DIM-1));
      sy = int(random(DIM-1));
    }
    map[sy] = replace(map[sy], sx, '@');
  }


  //map[sy] = replace(map[sy], sx+1, '%');
  //map[sy+1] = replace(map[sy+1], sx, '%');
  //map[sy+1] = replace(map[sy+1], sx+1, '%');
}


void make(int h, char symbvol)
{
  String[] object = new String[h];
  for (int k = 0; k < h; k++)
  {
    object[k] = "";
    object[k] = object[k] + str(symbvol);
  }
  //println(object);
}

void mapGenerator()
{
  map = loadStrings("map.txt");
  /*
  while (map[py].charAt(px) != '=')
   {
   px = int(random(20-1));
   py = int(random(20-1));
   }
   */

  //println(mx, my, px, py);
  lenY = DIM; //map.length;
  lenX = DIM; //map[0].length();
  map = new String[lenY];

  for (int h = 0; h < lenY; h++)
  {
    map[h] = "";
    for (int d = 0; d < lenY; d++)
    {
      map[h] = map[h] + ".";
    }
  }
  //reset = eskize;
  //eskize = map;
  int coSwamp = 5;
  for (int d = 0; d<coSwamp; d++) addRandomSwamp();

  addRandomRiver();

  addRandomWay();

  addRandomLoot();

  while (map[cy].charAt(cx) != '=')
  {
    cx = int(random(20-1));
    cy = int(random(20-1));
  }

  while (map[py].charAt(px) != '=' && map[cy].charAt(cx) != map[py].charAt(px))
  {
    px = int(random(20-1));
    py = int(random(20-1));
  }

  while (map[my].charAt(mx) != '=' && map[my].charAt(mx) != map[py].charAt(px) && map[my].charAt(mx) != map[cy].charAt(cx))
  {
    if (di == 1)
    {
      for (int h = 0; DIM == h; h++)
      {
      }
    }
    mx = int(random(20-1));
    my = int(random(20-1));
  }
}

void mouseMoved()
{
  if (gameStopped == true)
  {
    buttonStart.mouseMoved(mouseX, mouseY);
    buttonRusume.mouseMoved(mouseX, mouseY);
    buttonRestart.mouseMoved(mouseX, mouseY);
  }
}

void mousePressed()
{
  if (gameStopped == true)
  {
    if (buttonStart.mousePressed(mouseX, mouseY) == true)
    {
      mapGenerator();
      gameStopped = false;
      gameStart = true;
    }
    if (buttonRusume.mousePressed(mouseX, mouseY) == true)
    {
      gameStopped = false;
    }

    if (buttonRestart.mousePressed(mouseX, mouseY) == true)
    {
      gameStopped = false;
      scoreLoot = 0;
      score = 0;
      level = 1;
      gameOver = false;
    }
  }
  if (buttonRestart.mousePressed(mouseX, mouseY) == true)
  {
    gameStopped = false;
    scoreLoot = 0;
    score = 0;
    level = 1;
    gameOver = false;
    mapGenerator();
  }
}

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
