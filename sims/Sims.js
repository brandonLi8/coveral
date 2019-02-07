/**
 * Learning App
 * Sims.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/4/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Top-level file that redirects to different sims.
 *
 */
'use strict';

// modules
import ScreenView from "../../ScreenView/ScreenView.js";
var screen = new ScreenView();


// add the wrapper to the links
screen.addChildToParentType( "div", "main_wrapper", null, "", "body" );

// add a wrapper that contains the links
screen.addChildToParentId( "div", "links", null, "", "main_wrapper" );

// create a title
screen.addChildToParentId( "div", "title", null, "Simulations", "links" );

// add a wrapper for the descriptions when the link is clicked
screen.addChildToParentId( 
        "div", "descriptions", 
        null, "asfdasf", "main_wrapper" 
);
/**
 * function that adds a link to the page
 * @param options{
 *       title: <String> - the title
 *       description: <String> - the description
 *       url: <String> - the url to the sim
 *       image: <String> - the src to the icon
 *       imageId: <String> the id for the image
 * }
 */
function addLink( options ){
  const wrapper = screen.addChildToParentId( 
                    "div", options.title, 
                    "link", "", "links" );

  const image = screen.addChildToParentNode( 
                  "img", options.imageId, "icon",
                  null, wrapper
                );
  image.setAttribute( "src", options.image );
  // user responsible for changing the border, the id is the options.imageId
  const goToDescription = screen.addChildToParentNode( 
                            "div", null, 
                            "goToDescription", options.title, wrapper );
  wrapper.onclick = function(){
    console.log( "clic")
  }
}

addLink( {
  title: "Collision Theory",
  image: "./assets/momentumIcon.png",
  imageId: "collisionIcon"
});

addLink( {
  title: "Circular Motion",
  image: "./assets/circularMotionIcon.png",
  imageId: "circularMotion"
});




