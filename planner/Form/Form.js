/**
 * Learning App
 * New.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/2/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - Provide the template for a form for both the new and the edit page.
 */

 // import modules
import PlannerController from "./../Controllers/PlannerController.js"
import ScreenView from "../../../ScreenView/ScreenView.js";
import Slider from "../../../Slider/Slider.js";
// modules
var screen = new ScreenView();
var controller = new PlannerController();

export default class Form{
  /**
   * @Constructor - render the form
   * @Param { object } options - { (all keys are mandatory)
   *     page: "New Plan",  // the title of the page
   *     title: "", // the preset of the title box
   *     description: "", // the preset of description box
   *     value: 10, // preset of the slider
   *     tags: "", // all of the tags ( Has to be in a string form )
   *     tagsPlaceholder: "#tag1, #tag2", // the placeholder for the tags box
   *     submit: function( title, description, slider ) {
   *       // function when the submit is pressed
   *       // the title dom, description dom, and the slider class is passed
   *     }
   *   } );
   */
  constructor( options ){
    // add the return to planner button
    controller.renderBasics();
    // remove the remove all button
    controller.removeAll.style.display = "none";
    addReturnButton( "./assets/reset.png", 
                     "../planner", 
                     "./assets/resetHover.png",
                     "back_to_dashboard_button" 
    );
    //add the title
    screen.addChildToParentId( 
              "div", "new_title", null, 
              options.page, "back_to_dashboard_button" );

    // add the title
    let titleLabel = screen.addChildToParentId( 
                        "div", "titleLabel", null, 
                        "Title", "planner_wrapper" );

    let title = screen.addChildToParentId( 
                    "textarea", "title", null, 
                    options.title, "planner_wrapper" );
    title.focus();
    title.oninput = function() {
      title.style.height = 50 + "px";;
      title.style.height = title.scrollHeight + "px";
    }
    title.addEventListener( "keydown", function( event ){
      if ( event.key === "Tab" ) {
        event.preventDefault();
        description.focus();
      }
    } );
    // add the description
    let descriptionLabel = screen.addChildToParentId( 
                              "div", "titleLabel", null, 
                              "Description", "planner_wrapper" );

    let description = screen.addChildToParentId( 
                                "textarea", "description", null, 
                                options.description, "planner_wrapper" );
    description.oninput = function() {
      description.style.height = 50 + "px";
      description.style.height = description.scrollHeight + "px";
    }
    description.addEventListener( "keydown", function(){
      if ( event.key === "Tab" ) {
        event.preventDefault();
        tags.focus();
      }
    } );
    // add the slider
    let slider = new Slider( {
                  title: "Urgency",
                  width: "40%",
                  low: 0,
                  top: 10,
                  round: 0,
                  unit: "",
                  startingValue: options.value,
                } );
    document.getElementById( "planner_wrapper" ).appendChild( slider.getDom() );

    // add the tags
    let tagsLabel = screen.addChildToParentId( 
                        "div", "titleLabel", null, 
                        "tags", "planner_wrapper" );
    let tags = screen.addChildToParentId( 
                  "textarea", "tags", null, 
                  options.tags, "planner_wrapper" );
    tags.oninput = function() {
      tags.style.height = 50 + "px";
      tags.style.height = tags.scrollHeight + "px";
    }

    tags.placeholder = options.tagsPlaceholder;

    // the submit button
    let enter = screen.addChildToParentId( 
                  "button", "enter", null, 
                  "Enter", "planner_wrapper" );
    enter.onclick = function(){
      options.submit( title, description, slider, tags );
    }

  }
}

// function to add the return button
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
    window.open( url, '_self' );
  }
}
