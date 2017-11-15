import assert from 'assert'
import { transcribeLetter, transcribeLetterCombinations, transcribe } from '../lib'
import { PUNCTUATION, SPACING } from '../lib/enums'


describe('rune-converter', function () {
  it('should return the correct rune corrosponding to the given letter or combination of letters', () => {
    assert(transcribeLetter('a') === 'ᚨ', 'returns corrosponding rune if it exists')
    assert(transcribeLetter(1) === '', 'returns empty string if the input is a number')
    assert(transcribeLetter('+') === '+', 'returns empty string if there\'s no corrosponding rune to the given letter')
    assert(transcribeLetter('eau') === 'ᛟ', 'is able to convert multiple letters to a single rune')
    assert(transcribeLetter('x') === 'ᚲᛋ', 'is able to convert single letter to multiple runes')
  })

  it('should convert letter combinations into the proper rune(s)', () => {
    const longestFirstTestString = 'chris chan'
    const longestFirstTestStringReplaced = 'ᚺᚱis ᚷan'
    assert(transcribeLetterCombinations(longestFirstTestString) === longestFirstTestStringReplaced, 'should longest letter combinations first')
  })

  it('should convert a string of text to futhark', () => {
    const testString = 'Lorem ipsum dolor sit amet.'
    const defaultResultString = 'ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛭'
    const singlePunctuationResultString = 'ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛫'
    const normalSpacingResultString = 'ᛚᛟᚱᛖᛗ ᛁᛈᛋᚢᛗ ᛞᛟᛚᛟᚱ ᛋᛁᛏ ᚨᛗᛖᛏ᛭'

    assert(transcribe(testString) === defaultResultString, 'returns converted string')

    assert(transcribe(testString,
      { punctuation: PUNCTUATION.SINGLE }) === singlePunctuationResultString, 'punctuation is changable')

    assert(transcribe(testString,
      { spacing: SPACING.NORMAL }) === normalSpacingResultString, 'spacing can be set to normal')

    assert(transcribe(testString,
      { punctuation: 'invalid', spacing: 'invalid' } === defaultResultString), 'should return string with default settings if invalid options have been passed')
  })
})

