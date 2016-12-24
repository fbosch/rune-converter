import assert from 'assert'
import _ from 'lodash'
import runeConverter from '../lib'

describe('rune-converter', function () {
  it('should return the correct rune corrosponding to the given letter or combination of letters', () => {
    assert(runeConverter.transcribe('a') === 'ᚨ', 'returns rune if it exists')
    assert(runeConverter.transcribe(1) === '', 'returns empty string if the input is a number')
    assert(runeConverter.transcribe('å') === 'å', 'returns the given letter if there\'s no corrosponding rune')
    assert(runeConverter.transcribe('eau') === 'ᛟ', 'is able to convert multiple letters to a single rune')
    assert(runeConverter.transcribe('x') === 'ᚲᛋ', 'is able to convert single letter to multiple runes')
  })

  it('should convert letter combinations into the proper rune(s)', () => {
    let longestFirstTestString = 'chris chan',
        longestFirstTestStringReplaced = 'ᚺᚱis ᚷan'
    assert(runeConverter.transcribeLetterCombinations(longestFirstTestString) === longestFirstTestStringReplaced, 'should longest letter combinations first')
  })

  it('should convert a string of text to futhark', () => {
    let testString = 'Lorem ipsum dolor sit amet.',
      defaultResultString = 'ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛭',
      singlePunctuationResultString = 'ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛫',
      normalSpacingResultString = 'ᛚᛟᚱᛖᛗ ᛁᛈᛋᚢᛗ ᛞᛟᛚᛟᚱ ᛋᛁᛏ ᚨᛗᛖᛏ᛭'

    assert(runeConverter.toRunic(testString) === defaultResultString, 'returns converted string')

    assert(runeConverter.toRunic(testString,
      { punctuation: 'single' }) === singlePunctuationResultString, 'punctuation is changable')

    assert(runeConverter.toRunic(testString,
      { spacing: 'normal' }) === normalSpacingResultString, 'spacing can be set to normal')

    assert(runeConverter.toRunic(testString,
      { punctuation: 'invalid', spacing: 'invalid' } === defaultResultString), 'should return string with default settings if invalid options have been passed')
  })
})

