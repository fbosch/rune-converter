import { SPACING, PUNCTUATION } from './enums'
import transcriptionTable from './transcription-table'

const defaultSettings = {
  punctuation: PUNCTUATION.CROSS,
  spacing: PUNCTUATION.DOUBLE
}

function transcribeLetter(letter) {
  let rune = transcriptionTable.hasOwnProperty(letter) ? transcriptionTable[letter] : null
  if (!rune) {
    return isNaN(parseInt(letter)) ? letter : ''
  }
  return rune || ''
}

function transcribeLetterCombinations(letters) {
  let combinations = Object.keys(transcriptionTable)
    .filter(key => key.length !== 1 && typeof transcriptionTable[key] === 'string')
    .sort((a, b) => b.length - a.length)
  return combinations.reduce((str, key) => str = str.replace(key, transcribeLetter(key)), letters.toLowerCase())
}

const runeReducer = settings => (convertedString, letter) => {
  let rune
  switch (letter) {
    case '.': {
      rune = transcriptionTable.punctuation.hasOwnProperty(settings.punctuation)
        ? transcriptionTable.punctuation[settings.punctuation]
        : transcriptionTable.punctuation[defaultSettings.punctuation]
      break
    }
    case ' ': {
      rune = ' '
      if (settings.spacing !== SPACING.NORMAL && transcriptionTable.punctuation.hasOwnProperty(settings.spacing)) {
        rune = transcriptionTable.punctuation[settings.spacing]
      }
      break
    }
    default: {
      rune = transcribeLetter(letter)
    }
  }
  return convertedString += rune
}

function transcribe(string, userSettings) {
  const settings = Object.assign({}, defaultSettings, userSettings)
  return transcribeLetterCombinations(string).split('')
    .reduce(runeReducer(settings), new String)
}

export { transcribe, transcribeLetter, transcribeLetterCombinations }
export default transcribe
