/**
 * Learning App
 * PlannerView.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/25/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Functionality:
 *  - display the view for the planner
 */
'use strict';
// import modules
import ScreenView from "./../../ScreenView/ScreenView.js";
// modules
var screen = new ScreenView();

export default class PlannerView {
  /**
   * No Constructor. Basic view is rendered in addHeader().
   */
  constructor( ){ return; }
  /**
   * add a card to the view
   * @public
   * @param { String } title - the title of the card in the heading
   * @param { number } importance - the value of if 0-10;
   * @param { String } description - the description of the plan
   * @param { Array[ string ] } tags - all the tags associated
   * @param { String } identifier - the identifier stored in the db.
   * @param { function } remove - method called when trash can is clicked
   */
  addCard( title, importance, description, tags, identifier, remove ){
    let type; // higlighted || null
    if ( importance >= 8 ) type = "highlighted";
    // highlight important ones
    let card = screen.addChildToParentId( 
                  "div", type, "card", 
                  "", "planner_wrapper" );
    let heading = screen.addChildToParentNode( 
                    "div", "heading", null, 
                    "", card );
    // now add the delete button
    let trash = screen.addChildToParentNode( 
                  "img", identifier, 
                  "trash", "", heading
                );
    trash.setAttribute( "src", "./assets/trashcan.png" );
    trash.onmouseover = function() { 
      trash.setAttribute( "src", "./assets/trashcanHover.png" );
    };
    trash.onmouseout = function() { 
      trash.setAttribute( "src", "./assets/trashcan.png" );
    };
    trash.onclick = remove;
    // the title
    screen.addChildToParentNode( "div", "text", null, title, heading);
    // the value 1 - 10
    screen.addChildToParentNode( "div", "value", null, importance, heading);
    // the description of the event
    screen.addChildToParentNode( "div", "description", null, description, card);
    // create the tags 
    let tagWrapper = screen.addChildToParentNode( 
                        "div", "tags", null, "", card
                    );
    for ( var i = 0 ; i < tags.length; i++ ){
      screen.addChildToParentNode( "div", null, null, tags[ i ], tagWrapper);
    }
  }

  /**
   * add the header. ( without children )
   * ONLY called once.
   * @public
   * @return {DOM} the header element
   */
  addHeader( ){
    // set up wrappers
    screen.addChildToParentType( "div", "planner_wrapper", null, "", "body" );
    
    let header = screen.addChildToParentId( "div", "header", null, 
                                            "", "planner_wrapper" );
    screen.addChildToParentId( "div", "left", null, "", "header" );
    this.container = screen.addChildToParentId( 
                        "div", "header_content", 
                        null, "", "left" 
                     );
    return header;
  }
  /**
   * add a image to the header
   * @return {DOM} the image
   */
  addImageToHeader( ){
    // add the image to the container
    let image = screen.addChildToParentNode( 
                  "img", "backToDashboard", 
                  null, "", this.container
                );
    // controller sets up event listeners
    return image;
  }
  /**
   * add text to the header
   * @return {DOM} the text
   */
  addLinkToHeader( text ){
    return screen.addChildToParentId( 
            "div", "header_content", 
            null, text, "left" 
    );
  }
  /**
   * display none text
   * @public
   */
  displayNone(  ){
    let msg = screen.addChildToParentId( "div", "none", 
       null, "You have no plans.", "planner_wrapper" 
    );
    msg.appendChild( document.createElement( "br" ) );
    msg.appendChild( document.createElement( "br" ) );

    let url = screen.addChildToParentNode( "a", null, null, "New Plan", msg ); 
    
    url.setAttribute( "href", "./new.html" );
    url.setAttribute( "target", "_self" );
  }
  /**
   * remove a card 
   * @param { string } id - the identifier that the model stores
   * @public
   */
  removeCard( id ){
    let card = document.getElementById( id );
    card.parentNode.parentNode.remove();
    if ( document.getElementsByClassName( "card" ).length === 0 ){
      this.displayNone()
    }
  }
}



