/**
 * Learning App
 * dashboard.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/1a/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - add apps
 */
'use strict';

// modules
import ScreenView from "../../ScreenView/ScreenView.js";
var screen = new ScreenView();

//set up initial structre
screen.addChildToParentType( "div", "main_wrapper", null, "", "body" );
screen.addChildToParentId( "div", "app_wrapper", null, "", "main_wrapper" );

// load the footer items
var footer = [ "2019© By Brandon Li", 
               "brandon.li820@icloud.com", 
               "303-717-1568" 
             ];
for ( var i = 0; i < footer.length; i++ ){
  screen.addChildToParentId( "p",  null, null, footer[ i ], "content" );
}
// define apps
var Planner = {
  title: "Planner",
  src: "assets/plannerIcon.png",
  hover: "assets/plannerHoverIcon.png",
  url: "../planner.html"
};
var Simulations = {
  title: "Simulations",
  src: "assets/simulationIcon.png",
  hover: "assets/simulationHoverIcon.png",
  url: "google.com"
};
var Calculator = {
  title: "Calculator",
  src: "assets/calculatorIcon.png",
  hover: "assets/calculatorHoverIcon.png",
  url: "../calculator.html",
};
var apps = {
  "Planner": Planner,
  "Simulations": Simulations,
  "Calculator": Calculator,
} ;
// add each app to the screen
var appsList = Object.keys( apps );
for ( var i = 0 ; i < appsList.length; i ++ ){
  let app = apps[ appsList[ i ] ];
  addApp( app.title, app.src, app.url )
}

function addApp( title, src, url ){
    // add the app container
    let app = screen.addChildToParentId( "div", title, "app", 
                                         "", "app_wrapper" );
    let link = screen.addChildToParentNode( "a", null, null, "", app );
    link.setAttribute( "target", "_self" );
    link.setAttribute( "href", url );
    // add a button and set attributes
    let button = screen.addChildToParentNode( "input", title, null, "", link );
    let label = screen.addChildToParentNode( "p", null, null, title, app );
    button.type = "image";
    button.src = src;
    // handle hovering effect
    button.onmouseover = function() { hoverApp( this ) };
    button.onmouseout = function() { unHoverApp( this ) };
}

// change image on hover
var hoverApp = function( element ){
  let obj = apps[ element.id ];
  if ( obj ){
  element.setAttribute( "src", obj.hover );
  }
}
// change back when unhovering
var unHoverApp = function( element ){
  let obj = apps[ element.id ];
  if ( obj ) {
    element.setAttribute( "src", obj.src );
  }
}

