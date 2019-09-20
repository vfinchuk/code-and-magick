'use strict';

var WIZARD_COUNT = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var EYES_COLORS = ['back', 'red', 'blue', 'yellow', 'green'];

// Convert rgba format colors to hex
function rgbToHex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

// Get random item from array
function getRandArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate array with wizard objects
function getWizards() {
  var wizards = [];
  if (WIZARD_COUNT <= NAMES.length && WIZARD_COUNT <= SURNAMES.length) {
    for (var i = 0; i < WIZARD_COUNT; i++) {
      wizards.push({
        name: getRandArrayItem(NAMES),
        surname: getRandArrayItem(SURNAMES),
        coatColor: getRandArrayItem(COAT_COLORS),
        eyesColor: getRandArrayItem(EYES_COLORS)
      });
    }
  }
  return wizards;
}

// Rendering wizards list
function renderWizardList(wizardArray, wizardTemplate, wizardSimilarList) {

  for (var i = 0; i < wizardArray.length; i++) {
    var wizard = wizardArray[i];
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    wizardElement.querySelector('.wizard-coat').style.fill = rgbToHex(wizard.coatColor);
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    wizardSimilarList.appendChild(wizardElement);
  }

}

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var setUpSimilar = document.querySelector('.setup-similar');
setUpSimilar.classList.remove('hidden');

var similarListItem = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizards = getWizards();

renderWizardList(wizards, similarWizardTemplate, similarListItem);
