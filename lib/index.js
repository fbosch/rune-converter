var exports = module.exports = {};
import _ from 'lodash';

var defaultSettings = {
  punctation: 'single' // single, double, cross
};

var runeTable = {
  f: 'ᚠ', // fehu
  u: 'ᚢ', // uruz
  þ: 'ᚦ', // þurisaz
  a: 'ᚨ', // ansuz
  r: 'ᚱ', // raidō
  k: 'ᚲ', // kaunan (k)
  c: 'ᚲ', // kaunan (c)
  g: 'ᚷ', // gebō
  w: 'ᚹ', // wunjō
  h: ['ᚺ', 'ᚻ'], // hagalaz
  n: 'ᚾ', // naudiz
  i: 'ᛁ', // īsaz
  j: 'ᛃ', // jēra
  æ: 'ᛇ', // eihwaz
  ï: 'ᛇ', // eihwaz
  p: 'ᛈ', // perþ
  z: 'ᛉ', // algiz
  s: ['ᛋ', 'ᛊ'], // sōwilō
  t: 'ᛏ', // tiwaz
  b: 'ᛒ', // berkanan
  e: 'ᛖ', // ehwaz
  m: 'ᛗ', // mannaz
  l: 'ᛚ', // laguz
  ŋ: ['ᛜ', 'ᛝ'], // ingwaz
  o: 'ᛟ', // othala
  d: 'ᛞ', // dagaz
  _dot: ['᛫', '᛬', '᛭'] // punctation variants
};

exports.getRune = function (str, variantIndex) {
  if ((str.length !== 1 && !_.startsWith(str, '_')) || _.isNumber(str)) {
    return '';
  }
  let rune = runeTable[str];
  if (_.isArray(rune)) {
    if (variantIndex) {
      if (!_.isUndefined(rune[variantIndex])) {
        rune = rune[variantIndex];
      }
    }
    if(_.isArray(rune)) {
      rune = rune[0];
    }
  }
  if (_.isUndefined(rune)) {
    rune = '';
  }
  return rune;
};

exports.convert = function (str, userSettings) {
  let settings = _.assign({}, defaultSettings, userSettings);
  let strArray = str.split('');
  let convertedString = '';
  _.forEach(strArray, letter => {
    let rune;
    switch (letter) {
      case '.': {
        switch (settings.punctation) {
          case 'single': {
            rune = exports.getRune('_dot', 0);
            break;
          }
          case 'double': {
            rune = exports.getRune('_dot', 1);
            break;
          }
          case 'cross': {
            rune = exports.getRune('_dot', 2);
            break;
          }
          default: {
            rune = exports.getRune('_dot');
            break;
          }
        }
        break;
      }
      case ' ': {
        rune = ' ';
        break;
      }
      default: {
        rune = exports.getRune(letter);
      }
    }
    convertedString += rune;
  });
  return convertedString;
};
