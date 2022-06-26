# #Calc, (HashtagCalc)

## A Calculator

  -  Basic mode
    - will be Default Mode *(only mode for now =)*
    - 1 line display, to show input of numbers
    - buttons and operation
      - AC/AC      : all clear or clear
      - *, /, + - : basic math: multiply, divide, add, subtract
      - %         : convert or work with percentages
      - -/+       : converting to a negative or positive number
      - .         : decimal, for entering a number with a decimal
      - =         : equals, or sum, of current math operations

  - All Clear and Clear 
    - AC and C functions, works as standard calculator    
      - no backspace key, not ready for large UI changes

  - Coming Features
    - a backspace key
    - a show tape feature, a history of math operations
    - more modes with advanced calculator layout

  - MIT License

## Current Version 2.0a

### Milestone

  - all basic mode features, unit tested successfully
  - basic math operations give correct answers

  - javascript custom debug feature
    - manually enable in browser javascript console
    - wrapped console.log, but preserving line number
    ```
    console.log.bind(window.console)  
    ```
    - [click here for notes from stackoverflow.com](https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number)

### TODO

  - current bug
    - multiple math ops
      - when to use opValue2
    - posNeg math ops
      - when to use opValue
      - apply mathOp to correct numbers entered

  - debugger
    - error logging and error handling
  - tape
    - history of input and math results

  - for release
    - improve logic for tracking input, calculations
    - port to react or bootstrap

  - UI features
    - a menu
      - a "show tape" button in the menu
      - actually displaying the tape
    - a backspace key,
      - preferably within current UI

  - backend ops
    - new build environment
    - considering a CMS
