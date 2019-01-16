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

//set up initial structure
// screen.addDivToParentType( "div", "calculator_wrapper", "", "", "body" );

// //add the return-to-dashboard button
// addReturnButton( "./assets/reset.png", "../dashboard.html", "./assets/resetHover.png" )

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