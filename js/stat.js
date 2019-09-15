'use strict';

//stat settings
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var TEXT_COLOR = '#000';

var TEXT_GAP_X = 30;
var TEXT_GAP_Y = 20;

var BAR_WIDTH = 50;
var BAR_HEIGHT = 180;


function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function renderCloudText(ctx, x, y, text, color) {
  ctx.font = "16px PT Mono";
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
  renderCloudText(ctx, (CLOUD_X + TEXT_GAP_X), (CLOUD_Y + TEXT_GAP_Y), 'Ура вы победили!', TEXT_COLOR);
  renderCloudText(ctx, (CLOUD_X + TEXT_GAP_X), (CLOUD_Y + (TEXT_GAP_Y * 2)), 'Список результатов:', TEXT_COLOR);


  for (var i = 0; i < names.length; i++) {
    var barBackground = names[i] !== 'Вы' ? 'rgba(31, 58, 147, 0.' + parseInt(getRandomArbitrary(5, 10), 10) + ')' : 'rgba(255, 0, 0, 1)';
    console.log(getRandomArbitrary(3, 10));
    var maxTime = getMaxElement(times);
    var time = parseInt(times[i], times);


    renderCloudText(ctx, CLOUD_X + BAR_WIDTH + (BAR_WIDTH * 2 * i), CLOUD_HEIGHT - (((BAR_HEIGHT * time) / maxTime)), parseInt(time, 10), TEXT_COLOR);
    renderCloudBar(ctx, CLOUD_X + BAR_WIDTH + (BAR_WIDTH * 2 * i), CLOUD_HEIGHT - (((BAR_HEIGHT * time) / maxTime)) + TEXT_GAP_Y, ((BAR_HEIGHT * time) / maxTime) - (TEXT_GAP_Y * 2) - GAP - TEXT_GAP_Y, barBackground);
    renderCloudText(ctx, CLOUD_X + BAR_WIDTH + (BAR_WIDTH * 2 * i), CLOUD_HEIGHT - TEXT_GAP_Y - GAP, names[i], TEXT_COLOR);
  }
};
