var exports = module.exports = {};
import _ from 'lodash';

var runeTable = {
    a: 'ᚨ'
};

exports.getRune = function (str) {
    if (str.length !== 1 || _.isNumber(str)) {
        return '';
    }
    let rune = runeTable[str];
    if (_.isUndefined(rune)) {
        rune = '';
    }
    return rune;
};

exports.convert = function (str) {
    let convertedString = '';
};
