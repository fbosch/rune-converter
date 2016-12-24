import assert from 'assert'
import _ from 'lodash'
import runeConverter from '../lib'

describe('rune-converter', function () {
  it('should return the correct rune corrosponding to the given letter or combination of letters', () => {
    assert(runeConverter.getRune('a') === 'ᚨ', 'returns rune if it exists')
    assert(runeConverter.getRune(1) === '', 'returns empty string if the input is a number')
    assert(runeConverter.getRune('å') === 'å', 'returns the given letter if there\'s no corrosponding rune')
    assert(runeConverter.getRune('eau') === 'ᛟ', 'is able to convert multiple letters to a single rune')
    assert(runeConverter.getRune('x') === 'ᚲᛋ', 'is able to convert single letter to multiple runes')
  })

  it('should convert letter combinations into the proper rune(s)', () => {
    let longestFirstTestString = 'chris chan',
        longestFirstTestStringReplaced = 'ᚺᚱis ᚷan'
    assert(runeConverter.replaceLetterCombinations(longestFirstTestString) === longestFirstTestStringReplaced, 'should longest letter combinations first')
  })

  it('should convert a string of text to futhark', () => {
    let testString = 'Lorem ipsum dolor sit amet.',
      defaultResultString = 'ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛭',
      singlePunctuationResultString = 'ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛫',
      normalSpacingResultString = 'ᛚᛟᚱᛖᛗ ᛁᛈᛋᚢᛗ ᛞᛟᛚᛟᚱ ᛋᛁᛏ ᚨᛗᛖᛏ᛭'

    assert(runeConverter.convert(testString) === defaultResultString, 'returns converted string')

    assert(runeConverter.convert(testString,
      { punctuation: 'single' }) === singlePunctuationResultString, 'punctuation is changable')

    assert(runeConverter.convert(testString,
      { spacing: 'normal' }) === normalSpacingResultString, 'spacing can be set to normal')

    assert(runeConverter.convert(testString,
      { punctuation: 'invalid', spacing: 'invalid' } === defaultResultString), 'should return string with default settings if invalid options have been passed')
  })
})

