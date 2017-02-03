# rune-converter

a small node package for converting text to the runic alphabet

## Installation
`npm install rune-converter`

## Usage
``` javascript

  import transcribe from 'rune-converter'

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