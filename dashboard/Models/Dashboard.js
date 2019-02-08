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

//set up initial structure
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
/**
 * Function that adds a app to the view
 * @param {object} appNode { 
 *   title: <string> the title of the app @required
 *   src: <string> the src for the icon @required
 *   hoverSrc: <string> the src for the hover icon @required
 *   url: <string> the url redirect on the click @required
 *   id: <string> te id of the app for custom styling @optional
 * }
 */
function addApp( appNode ){
  // add the app container
  let app = screen.addChildToParentId( "div", appNode.id, "app", 
                                       "", "app_wrapper" );
  let link = screen.addChildToParentNode( "a", null, null, "", app );
  link.setAttribute( "target", "_self" );
  link.setAttribute( "href", appNode.url );
  // add a button and set attributes
  let button = screen.addChildToParentNode( 
                  "input", appNode.id, 
                  null, "", link );
  let label = screen.addChildToParentNode( 
                "p", null, null, 
                appNode.title, app );
  button.type = "image";
  button.src = appNode.src;
  // handle hovering effect
  button.onmouseover = hoverApp;
  button.onmouseout = unHoverApp;

  // change image on hover
  function hoverApp( ){
    button.setAttribute( "src", appNode.hoverSrc );
  }
  function unHoverApp( ){
    button.setAttribute( "src", appNode.src );
  }
}

/**
 * Add the apps
 */

// add the planner app
addApp({
  title: "Planner",
  src: "assets/plannerIcon.png",
  hoverSrc: "assets/plannerHoverIcon.png",
  url: "../planner.html",
  id: "planner"
});

// add the simulations app
addApp({
  title: "Simulations",
  src: "assets/simulationIcon.png",
  hoverSrc: "assets/simulationHoverIcon.png",
  url: "../sims.html",
  id: "simulations"
});

// add the calculator app
addApp({
  title: "Calculator",
  src: "assets/calculatorIcon.png",
  hoverSrc: "assets/calculatorHoverIcon.png",
  url: "../calculator.html",
  id: "calculator"
});





