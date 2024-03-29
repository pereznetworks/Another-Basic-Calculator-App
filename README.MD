# #Calc, (HashtagCalc)  


## a Calculator app   

<table border="0">
 <tr>
    <td style="font-size:30px; text-align:center;" colspan="2">#Calc Version 2.0a</td>
 </tr>
 <tr>
    <td> basic math </td>
    <td rowspan="5" > <image src="./images/20a-screenshot.jpg"> </td>
 </tr>
 <tr>
    <td> standard display </td>
 </tr>
 <tr>
    <td> real calculator UX feel </td>
 </tr>
 <tr>
    <td> MIT license </td>
 </tr>
 <tr>
    <td> <a class="link" href="https://pereznetworks.github.io/Another-Basic-Calculator-App/">try #Calc 2.0a</a></td>
 </tr>
</table>



## version 2.0a

  - Milestone :

    - got the app working, to a reasonable degree

      - but, does currently have a few bugs

## version 2.1a

  - Goal :

    - implement new app data model

    - simplify and create better app logic

    - finish all-clear/clear functionality

    - setup basis for additional features

## version 3.0a

  - Goal : implement at least 2 "coming features"

## Coming Features

  - complete All Clear and Clear (currently has bugs)

    - AC and C functions, to work as standard calculator    

    - a "novel" backspace key
      - when entering numbers, AC becomes backspace key
      - as all of current entry backspaced
      - then backspace turns into C,
      - turn into AC when no current entered-values to clear,

  - logging feature
    - internal storage of app status and values
    - if debug enabled, error codes generated and stored
    - "send to support" feature

  - Standard Memory functions
    - M+, M-, Mr, Mc 

  - show math feature
    - when enabled, and entering "3" "+" "3" "="
      - middle display line to show:                3 + 3
    - when pressing =, bottom line to show :          6
      - on 2nd calc, another number with 3rd operator
        - top display line to show                   3 + 3
        - middle display line to show:               6 * 3
        - when pressing =, bottom line to show :        18

  - a show tape feature, a history of math operations
    - a complete separate window, or tab
    - history of math and results
    - uses available browser functionality
      - like "send to" or "share", to print, msg or email

  - more modes with advanced calculator layouts

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

  - fix things that work intermittently
    - clear
    - multiple math ops

  - better data model and app logic

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
