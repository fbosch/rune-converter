# rune-converter

a small node package for converting text to the runic alphabet

## Installation
`npm install rune-converter`

## Usage
``` javascript

  import { transcribe, transcribeSingleLetter, transcribeLetterCombinations } from 'rune-converter'

```
## Functions

### transcribe(str, options)
`transcribe()` is the default function to convert a given string to elder futhark.

#### Arguments 
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

#### Examples
``` javascript
  var str = 'Lorem ipsum dolor sit amet.'

  transcribe(str) // ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛭

  transcribe(str, { punctuation: 'single' }) // ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛫

  transcribe(str, { spacing: 'normal' }) // ᛚᛟᚱᛖᛗ ᛁᛈᛋᚢᛗ ᛞᛟᛚᛟᚱ ᛋᛁᛏ ᚨᛗᛖᛏ᛭
```

### transcribeSingleLetter(str, variantIndex)

`transcribeSingleLetter()` is used to transcribe single letters into their corrosponding rune(s)

#### Arguments
* **str** (String) - the letter(s) to transcribe to elder futhark

#### Examples

``` javascript
transcribe('h') // ᚺ

// multiple runes returned for single letter
transcribe('x') // ᚲᛋ

// letter combinations to single rune
transcribe('eau') // ᛟ
````

### transcribeLetterCombinations(str) 

`transcribeLetterCombinations()` is used to transcribe certain combinations of letters to runic. 

This function will **not** convert the entire string to runic, it will only replace all multi-letter combinations with their corrosponding rune(s).

#### Arguments
* **str** (String) - the string to replace letter combinations into

#### Examples
``` javascript 
transcribeLetterCombinations('Chris Chan') // ᚺᚱis ᚷan
``` 
