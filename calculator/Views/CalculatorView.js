/**
 * Learning App
 * CalculatorView.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/20/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Script for /calculator.html
 *
 * ## Functionality:
 *  - display the view for the calculator
 *  - create the instance for the controller
 *  - create input listeners to the controller
 */
'use strict';

// import modules
import ScreenView from "./../../ScreenView/ScreenView.js";
import ButtonList from "../Models/ButtonList.js";
import CalculatorController from "../Controllers/CalculatorController.js"
// modules
var buttonList = new ButtonList();
var screen = new ScreenView();
var controller = new CalculatorController();

// set up initial wrapper
screen.addChildToParentType( "div", "calculator_wrapper", null, "", "body" );

/**
 * add the button that brings you back to the dashboard
 */
addReturnButton( "./assets/reset.png", 
                 "../dashboard.html", 
                 "./assets/resetHover.png",
                 "back_to_dashboard_button" )
// add the help button
function addReturnButton( src, url , hoverSrc, id ){
  // add the div to the wrapper
  let button = screen.addChildToParentId( 
                "div", id, 
                null, "", "calculator_wrapper" 
              );
  // add the image to the button node
  let image = screen.addChildToParentNode( 
                "img", null, 
                "back_to_dashboard", "", button 
              );
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
screen.addChildToParentId( 
  "div", "calculator", null, 
  "", "calculator_wrapper" );
screen.addChildToParentId( 
        "div", "label", null, 
        "calculator" ,"calculator" );

// add a help link
let help = screen.createChild( "a", "helpLink", null, "help" )
help.href = "help.html";
help.setAttribute( "target", "_self" );
document.getElementById( "label" ).appendChild( help );

// add the input textfield
var row = screen.addChildToParentId( 
            "div", null, "c_row", 
            "", "calculator" );
var input = screen.addChildToParentNode( 
              "input", "input", 
              null, "", row );
// automatically focus on 
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
  var row = screen.addChildToParentId( 
              "div", null, "c_row", 
              "", "calculator" );
  for (var j = 0; j < buttons[ i ].length; j++){
    addCalculatorButton( row, buttons[ i ][ j ] );
  }
}
function addCalculatorButton( row, buttonNode ){  
  //add the button 
  let button = screen.addChildToParentNode( 
                 "div", buttonNode.text, 
                 buttonNode.type, "", row );   
  //add the label
  let text = screen.addChildToParentNode( 
               "p", null, "button_text", 
               buttonNode.text, button );
  button.onclick = function() { handleButtonPress( buttonNode, text ) };
}

/**
 * add listener's for user interaction
 */
input.addEventListener( "keydown", event => { 
  controller.handleInput( event, input ) 
} ); 

function handleButtonPress( buttonNode , text){
  controller.handlePressed( buttonNode , text ) 
}

