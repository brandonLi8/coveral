/**
 * Learning App
 * CalculatorController.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/17/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - handle buttons pressed and calculator functionality
 */
'use strict';

/* // UNCOMMENT to TEST. Results in the console
import SolverTest from "../Models/SolverTest.js"
var solverTest = new SolverTest();
solverTest.test()
*/

// import modules
import ButtonList from "../Models/ButtonList.js";
// modules
var buttonList = new ButtonList();

// instance data
var buttons = buttonList.buttons;
var error = false;
var previousEntries = [];
var indexFromEnd = 0;
var round = 5;
var mode = "rad"
/**
 * function that takes in a text value and returns the buttonNode
 * @param {text} - the text of the button
 * @return {buttonNode} - the buttonNode that contains the text
 */ 
function getButtonNode( text ){
  for ( var i = 0; i < buttons.length; i++ ){
    var row = buttons[ i ];
    for ( var j = 0; j < row.length; j++ ){
      if ( row[ j ].text === text ) return row[ j ];
    }
  }
}
export default class CalculatorController{
  /**
   * Method when a button is pressed
   * @param {buttonNode} - the text of the button
   * @public
   */
  handlePressed( buttonNode , text ){
    if ( buttonNode && 
       ( buttonNode.text === "rad" || buttonNode.text === "deg" ) ){
      if ( mode === "rad" ) mode = "deg"
      else if ( mode === "deg" ) mode = "rad"
      text.innerHTML = mode;
      input.focus();
      return;
    }
    /**
     * for the entry button, display the last thing entered
     */
    if ( buttonNode && buttonNode.text === "entry" ){
      let last = previousEntries[ previousEntries.length - indexFromEnd  - 1 ];
      if ( last ){
        // set the new values
        input.value = last;
        input.setSelectionRange( last.length, last.length ); // update carret
        error = false;
        indexFromEnd ++; // next time get the one before that
      }
      input.focus();
      return;
    }
    /**
     * if we previously just entered in something that led to an error,
     * clear it
     */
    if ( error ){ // clear no matter what
      let values = getButtonNode( "C" ).handlePressed( "", 0, 0, "" ); 
      //simulate clear
      input.value = values.newString
      input.setSelectionRange( values.newCarrot, values.newCarrot );
      error = false;
    }
    if ( buttonNode && buttonNode.text === "rand" ){
      input.value = "" + Math.random();
      input.focus();
      return;
    }
    /**
     * on other buttons, we need to just press the button
     */
    if ( buttonNode ){ // buttonNode has to exist
      var str = input.value;
      if ( buttonNode.text === "=" ){
        // push what we entered
        if ( str.length !== 0 ){
          previousEntries.push( str )
          indexFromEnd = 0;
        }
        else return;
      }
      let carrot = input.selectionStart;
      let values = buttonNode.handlePressed( str, carrot , round, mode );
      if ( Number.isInteger( values ) ){
        round = values;
        input.value = "";
        input.focus();
        return;
      }
      if ( values.error ) error = true;
      input.value = values.newString;
      input.setSelectionRange( values.newCarrot, values.newCarrot );
      input.focus();
    }  
  }
  /**
   * Method for when user types in the input box
   * @param {event} - the triggered event
   * @param {input} - the input box node
   * @public
   */
  handleInput( event, input ){
    let handlePressed = this.handlePressed;
    // defualts
    if ( event.key === "Backspace" ) handlePressed( getButtonNode( "⌫" ) ); 
    else if ( event.keyCode <= 40 && event.keyCode >= 37 ) return; 
    // symbols pi and e
    else if ( event.key == "p" ) handlePressed( getButtonNode( "π" ) );
    else if ( event.key == "e" ) handlePressed( getButtonNode( "ℯ" ) );
    // enter shortcut
    else if ( event.key === "Enter" ) handlePressed( getButtonNode( "=" ) );
    // operator shortcuts
    else if ( event.key === "x" ) handlePressed( getButtonNode( "×" ) );
    else if ( event.key === "d" ) handlePressed( getButtonNode( "÷" ) );
    else if ( event.keyCode === 191 ) handlePressed( getButtonNode( "÷" ) ); 
    // check for inverse trig first
    else if ( event.ctrlKey && event.key == "s" ) 
        handlePressed( getButtonNode( "arcsin" ) );
    else if ( event.ctrlKey && event.key == "c" ) 
        handlePressed( getButtonNode( "arccos" ) );
    else if ( event.ctrlKey && event.key == "t" ) 
        handlePressed( getButtonNode( "arctan" ) );
    // trig
    else if ( event.key === "s" ) handlePressed( getButtonNode( "sin" ) );
    else if ( event.key === "t" ) handlePressed( getButtonNode( "tan" ) );
    else if ( event.key === "c" ) handlePressed( getButtonNode( "cos" ) );
    else if ( event.key === "q" ) handlePressed( getButtonNode( "√" ) );

    // clear
    else if ( event.key == "r" ) handlePressed( getButtonNode( "C" ) );
    // handle the rest
    else handlePressed( getButtonNode( event.key ) );
    event.preventDefault( );
  } 
}

