/*  js: module
  * appendDiv.js
  * learning app
  * Created by Brandon Li on 1/11/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */
'use strict';

// import Solver from "./../calculatorCore/solver.js";
// var solver = new Solver();
/* //uncomment to test
   import SolverTest from "./../calculatorCore/solverTest.js";
   var solverTest = new SolverTest();
   solverTest.test(); 
 */

 
// import Solver from ".././calculatorCore/solver.js"
// var solver = new Solver();
import Screen from "./../../dashboard/dashboardCore/screen.js";
var screen = new Screen();
import Button from "../calculatorCore/button.js";
import ButtonList from "../calculatorCore/buttonList.js";
var buttonList = new ButtonList();
// set up initial structure
screen.addDivToParentType( "div", "calculator_wrapper", "", "", "body" );

// add the return-to-dashboard button
addReturnButton( "./assets/reset.png", "../dashboard.html", "./assets/resetHover.png" )

function addReturnButton( src, url , hoverSrc){
    //add the app container
    let button = screen.addChildToParentId( "div", "backToDashboardButton", "", "", "calculator_wrapper" );
        
    //add a button and set attributes
    let image = screen.addDivToNode( "img", "", "backToDashboard", "", button );
    image.setAttribute( "src", src );
    //add functions
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

// add the wrapper to the calculator
screen.addChildToParentId( "div", "calculator", "", "", "calculator_wrapper" );

// add the input textfield
var row = screen.addChildToParentId( "div", "", "c_row", "", "calculator" );
let input = screen.addDivToNode( "input", "input", "", "", row );
input.type = "text";

// define result text
var text = "";

// add the buttons for the calculator

var handleButtonPressed = function(){
  console.log("herer");
}
// define buttons
var buttons = buttonList.buttons;
// add wrapper to calculator

for ( var i = 0; i < buttons.length; i++ ){
  var row = screen.addChildToParentId( "div", "", "c_row", "", "calculator" );
  for (var j = 0; j < buttons[i].length; j++){
    addCalculatorButton( row, buttons[i][j] );
  }

  // for (var btn in buttons[i]){
  //   console.log(btn)
  //   addCalculatorButton(row, btn, buttons[i][btn][0], buttons[i][btn][2]);
  // }

}
function addCalculatorButton( row, buttonNode ){  
  //add the button 
  let button = screen.addDivToNode( "div", buttonNode.text, buttonNode.type, "", row );   
  //add the label
  let text = screen.addDivToNode( "p", "", "button_text", buttonNode.text, button );
  button.onclick = function() { buttonNode.handlePressed() };
}


// console.log("e" === "ℯ")
// var handleButtonPressed = function(id){
//   console.log("normal");
//   text += id;
//   document.getElementById('input').value = text;
//   console.log(document.getElementById('input').value); 
// }
