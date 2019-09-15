'use strict';

//stat settings
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var FONT_SIZE = 16;
var FONT_FAMILY = ' PT Mono';

var TEXT_COLOR = '#000';
var TITLE_MARGIN_LEFT = 30;
var TITLE_MARGIN_TOP = 20;
var TITLE_GAP = 10;

var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_COL_GAP = 50;

var BAR_MARGIN_TOP = CLOUD_Y + TITLE_MARGIN_TOP + FONT_SIZE * 2 + TITLE_GAP * 3;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function renderCloudText(ctx, x, y, text, color) {
  ctx.font = FONT_SIZE + "px " + FONT_FAMILY;
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function renderCloudBar(ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, height);
}

function getMaxElement(arr) {
  var maxEl = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxEl) {
      maxEl = arr[i];
    }
  }
  return maxEl;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, (CLOUD_X + GAP), (CLOUD_Y + GAP), 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // stat title rendering
  renderCloudText(ctx,
    CLOUD_X + TITLE_MARGIN_LEFT,
    CLOUD_Y + TITLE_MARGIN_TOP,
    'Ура вы победили!',
    TEXT_COLOR);

  renderCloudText(ctx,
    CLOUD_X + TITLE_MARGIN_LEFT,
    CLOUD_Y + TITLE_MARGIN_TOP + FONT_SIZE + TITLE_GAP,
    'Список результатов:',
    TEXT_COLOR);


  for (var i = 0; i < names.length; i++) {
    var barBackground = names[i] !== 'Вы' ? 'rgba(31, 58, 147, 0.' + parseInt(getRandomArbitrary(5, 10), 10) + ')' : 'rgba(255, 0, 0, 1)';
    var maxTime = getMaxElement(times);
    var time = parseInt(times[i], 10);

    renderCloudText(ctx,
      (CLOUD_X + BAR_COL_GAP) + (BAR_WIDTH + BAR_COL_GAP) * i,
      CLOUD_Y + (BAR_HEIGHT - ((BAR_HEIGHT * time) / maxTime)) + BAR_MARGIN_TOP - FONT_SIZE,
      time,
      TEXT_COLOR);

    renderCloudBar(ctx,
      (CLOUD_X + BAR_COL_GAP) + (BAR_WIDTH + BAR_COL_GAP) * i,
      CLOUD_Y + (BAR_HEIGHT - ((BAR_HEIGHT * time) / maxTime)) + BAR_MARGIN_TOP,
      (BAR_HEIGHT * time) / maxTime,
      barBackground);

    renderCloudText(ctx,
      (CLOUD_X + BAR_COL_GAP) + (BAR_WIDTH + BAR_COL_GAP) * i,
      CLOUD_Y + (BAR_HEIGHT) + BAR_MARGIN_TOP + TITLE_GAP,
      names[i],
      TEXT_COLOR);
  }
};
