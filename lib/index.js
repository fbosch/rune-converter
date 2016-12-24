const runeConverter = module.exports = {}
import _ from 'lodash'

const defaultSettings = {
  punctuation: 'cross', // single, double, cross
  spacing: 'double' // punctuation variants + 'normal'
}

const runeTable = {
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
  y: 'ᛃ',
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
  x: 'ᚲᛋ',
  ch: 'ᚷ',
  ij: 'ᛇ',
  cc: 'ᚲᛋ',
  oe: 'ᚯ',
  th: 'ᚦ',
  ie: 'ᛠ',
  ea: 'ᛠ',
  eau: 'ᛟ',
  chr: 'ᚺᚱ',
  ing: 'ᛜ',
  chl: 'ᚺᛚ',
  ng: 'ᛜ',
  chj: 'ᚺᛃ',
  nk: 'ᛜᚲ',
  chw: 'ᚺᚹ',
  ei: 'ᛇ',
  punctuation: { single: '᛫', double: '᛬', cross: '᛭' } // punctuation variants
}

runeConverter.transcribe = (string, variantIndex) => {
  let rune = _.has(runeTable, string) ? runeTable[string] : null
  if (_.isArray(rune)) {
    rune = !_.isUndefined(rune[variantIndex]) ? rune[variantIndex] : rune[0]
  }
  if(_.isNil(rune)) {
    return _.isNaN(_.toNumber(string)) ? string : ''
  }
  return rune || string
}

runeConverter.transcribeLetterCombinations = string => {
  let combinations = _.keys(runeTable)
    .filter(key => key.length !== 1 && _.isString(runeTable[key]))
    .sort((a, b) => b.length - a.length)

  return combinations.reduce((str, key) => {
    return str = _.replace(str, key, runeConverter.transcribe(key))
  }, _.toLower(_.clone(string)))
}


runeConverter.toRunic = (string, userSettings) => {
  const settings = _.assign({}, defaultSettings, userSettings)
  return runeConverter.transcribeLetterCombinations(string).split('')
    .reduce((convertedString, letter) => {
      let rune
      switch (letter) {
        case '.': {
          rune = _.has(runeTable.punctuation, settings.punctuation) ?
            runeTable.punctuation[settings.punctuation] :
            runeTable.punctuation[defaultSettings.punctuation]
          break
        }
        case ' ': {
          rune = settings.spacing === 'normal' ? ' ' :
            _.has(runeTable.punctuation, settings.spacing) ? runeTable.punctuation[settings.spacing] : ' '
          break
        }
        default: {
          rune = runeConverter.transcribe(letter)
        }
      }
      return convertedString += rune
    }, new String)
}

