/**
 * Learning App
 * New.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/30/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - Display the contents to a new plan and send it to the controller.
 */

 // import modules
import PlannerController from "../Controllers/PlannerController.js"
import ScreenView from "./../../ScreenView/ScreenView.js";
import Slider from "./../../Slider/Slider.js";
// modules
var screen = new ScreenView();
var controller = new PlannerController();
/**
 * Intance Data
 * Set up the header and its children.
 */
controller.renderBasics();
controller.removeAll.style.display = "none";

// add the return button
addReturnButton( "./assets/reset.png", 
                 "../planner.html", 
                 "./assets/resetHover.png",
                 "backToDashboardButton" )

function addReturnButton( src, url , hoverSrc, id ){
  // add the div to the wrapper
  let button = screen.addChildToParentId( 
                "div", id, 
                null, "", "planner_wrapper" 
              );
  // add the image to the button node
  let image = screen.addChildToParentNode( 
                "img", null, 
                "backToDashboard", "", button 
              );
  image.setAttribute( "src", src );
  // handle user input
  image.onmouseover = function() { 
    image.setAttribute( "src", hoverSrc );
    image.style.cursor = "pointer";
  };
  image.onmouseout = function() { 
    image.setAttribute( "src", src );
  };
  image.onclick = function() { 
    window.open(url, '_self');
  }
}

// add the title
screen.addChildToParentId( "div", "NewTitle", null, 
                            "New Plan", "backToDashboardButton")


let titleLabel = screen.addChildToParentId( "div", "titleLabel", null, 
                                            "Title", "planner_wrapper")

let title = screen.addChildToParentId( "textarea", "title", null, 
                                        "", "planner_wrapper")
title.focus();
title.style.float = "left"
title.oninput = function() {
  title.style.height = 50 + "px";;
  title.style.height = title.scrollHeight + "px";;
}
title.addEventListener( "keydown", function( event ){
  if ( event.key === "Tab" ) {
    event.preventDefault();
    description.focus();
  }
} );

let descriptionLabel = screen.addChildToParentId( "div", "titleLabel", null, 
                                            "Description", "planner_wrapper" );

let description = screen.addChildToParentId( "textarea", "description", null, 
                                            "", "planner_wrapper" );
description.oninput = function() {
  description.style.height = 50 + "px";;
  description.style.height = description.scrollHeight + "px";;
}
description.addEventListener( "keydown", function(){
  if ( event.key === "Tab" ) {
    event.preventDefault();
    tags.focus();
  }
} );

// add a new slider 
let slider = new Slider( {
  title: "Urgency",
  width: "40%",
  low: 0,
  top: 10,
  round: 0,
  unit: "",
  startingValue: 10,
});
document.getElementById( "planner_wrapper" ).appendChild( slider.getDom() );


let tagsLabel = screen.addChildToParentId( "div", "titleLabel", null, 
                                            "tags", "planner_wrapper" );

let tags = screen.addChildToParentId( "textarea", "tags", null, 
                                            "", "planner_wrapper" );
tags.oninput = function() {
  tags.style.height = 50 + "px";;
  tags.style.height = tags.scrollHeight + "px";;
}

tags.placeholder = "#tag1, #tag2";

let enter = screen.addChildToParentId( "button", "enter", null, 
                                       "Enter", "planner_wrapper")
enter.onclick = submit;

function submit() {
  // enter it in
  /// concat the tags into an array
  let reduced = []
  if ( tags.value.length > 0 ){
    let string = tags.value;
    var result = string.split( '#' ).map(
                        element => element.split( ',' ) ).reduce(
                                  ( acc, curr ) => acc.concat( curr ) );
    result.forEach( function( element ){
      if ( element.trim().length !== 0 ) reduced.push( element )
    }  );
  }
  controller.submit( title.value, description.value, slider.getValue(), reduced)
  window.open( "../planner.html", "_self" )
}

String.prototype.trim = function () {
  return this.replace( /^\s*/, "" ).replace( /\s*$/, "" );
}


