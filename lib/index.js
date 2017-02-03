import has from 'lodash.has'
import isNaN from 'lodash.isnan'
import isNil from 'lodash.isnil'
import toNumber from 'lodash.tonumber'
import keys from 'lodash.keys'
import isString from 'lodash.isstring'
import replace from 'lodash.replace'
import toLower from 'lodash.tolower'
import clone from 'lodash.clone'
import assign from 'lodash.assign'

const defaultSettings = {
  punctuation: 'cross', // single, double, cross
  spacing: 'double' // punctuation variants + 'normal'
}

const elderFuthark = {
  fehu: 'ᚠ',
  uruz: 'ᚢ',
  thurisaz: 'ᚦ',
  ansuz: 'ᚨ',
  raido: 'ᚱ',
  kaunan: 'ᚲ',
  gebo: 'ᚷ',
  wunjo: 'ᚹ',
  hagalaz: 'ᚺ',
  naudiz: 'ᚾ',
  isaz: 'ᛁ',
  jera: 'ᛃ',
  eihwaz: 'ᛇ',
  perth: 'ᛈ',
  algiz: 'ᛉ',
  sowilo: 'ᛋ',
  tiwaz: 'ᛏ',
  berkanan: 'ᛒ',
  ehwaz: 'ᛖ',
  mannaz: 'ᛗ',
  laguz: 'ᛚ',
  ingwaz: 'ᛜ',
  othala: 'ᛟ',
  dagaz: 'ᛞ'
}

const transcriptionTable = {
  f: elderFuthark.fehu,
  u: elderFuthark.uruz,
  þ: elderFuthark.thurisaz,
  a: elderFuthark.ansuz,
  r: elderFuthark.raido,
  k: elderFuthark.kaunan,
  c: elderFuthark.kaunan,
  g: elderFuthark.gebo,
  w: elderFuthark.wunjo,
  h: elderFuthark.hagalaz,
  n: elderFuthark.naudiz,
  i: elderFuthark.isaz,
  j: elderFuthark.jera,
  y: elderFuthark.jera,
  æ: elderFuthark.eihwaz,
  ï: elderFuthark.eihwaz,
  p: elderFuthark.perth,
  z: elderFuthark.algiz,
  s: elderFuthark.sowilo,
  t: elderFuthark.tiwaz,
  b: elderFuthark.berkanan,
  e: elderFuthark.ehwaz,
  m: elderFuthark.mannaz,
  l: elderFuthark.laguz,
  ŋ: elderFuthark.ingwaz,
  o: elderFuthark.othala,
  d: elderFuthark.dagaz,
  v: elderFuthark.fehu,
  ð: elderFuthark.thurisaz,
  x: elderFuthark.kaunan + elderFuthark.sowilo,
  ch: elderFuthark.gebo,
  ij: elderFuthark.ehwaz,
  cc: elderFuthark.kaunan + elderFuthark.sowilo,
  th: elderFuthark.thurisaz,
  eau: elderFuthark.othala,
  chr: elderFuthark.hagalaz + elderFuthark.raido,
  ing: elderFuthark.ingwaz,
  chl: elderFuthark.hagalaz + elderFuthark.laguz,
  ng: elderFuthark.ingwaz,
  chj: elderFuthark.hagalaz + elderFuthark.jera,
  nk: elderFuthark.ingwaz + elderFuthark.kaunan,
  chw: elderFuthark.hagalaz + elderFuthark.wunjo,
  ei: elderFuthark.sowilo,
  ø: elderFuthark.othala + elderFuthark.ehwaz,
  å: elderFuthark.ansuz + elderFuthark.ansuz,
  q: elderFuthark.kaunan,
  punctuation: { single: '᛫', double: '᛬', cross: '᛭' } // punctuation variants
}

function transcribeLetter(string) {
  let rune = has(transcriptionTable, string) ? transcriptionTable[string] : null
  if (isNil(rune)) {
    return isNaN(toNumber(string)) ? string : ''
  }
  return rune || ''
}

function transcribeLetterCombinations(string) {
  let combinations = keys(transcriptionTable)
    .filter(key => key.length !== 1 && isString(transcriptionTable[key]))
    .sort((a, b) => b.length - a.length)
  return combinations.reduce((str, key) => str = replace(str, key, transcribeLetter(key)), toLower(clone(string)))
}

function transcribe(string, userSettings) {
  const settings = assign({}, defaultSettings, userSettings)
  return transcribeLetterCombinations(string).split('')
    .reduce((convertedString, letter) => {
      let rune
      switch (letter) {
        case '.': {
          rune = has(transcriptionTable.punctuation, settings.punctuation) ?
            transcriptionTable.punctuation[settings.punctuation] :
            transcriptionTable.punctuation[defaultSettings.punctuation]
          break
        }
        case ' ': {
          rune = settings.spacing === 'normal' ? ' ' :
            has(transcriptionTable.punctuation, settings.spacing) ? transcriptionTable.punctuation[settings.spacing] : ' '
          break
        }
        default: {
          rune = transcribeLetter(letter)
        }
      }
      return convertedString += rune
    }, new String)
}

export { transcribeLetter, transcribeLetterCombinations, transcribe, elderFuthark, transcriptionTable }
export default transcribe