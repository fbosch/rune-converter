import assert from 'assert'
import _ from 'lodash'
import {transcribe, transcribeLetterCombinations, toRunic } from '../lib'

console.log(transcribe, transcribeLetterCombinations)

describe('rune-converter', function () {
  it('should return the correct rune corrosponding to the given letter or combination of letters', () => {
    assert(transcribe('a') === 'ᚨ', 'returns corrosponding rune if it exists')
    assert(transcribe(1) === '', 'returns empty string if the input is a number')
    assert(transcribe('+') === '+', 'returns empty string if there\'s no corrosponding rune to the given letter')
    assert(transcribe('eau') === 'ᛟ', 'is able to convert multiple letters to a single rune')
    assert(transcribe('x') === 'ᚲᛋ', 'is able to convert single letter to multiple runes')
  })

  it('should convert letter combinations into the proper rune(s)', () => {
    let longestFirstTestString = 'chris chan',
        longestFirstTestStringReplaced = 'ᚺᚱis ᚷan'
    assert(transcribeLetterCombinations(longestFirstTestString) === longestFirstTestStringReplaced, 'should longest letter combinations first')
  })

  it('should convert a string of text to futhark', () => {
    let testString = 'Lorem ipsum dolor sit amet.',
      defaultResultString = 'ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛭',
      singlePunctuationResultString = 'ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛫',
      normalSpacingResultString = 'ᛚᛟᚱᛖᛗ ᛁᛈᛋᚢᛗ ᛞᛟᛚᛟᚱ ᛋᛁᛏ ᚨᛗᛖᛏ᛭'

    assert(toRunic(testString) === defaultResultString, 'returns converted string')

    assert(toRunic(testString,
      { punctuation: 'single' }) === singlePunctuationResultString, 'punctuation is changable')

    assert(toRunic(testString,
      { spacing: 'normal' }) === normalSpacingResultString, 'spacing can be set to normal')

    assert(toRunic(testString,
      { punctuation: 'invalid', spacing: 'invalid' } === defaultResultString), 'should return string with default settings if invalid options have been passed')
  })
})

