/**
 * Learning App
 * calculator.js
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
import Screen from "./../../dashboard/dashboardCore/screen.js";
import Button from "../calculatorCore/button.js";
import ButtonList from "../calculatorCore/buttonList.js";
// modules
var screen = new Screen();
var buttonList = new ButtonList();


// set up initial wrapper
screen.addChildToParentType( "div", "calculator_wrapper", null, "", "body" );

/**
 * add the button that brings you back to the dashboard
 */
addReturnButton( "./assets/reset.png", "../dashboard.html", "./assets/resetHover.png" )
function addReturnButton( src, url , hoverSrc ){
  // add the div to the wrapper
  let button = screen.addChildToParentId( "div", "backToDashboardButton", null, "", "calculator_wrapper" );
  // add the image to the button node
  let image = screen.addChildToParentNode( "img", null, "backToDashboard", "", button );
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
screen.addChildToParentId( "div", "calculator", null, "", "calculator_wrapper" );

// add the input textfield
var row = screen.addChildToParentId( "div", null, "c_row", "", "calculator" );
var input = screen.addChildToParentNode( "input", "input", null, "", row );
input.type = "text";

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
  for (var j = 0; j < buttons[i].length; j++){
    addCalculatorButton( row, buttons[i][j] );
  }
}
function addCalculatorButton( row, buttonNode ){  
  //add the button 
  let button = screen.addChildToParentNode( "div", buttonNode.text, buttonNode.type, "", row );   
  //add the label
  let text = screen.addChildToParentNode( "p", null, "button_text", buttonNode.text, button );
  button.onclick = function() { buttonNode.handlePressed() };
}
