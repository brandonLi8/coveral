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
 *
 */
'use strict';

// import modules
import ScreenView from "./../../ScreenView/ScreenView.js";
// modules
var screen = new ScreenView();

// add the planner wrapper
screen.addChildToParentType( "div", "planner_wrapper", null, "", "body" );

/**
 * add the header and all of its children
 */
addHeader() 
function addHeader(){
  screen.addChildToParentId( "div", "header", null, "", "planner_wrapper" );
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

// import modules
// import Heap from "../../Heap/Heap.js";
// import Node from "../../Heap/Node.js";
// import PlannerNode from "../Models/PlannerNode.js"
// // modules
// let child1 = new Node( new PlannerNode( 35 ), null, null) 
// let child2 = new Node( new PlannerNode( 33 ), null, null)
// let child3 = new Node( new PlannerNode( 42 ), null, null) 
// let child4 = new Node( new PlannerNode( 10 ), null, null)
// let child5 = new Node( new PlannerNode( 14 ), null, null) 
// let child6 = new Node( new PlannerNode( 19 ), null, null)
// let child7 = new Node( new PlannerNode(27 ), null, null) 
// let child8 = new Node( new PlannerNode( 44 ), null, null)
// let child9 = new Node( new PlannerNode( 26 ), null, null) 
// let child10 = new Node( new PlannerNode( 31 ), null, null)
// var heap = new Heap( child1, child2, child3, child4, child5, child6, child7, child8, child9, child10 );

let test = document.getElementById("test")
test.oninput = function() {
      console.log(test.style.height)
  test.style.height = 45 + "px";;
  test.style.height = test.scrollHeight + "px";;

}
console.log(test)

