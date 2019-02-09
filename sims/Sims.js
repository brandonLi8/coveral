/**
 * Learning App
 * Sims.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/4/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Top-level file that redirects to different sims and displays the descriptions
 * of the sims.
 *
 */
'use strict';

// modules
import ScreenView from "../../ScreenView/ScreenView.js";

class Sims {
  /**
   * @constructor
   * Get the simulations data and setup.
   * ONLY add new Simulations in the SimulationsStrings.json file.
   */
  constructor(){
    var self = this; // create alias of Sims Class
    // new http get request to the json file
    var simsFile = new XMLHttpRequest();
    simsFile.overrideMimeType( "application/json" );
    simsFile.open( "GET", "Js/SimulationsStrings.json", true );
    var setup = this.setup;
    simsFile.onreadystatechange = function() {
      if ( simsFile.readyState === 4 && simsFile.status == "200" ) {
        // on the load save it and parse it
        setup( self, JSON.parse( simsFile.responseText ) );
      }
    }
    simsFile.send( null ) 
  }
  /**
   * @param {object} sims - the object with the data for the sims.
   * Setup the screen load it onto the screen.
   */
  setup( self, sims ) {
    // @public {ScreenView} - the screen
    self.screen = new ScreenView();
    // @public {object} sims - the sim data
    self.sims = sims;
    // set up the basic structre
    self.simsWrapper = self.screen.addChildToParentType( 
                          "div", "sims_wrapper", null,
                          "", "body" );
    self.title = self.screen.addChildToParentNode(
                    "div", "title", null,
                    "Simulations", self.simsWrapper );
    // for each sim in the data, add it to the view
    let keys = Object.keys( self.sims )
    for ( var i = 0; i < keys.length; i++ ){
      const key = keys[ i ];
      const sim = self.sims[ key ];
      self.addSim( self, sim );
    }
  }
  /**
   * Method that adds a sim to the page
   * @param {object} simNode { 
   *    all @required
   *    title: <String> - the title
   *    description: <String> - the description
   *    url: <String> - the url to the sim
   *    image: <String> - the src to the icon
   *    imageId: <String> the id for the image
   * }
   */
  addSim( self, simNode ){
    var screen = self.screen;
    // create the top-level wrapper for all of the sim
    const sim = screen.addChildToParentId( 
                    "div", simNode.title, 
                    "sim", "", "sims_wrapper" );
    // create the wrapper for just the title of the sim ( link )
    const titleWrapper = screen.addChildToParentNode( 
                            "div", null, 
                            "title_wrapper", "", sim );
    // add a arrow to expand the accordion
    const arrow = screen.addChildToParentNode( 
                    "img", null, "arrow",
                    null, titleWrapper );
    arrow.setAttribute( "src", "./assets/arrowSideIcon.png" )
    // the title of the simulations
    const title = screen.addChildToParentNode( 
                    "div", null, "accordion_title", 
                    simNode.title, titleWrapper );
    // the icon of the simulation
    const image = screen.addChildToParentNode( 
                    "img", simNode.imageId, "icon",
                    null, titleWrapper );
    image.setAttribute( "src", simNode.image );
    // put the description for now
    const description = screen.addChildToParentNode( 
                          "div", null, "description", 
                          "", sim );
    const screenshot = screen.addChildToParentNode( 
                          "img", null, "screenshot",
                          null, description
                        );
    screenshot.setAttribute( "src", simNode.screenshot );
    description.innerHTML += simNode.description;
    
    titleWrapper.onclick = function() {
      // already closed, now clicking
      if ( !description.style.display || description.style.display == "none" ){
        // show the description
        description.style.display = "flex";
        // change the arrow image
        arrow.setAttribute( "src", "./assets/arrow.png" )
        // run the animation
        sim.style.WebkitAnimationPlayState = "running";
        sim.className = "sim";
        // put a border
        titleWrapper.style.borderBottom = "1px solid #444";
      }
      else { // closing the accorion
        // remove the description
        description.style.display = "none";
        // change the arrow image
        arrow.setAttribute( "src", "./assets/arrowSideIcon.png" )
        sim.className = "removeDescription";
        sim.style.WebkitAnimationPlayState = "running";
        titleWrapper.style.border = "none";
      }
    }
  //   // user responsible for changing the border, the id is the options.imageId
  //   
  //   wrapper.onclick = function(){
  //     description.innerHTML = "";
  //     const screenshot = screen.addChildToParentNode( 
  //                 "img", null, "screenshot",
  //                 null, description
  //               );
  //     // maintain 16:9 aspect ratio
  //     const width = "650px";
  //     const height = "365px";
  //     screenshot.style.width = width;
  //     screenshot.style.height = height;
  //     screenshot.style.margin = "auto";
  //     screenshot.setAttribute( "src", options.screenshot );

  //     const content = screen.addChildToParentNode( 
  //                       "div", null, "description_content", 
  //                       "", description );
  //     content.innerHTML = options.description;

  //   }
  // }
  } 
}

// create a new sim page
var sims = new Sims();





