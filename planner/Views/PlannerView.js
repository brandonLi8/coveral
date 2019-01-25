/**
 * Learning App
 * Planner.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/22/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Script for /calculator.html
 *
 * ## Functionality:
 *  - display the view for the planner
 *  - create the instance for the controller
 *  - create input listeners to the controller
 */

// import modules
import ScreenView from "./../../ScreenView/ScreenView.js";
// modules
var screen = new ScreenView();

/**
 * add the header and all of its children
 */
addHeader() 
function addHeader(){
  // screen.addChildToParentType( "div", "header", null, "", "body" );
  screen.addChildToParentId( "div", "left", null, "", "header");
  addPlannerIcon();
  function addPlannerIcon() {
    // add the div to the wrapper
    let conatiner = screen.addChildToParentId( 
                      "div", "header_content", 
                      null, "", "left" 
                    )
    // add the image to the container
    let image = screen.addChildToParentNode( 
                  "img", "backToDashboard", 
                  null, "", conatiner
                );
    image.setAttribute( "src", "./assets/plannerTBackground.png" );
    // handle user input
    image.onmouseover = function() { 
      image.setAttribute( "src", "./assets/plannerTBackgroundHover.png" );
    };
    image.onmouseout = function() { 
      image.setAttribute( "src", "./assets/plannerTBackground.png" );
    };
  }
  let backToDashboard = screen.addChildToParentId( 
                          "div", "header_content", 
                          null, "Back To Dashboard", "left" 
  );
  backToDashboard.onclick = function(){
    window.open( "../dashboard.html", "_self" ) 
  }
  backToDashboard.style.border = "none";

  let help = screen.addChildToParentId( 
              "div", "header_content", 
              null, "Help", "left"
  );
  help.onclick = function(){
    window.open( "./help.html", "_self" ) 
  }
  help.style.border = "none";
  let New = screen.addChildToParentId( 
                          "div", "header_content", 
                          null, "New", "left" 
  );
  New.onclick = function(){
    window.open( "../new.html", "_self" ) 
  }
  New.style.border = "none";
  screen.addChildToParentId( 
          "div", "header_content_right", 
          null, "Planner", "left"
  );

}



