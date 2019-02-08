/**
 * Learning App
 * help.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/20/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Script for /calculator.html
 *
 * ## Functionality:
 *  - display the help gape
 */
'use strict';
// import modules
import ScreenView from "./../ScreenView/ScreenView.js";
var screen = new ScreenView();

// set up initial wrapper
screen.addChildToParentType( "div", "calculator_wrapper", null, "", "body" );
/**
 * add the button that brings you back to the dashboard
 */
addReturnButton( "./assets/reset.png", 
                 "../calculator.html", 
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

// load the footer items
var footer = [ "2019© By Brandon Li", 
               "brandon.li820@icloud.com", 
               "303-717-1568" 
             ];
for ( var i = 0; i < footer.length; i++ ){
  screen.addChildToParentId( "p",  null, null, footer[ i ], "content" );
}
