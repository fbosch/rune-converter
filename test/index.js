import assert from 'assert';
import _ from 'lodash';
import runeConverter from '../lib';

describe('rune-converter', function () {
  it('should return the correct rune corrosponding to the given letter or return an empty string', function () {
    assert(_.isEqual(runeConverter.getRune('a'), 'ᚨ'), 'returns rune if it exists');
    assert(_.isEqual(runeConverter.getRune('longstring'), ''), 'returns empty string if the input is more than a single letter');
    assert(_.isEqual(runeConverter.getRune(1), ''), 'returns empty string if the input is a number');
    assert(_.isEqual(runeConverter.getRune('å'), ''), 'returns an empty string if there is no corrosponding rune to the given letter');
  });
  it('should convert a string of text to futhark', function () {
    assert(_.isEqual(runeConverter.convert('test .'), 'ᛏᛖᛋᛏ ᛫'), 'returns converted string');
    assert(_.isEqual(runeConverter.convert('test.', {punctation: 'cross'}), 'ᛏᛖᛋᛏ᛭'), 'cross punctation converts dots into runic crosses');
    assert(_.isEqual(runeConverter.convert('test.', {punctation: 'double'}), 'ᛏᛖᛋᛏ᛬'), 'double punctation converts dots into double dots');
  });
});

