/**
 * Learning App
 * CalculatorController.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/17/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Script for /calculator.html
 *
 * ## Functionality:
 *  - add all button on the screen
 *  - handle buttons pressed and calculator functionality
 */
'use strict';

// import modules
import ScreenView from "./../../ScreenView/ScreenView.js";
import Buttons from "../Models/Button.js";
import ButtonList from "../Models/ButtonList.js";
// modules
var screen = new ScreenView();
var buttonList = new ButtonList();

/* // Uncomment to test. Results in the console
import SolverTest from "../Models/SolverTest.js"
var solverTest = new SolverTest();
solverTest.test()
*/

// set up initial wrapper
screen.addChildToParentType( "div", "calculator_wrapper", null, "", "body" );

/**
 * add the button that brings you back to the dashboard
 */
addReturnButton( "./assets/reset.png", 
                 "../dashboard.html", 
                 "./assets/resetHover.png" )
function addReturnButton( src, url , hoverSrc ){
  // add the div to the wrapper
  let button = screen.addChildToParentId( "div", 
                                          "backToDashboardButton", 
                                          null,
                                          "", 
                                          "calculator_wrapper" );
  // add the image to the button node
  let image = screen.addChildToParentNode( "img", 
                                            null, 
                                            "backToDashboard", 
                                            "", 
                                            button );
  image.setAttribute( "src", src );
  // handle user input
  image.onmouseover = function() { 
    image.setAttribute( "src", hoverSrc );
  };
  image.onmouseout = function() { 
    image.setAttribute( "src", src );
  };
  image.onclick = function() { 
    window.open(url, '_self');
  };
}

// add a wrapper for the calculator
screen.addChildToParentId( "div", 
                           "calculator", 
                           null, 
                           "", 
                           "calculator_wrapper" );

// add the input textfield
var row = screen.addChildToParentId( "div", null, "c_row", "", "calculator" );
var input = screen.addChildToParentNode( "input", "input", null, "", row );
input.type = "text";
input.focus();

/**
 * define buttons list - a list in the module ButtonList that is a 
 * list of buttons with their attributes respectively (text, type)
 */
var buttons = buttonList.buttons;

/**
 * loop through each element of buttons -> a row
 * loop through each button in the row and add it to the screen
 */
for ( var i = 0; i < buttons.length; i++ ){
  var row = screen.addChildToParentId( "div", null, "c_row", "", "calculator" );
  for (var j = 0; j < buttons[ i ].length; j++){
    addCalculatorButton( row, buttons[ i ][ j ] );
  }
}
function addCalculatorButton( row, buttonNode ){  
  //add the button 
  let button = screen.addChildToParentNode( "div", 
                                            buttonNode.text, 
                                            buttonNode.type, 
                                            "", 
                                            row );   
  //add the label
  let text = screen.addChildToParentNode( "p", 
                                          null, 
                                          "button_text", 
                                          buttonNode.text, 
                                          button );
  button.onclick = function() { handlePressed( buttonNode ) };
}
/**
 * uses the button model to update the view
 */
function handlePressed( buttonNode ){
  if ( buttonNode ){ // buttonNode has to exist
    var str = input.value;
    let carrot = input.selectionStart;
    let values = buttonNode.handlePressed( str, carrot );
    input.value = values.newString;
    input.setSelectionRange( values.newCarrot, values.newCarrot );
    input.focus();
  }  
}

/**
 * function that takes in a text value and returns the buttonNode
 * @param {text} - the text of the button
 * @return {buttonNode} - the buttonNode that contains the text
 */
function getButtonNode( text ){
  for ( var i = 0; i < buttons.length; i++ ){
    var row = buttons[ i ];
    for ( var j = 0; j < row.length; j++ ){
      if ( row[ j ].text === text ){
        return row[ j ];
      }
    }
  }
}
/**
 * add keyboard shortcuts
 */
input.addEventListener( "keydown", event => {
  // defualts
  if ( event.key === "Backspace" ) return; 
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
      handlePressed( getButtonNode( "arcsin(" ) );
  else if ( event.ctrlKey && event.key == "c" ) 
      handlePressed( getButtonNode( "arccos(" ) );
  else if ( event.ctrlKey && event.key == "t" ) 
      handlePressed( getButtonNode( "arctan(" ) );
  // trig
  else if ( event.key === "s" ) handlePressed( getButtonNode( "sin(" ) );
  else if ( event.key === "t" ) handlePressed( getButtonNode( "tan(" ) );
  else if ( event.key === "c" ) handlePressed( getButtonNode( "cos(" ) );
  // clear
  else if ( event.key == "r" ) handlePressed( getButtonNode( "C" ) );
  // handle the rest
  else handlePressed( getButtonNode( event.key ) );
  event.preventDefault( );
} );

