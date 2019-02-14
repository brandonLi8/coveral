/**
 * Portfolio
 * TextPushButton.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/14/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Supported for DOM, inheritance of Node
 *
 * ## Description:
 * A Node that takes a text, its hover color, and its normal color
 * that is a button. The user will provide the styling and the listener function
 * when the button is pressed
 *
 */


import Node from "../Screen/Node.js";

"use strict";

export default class TextPushButton {
  /**
   * Creates the button node
   * @public
   * @constructor
   *
   * @param {object} options - look at defaults
   * @return {Node} the node containing all the attributes of a button
   */
  constructor( options ){
    // provide the defaults
    const defaults = {
      text: null,
      style: null,
      hoverStyle: null,
      id: null, 
      class: null,
      listener: null
    }
    // merge them with options overriding
    const attributes = { ...defaults, ...options }; 
    if ( attributes.style ){
      this.button = new Node({
        style: attributes.style
      });
    }
    
    this.button = new Node({
      style: attributes.style
    });
    // hover effect
    if ( attributes.hoverStyle ){
      this.button.addEventListener( "mouseover", _ => 
        hover( this.button ) 
      );
      this.button.addEventListener( "mouseout", _ => 
        unhover( this.button )
      );
    }
    function hover( node ){
      // no matter what, change the cursor
      node.setStyle({
        cursor: "pointer",
        ...attributes.hoverStyle,
      })
    }
    function unhover( node ){
      node.setStyle( attributes.style )
    }
    
    if ( attributes.listener ){
      this.button.addEventListener( "mousedown", function(){
        attributes.listener();
      } );
    }
    return this.button;
  }
}
