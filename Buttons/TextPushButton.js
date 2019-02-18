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
 * A Node that has all the nodes for a button ( text ).
 * This provides a default looking button, but the user can overide the style.
 * The style is a seperate opbject that the user can default each item, so
 * if you override style it doens't delete all of the style.
 *
 *
 * This class will provide functions that animate the button when called
 */

// modules
import Node from "../Screen/Node.js";

"use strict";

export default class TextPushButton {
  /**
   * Creates the button node
   * @public
   * @constructor
   *
   * @param {object} options - look at defaults
   * ( to get the button node call the .button property of this class )
   */
  constructor( options ){
    // provide the defaults @overidable
    const defaults = {
      // @optional the text on the node <string>
      text: "Button", 

      // @optional the styling ( overriding doesnt delete all of it )
      style: { 
        border: "1px solid #222",
        borderRadius: "15px",
        width: "200px",
        height: "50px",
        display: "flex",
        background: "white",
        boxShadow: "0 0 3px 0 rgb( 40, 40, 40 )",
        margin: "auto"
      },

      // @optional the styling on the hover
      hoverStyle: { 
        cursor: "pointer",
        background: "#DDD"
      },

      // @optional the style for the text ( mostly used for )
      textStyle: { 
        fontSize: "20px",
        margin: "auto",
        textAlign: "center",
        fontFamily: "Courier"
      },

      // @optional the style for the text on the button hover
      textHoverStyle: null,
      // the id of the button <string>
      id: null, 
      // the class of the button <string>
      class: null, 
      // the function called on the click <function> (caller's scope)
      onclick: null,
      // the function called on the hover <function> (caller's scope)
      onhover: null,

    }
    // merge them with options overriding
    const attributes = { ...defaults, ...options };
    // merge the styles 
    attributes.style = { ...defaults.style, ...options.style }
    attributes.hoverStyle = { ...defaults.hoverStyle, ...options.hoverStyle } 
    attributes.textStyle = { ...defaults.textStyle, ...options.textStyle }
    // we know the style has to exist, set the style for the button
    // @very public ( the purpose of this class )
    this.button = new Node({
      style: attributes.style
    });
    // add hover styling ( you can call animations from your css in here )
    this.button.addEventListener( "mouseover", _ => 
      hover( this )
    );
    this.button.addEventListener( "mouseout", _ =>
      unHover( this ) 
    );
    function hover( self ){
      self.button.setStyle( attributes.hoverStyle )
      self.textNode.setStyle( attributes.textHoverStyle )
    }
    function unHover( self ){
      self.button.setStyle( attributes.style );
      self.textNode.setStyle( attributes.textStyle )
    }
    // on click listener
    this.button.addEventListener( "mousedown", function(){
      if ( attributes.onclick ) attributes.onclick();
    } );
    /**
     * The reason for a seperate node for text is that the user can provide
     * more animations like wiggling the text on a hover, etc.
     */
    this.textNode = new Node({
      text: attributes.text,
      style: attributes.textStyle
    })
    this.button.addChild( this.textNode );
    return this.button;
  }
}
