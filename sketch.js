var img;
var colors = [];
var sortMode = null;

function preload() {
  img = loadImage('img/191130002.jpg');
  // loadImageのやり方がわからん。img/191130002.jpgから絶対パスhttps://sota14.github.io/palette_from_img/img/191130002.jpgに変更
}

function setup() {
  createCanvas(1000, 1000);
  noCursor();
  noStroke();
}

function draw() {
  var tileCount = floor(width / max(mouseX, 5));
  var rectSize = width / tileCount;

  img.loadPixels();
  colors = [];

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var px = int(gridX * rectSize);
      var py = int(gridY * rectSize);
      var i = py * img.width * px * 4;
      var c = color(
        img.pixels[i],
        img.pixels[i + 1],
        img.pixels[i + 2],
        img.pixels[i + 3]
      );
      colors.push(c);
    }
  }

  gd.sortColors(colors, sortMode);

  var i = o;
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      fill(colors[i]);
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      i++;
    }
  }
}

function keyReleased() {
  if (key == 'c' || key == 'C')
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') loadImage('img/191130002.jpg', setImage);
  if (key == '2') loadImage('img/191130004.jpg', setImage);
  /* if (key == '3') loadImage('data/pic3.jpg', setImage);
  if (key == '4') loadImage('data/pic4.jpg', setImage); */

  if (key == '5') sortMode = null;
  if (key == '6') sortMode = gd.HUE;
  if (key == '7') sortMode = gd.SATURATION;
  if (key == '8') sortMode = gd.BRIGHTNESS;
  if (key == '9') sortMode = gd.GRAYSCALE;
}

function setImage(loadedImageFile) {
  img = loadedImageFile;
}
