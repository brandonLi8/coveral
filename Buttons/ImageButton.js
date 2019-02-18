/**
 * Portfolio
 * ImageTextButton.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/13/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * This well create a tree that you can add to your Screenview which represents 
 * a button that contains a image.
 *
 * A Node that takes a image, its hover image (optional), and text (optional)
 * that is a button. The user will provide the styling and the listener function
 * when the button is pressed
 *
 *  img <- root ( the actual button)
 *
 */

"use strict";
// modules
import Node from "../Screen/Node.js";


    
export default class ImageTextButton {
  /**
   * Creates the button node
   * @public
   * @constructor
   *
   * @param {object} options - optionto overide the defauls
   * visit const defaults to see the defaults
   * 
   * to get the node just use the .node property: ex:
   * let button = new ImageButton({}).node
   */
  constructor( options ){
    // provide the defaults
    const defaults = {

      // {object} this style of the button, usually for positioining it 
      style: null, // @optional

      // {string} the id of the button@optional
      id: null, 

      // {string} the class of the button @optional
      class: null,

      // {string} the src of the button @required!
      src: null, 

      // {string} the src of the button @optional
      hover: null, 

      // {function} called on the hover @optional
      hoverListener: null,

      // {object} - the style on the hover @optional
      hoverStyle: {
        cursor: "pointer"
      },

      // {function} called on the mouseout of the button @optional
      mouseout: null,

      // {function} called on the click of the button @optional
      listener: null,

      // the scope you want on the call of the click (provided as the first arg)
      scope: null // also on hoverListener

    }
    // merge them with options overriding
    const attributes = { ...defaults, ...options };

    // merge the styles
    attributes.hoverStyle = { ...defaults.hoverStyle, ...options.hoverStyle } 
 
    var self = this;

    // {node} @public - the actual button node
    this.button = new Node({
      type: "img",
      style: attributes.style,
      src: attributes.src,
    });

    // add hover event listener
    if ( attributes.hover ){
      this.button.addEventListener( "mouseover", function( event ){
        event.stopPropagation();
        self.button.setStyle( attributes.hoverStyle )
        // call the user provided method with the scope
        if ( attributes.hoverListener ) 
          attributes.hoverListener( attributes.scope );

        // change the image
        if ( !attributes.hover ) return;
        self.button.DOMobject.src = attributes.hover;
      } );
    }


    // change back to original src on the mouse out
    this.button.addEventListener( "mouseout", function( event ){
      event.stopPropagation();
      self.button.setStyle( attributes.style );

      self.button.DOMobject.src = attributes.src;
      // call the user provided method with the scope
      if ( attributes.mouseout ) attributes.mouseout( attributes.scope );
    }
    );

    // add the click listener
    this.button.addEventListener( "mousedown", function( event ){
      event.stopPropagation();
      attributes.listener( attributes.scope ) 
    }); 

    // @public {object} - the attributes (options)
    // you can overide it to change attributes (animations, images, etc.)
    this.attributes = attributes;

    // @public {node} - the actual node of the object
    this.node = this.button;
  }

}
