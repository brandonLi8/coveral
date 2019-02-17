/**
 * Portfolio
 * ImageTextButton.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/13/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Supported for DOM, inheritance of Node
 *
 * ## Description:
 * A Node that takes a image, its hover image (optional), and text (optional)
 * that is a button. The user will provide the styling and the listener function
 * when the button is pressed
 *
 */

import Node from "../Screen/Node.js";

"use strict";
    
export default class ImageTextButton {
  /**
   * Creates the button node
   * @public
   * @constructor
   *
   * @param {object} options - options {
   *  style: null - the style of the button {object} 
   *  id: null, // the id of the node
   *  class: null, // the class of the node
   *  src: null, // the string of the src of the image {string}
   *  hover: null, the src of the image {string}
   *  listener: null, the function called when clicked on 
   * }
   * @return {Node} the node containing all the attributes of a button
   */
  constructor( options ){
    // provide the defaults
    const defaults = {
      style: null,
      id: null, 
      class: null,
      src: null,
      hover: null, 
      listener: null,
      scope: null // the scope you want on the call
    }
    // merge them with options overriding
    const attributes = { ...defaults, ...options }; 
    this.button = new Node({
      type: "img",
      style: attributes.style
    });
    // set the src
    if ( attributes.src ){
      this.button.DOMobject.src = attributes.src;
      this.button.addEventListener( "mouseout", _ =>
        this.button.DOMobject.src = attributes.src 
      );
    }
    // hover effect
    if ( attributes.hover ){
      this.button.addEventListener( "mouseover", _ => 
        hover( this.button, attributes.scope ) 
  
      );
    }
    function hover( node, scope ){
      // no matter what, change the cursor
      node.setStyle({
        cursor: "pointer"
      })
      if ( !attributes.hover ) return;
      node.DOMobject.src = attributes.hover;
      if ( attributes.listener ){
        node.addEventListener( "mousedown", function( _ ){
          attributes.listener( scope ) 
        });   
      }
    }
    this.attributes = attributes;
    this.node = this.button;
  }
}
