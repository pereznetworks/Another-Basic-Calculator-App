# #Calc, (HashtagCalc)

## A Calculator

  -  Basic mode
    - Default Mode
    - only Basic Math is expected
    - 1 line display, to show input of numbers
    - buttons and operation
      - AC        : all clear
      - *, /, + - : basic math:
      - %         : convert or work with percentages
      - -/+       : converting to a negative or positive number
      - .         : decimal, for entering a number with a decimal: .
      - =         : get a total of 1 or series of math operations


  - Coming Features
    - a backspace key
    - a show tape feature, a history of math operations
    - more modes

## Current Version 2.0a

### Milestone

  - all basic mode features, unit tested successfully
  - basic math operations give correct answers

  - javascript custom debug feature
    - manually enable in browser javascript console
    - using .log, but preserving line number
    ```
    console.log.bind(window.console)  
    ```
    - [based on notes from stackoverflow.com](https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number)

### TODO

  - code finish
    - debugger
    - tape, history numbers entered, operators and totals

  -  code re-write
    - simplify logic for tracking calculations
    -  convert project for release
    -  finish built-in debug feature: log errors, error handling

  - UI features
    - a menu
      - show tape button in the menu
    - actually displaying the tape

  -  prep for release
    - new build environment
    - move to react or bootstrap
    - considering a CMS
