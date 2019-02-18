/**
 * Portfolio
 * TextPushButton.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/14/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 *
 * This well create a tree that you can add to your tree which represents a 
 * button that contains a image.
 *
 * A Node that has all the nodes for a button ( text ).
 * This provides a default looking button, but the user can overide the style.
 * The style is a seperate opbject that the user can default each item, so
 * if you override style it doens't delete all of the style.
 *
 *    div <- this.node ( the actual button ) 
 *     |
 *  textnode <- this.textNode ( the node of the text )  
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
   * @param {object} options - look at const defaults for information on 
   * all of the defaults
   * 
   * to get the button node call itself the .button property of this class:
   * let buttonNode = new TextPushButton({}).button {node}
   *
   */
  constructor( options ){
    // provide the defaults 
    let defaults = {

      // {string} the text on the node @optional
      text: "Text Button", 

      // {object} the styling ( overriding doesnt delete all of it )  @optional 
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

      // {object} the styling on the hover @optional
      hoverStyle: { 
        cursor: "pointer",
        background: "#DDD"
      },

      // {object} the style for the text node @optional 
      textStyle: { 
        fontSize: "20px",
        margin: "auto",
        textAlign: "center",
        fontFamily: "Courier"
      },

      // {object} the style for the text on the button hover @optional 
      textHoverStyle: null,

      // {string}the id of the button @optional 
      id: null, 
      // {string} the class of the button @optional 
      class: null,

      // {function} the function called on the click 
      listener: null,

      // {function} the function called on the hover 
      hoverListener: null,

      // {function} the function called on the mouseout of the hover
      mouseout: null,

      // the scope as the first arg of the oncick and the onhover
      scope: null,

    }
    var self = this;
    // merge them with options overriding
    let attributes = { ...defaults, ...options };

    // merge the styles 
    attributes.style = { ...defaults.style, ...options.style }
    attributes.hoverStyle = { ...defaults.hoverStyle, ...options.hoverStyle } 
    attributes.textStyle = { ...defaults.textStyle, ...options.textStyle }


    // @public {node} the button node
    this.button = new Node({
      style: attributes.style
    });

    // add hover styling ( you can call animations from your css in here )
    this.button.addEventListener( "mouseover", function( event ){ 
      event.stopPropagation();
      self.button.setStyle( attributes.hoverStyle );
      self.textNode.setStyle( attributes.textHoverStyle );

      if ( attributes.hoverListener )
        attributes.hoverListener( attributes.scope )

    } );

    this.button.addEventListener( "mouseout", function( event ){ 
      event.stopPropagation();
      self.button.setStyle( attributes.style );
      self.textNode.setStyle( attributes.textStyle )

      if ( attributes.mouseout ) attributes.mouseout( attributes.scope )

    } );

    // on click listener
    this.button.addEventListener( "mousedown", function( event ){
      event.stopPropagation()
      if ( attributes.listener ) 
        attributes.listener( attributes.scope );
    } );
    

    // @public have a seperate text node for more animation flexibility
    this.textNode = new Node({
      text: attributes.text,
      style: attributes.textStyle
    })

    this.button.addChild( this.textNode );
   
    // {object} @public the attibutes you can change
    this.attributes = attributes;

    // {node} @public the actual button
    this.node = this.button;
  }

}


