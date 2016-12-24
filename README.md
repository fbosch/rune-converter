# rune-converter


a small node package for converting text to the runic alphabet


# Installation
``` node
npm install rune-converter
```

# Usage
``` javascript

  import runeConverter from 'rune-converter'

```
# Methods

## toRunic(str, options)
`toRunic()` is the main method to convert a given string to runic.

### Arguments 
* **str** (String) - the string you wish to convert
* **options** (Object) - options that determine the conversion of the string
    * **punctuation**  - determines what symbol to transcribe ' . ' to
      key | value
      ---- | -----
      cross **(default)** | ᛭
      double | ᛬
      single | ᛫
    * **spacing** - determines what symbol to transcribe spacing to
      key | value 
      --- | -----
      normal | `whitespace`
       cross | ᛭
      double **(default)** | ᛬
      single | ᛫

### Examples
``` javascript
  var str = 'Lorem ipsum dolor sit amet.'

  runeConverter.toRunic(str) // ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛭

  runeConverter.toRunic(str, { punctuation: 'single' }) // ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛫

  runeConverter.toRunic(str, { spacing: 'normal' }) // ᛚᛟᚱᛖᛗ ᛁᛈᛋᚢᛗ ᛞᛟᛚᛟᚱ ᛋᛁᛏ ᚨᛗᛖᛏ᛭
```

## transcribe(str, variantIndex)

`transcribe()` is used to transcribe single letters (or certain combinations) into their corrosponding rune(s)


### Arguments
* **str** (String) - the letter(s) to transcribe to elder futhark
* **variantIndex** (Number) - an optional parameter to specify a certain variant of a rune (if there's more than one)

### Examples

``` javascript
runeConverter.transcribe('h') // ᚺ
// variantIndex
runeConverter.transcribe('h', 1) // ᚻ

// multiple runes returned for single letter
runeConverter.transcribe('x') // ᚲᛋ

// letter combinations to single rune
runeConverter.transcribe('eau') // ᛟ
````

## transcribeLetterCombinations(str) 

`transcribeLetterCombinations()` is used to transcribe certain combinations of letters to runic. 

This method will **not** convert the entire string to runic, it will only replace all multi-letter combinations with their corrosponding rune(s).

### Arguments
* **str** (String) - the string to replace letter combinations into

### Examples
``` javascript 
runeConverter.transcribeLetterCombinations('eat the food Tina!') // ᛠt ᚦe food Tina!
``` 
