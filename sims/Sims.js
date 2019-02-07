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
        null, "", "main_wrapper" 
);
screen.addChildToParentId( 
                        "div", "title", null, 
                        "Description", "descriptions" );                            

const description = screen.addChildToParentId( 
        "div", "description", 
        null, "", "descriptions" 
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
    description.innerHTML = "";
    const screenshot = screen.addChildToParentNode( 
                "img", null, "screenshot",
                null, description
              );
    // maintain 16:9 aspect ratio
    const width = "650px";
    const height = "365px";
    screenshot.style.width = width;
    screenshot.style.height = height;
    screenshot.style.margin = "auto";
    screenshot.setAttribute( "src", options.screenshot );

    const content = screen.addChildToParentNode( 
                      "div", null, "descriptionContent", 
                      "", description );
    content.innerHTML = options.description;

  }
}

addLink( {
  title: "Collision Theory",
  image: "./assets/momentumIcon.png",
  imageId: "collisionIcon",
  screenshot: "./assets/screenshot.png",
  description: "<strong>Topics</strong> <ul> <li>Momentum</li> <li>Conservation of Energy</li> <li>Energy Transfer</li> </ul>"

});

addLink( {
  title: "Circular Motion",
  image: "./assets/circularMotionIcon.png",
  imageId: "circularMotion",
  screenshot: "./assets/screenshot.png",
  description: "Adfasdf this is the descriptions cm"
});


// // Description
// Explore how heating and cooling iron, brick, water, and olive oil adds or removes energy. See how energy is transferred between objects. Build your own system, with energy sources, changers, and users. Track and visualize how energy flows and changes through your system.

// Sample Learning Goals
// Predict how energy will flow when objects are heated or cooled, or for objects in contact that have different temperatures.
// Describe the different types of energy and give examples from everyday life.
// Describe how energy can change from one form of energy into another.
// Explain conservation of energy in real-life systems.
// Design a system with energy sources, changers, and users and describe how energy flows and changes one form of energy into another.
// Tell the energy story for real-life systems."

