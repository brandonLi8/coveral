/**
 * Learning App
 * Vector.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/25/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * This well create a tree that you can add to your screenview which represents
 * a vector arrow.
 *
 *
 *      Div <-  ( the container ) 
 *     /   \
 *  arrow  stem
 * 
 * This vector will have a constructor and other methods. The constructor will
 * construct the node. To access the node use the node property: 
 * var node = new Vector( options ).node
 *
 * There will also be methods to set the orientation (direction), set the length
 * and set the height
 */

"use strict";
// modules
import Node from "../Screen/Node.js";

export default class Vector {
  /**
   * @constructor
   * param {options} the options for the vector
   * Create a dom object that represents a vector
   */
  constructor( options ){
    var defaults = {
      color: "green",
      length: null, // {number} in pixels - the length of the vector
      height: null, // {number} in pixels - the width of the vector
      orientation: null, // in radians 0 radians points to the right

      position: { // this is where the container goes on the screen
        position: "absolute",
        bottom: "4%",
        left: "40%",
      },
      arrowLength: 20, // {number} the length of the arrow in pixels
      precentStem: 50, // {number} the percent the stem is on the total height
    }
    this.attributes = { ...defaults, ...options }
    this.attributes.position = { ...defaults.position, ...options.position }

    var attributes = this.attributes;
    this.container = new Node({
      style: {
        ...attributes.position,

        height: attributes.height + "px",
        width: attributes.length + "px",
        
        display: "flex"
      },
    })

    this.arrow = new Node({
      style: {
        width: "0",
        height: "0",
        borderTop:  attributes.height / 2 + "px solid transparent",
        borderLeft: attributes.arrowLength + "px solid " + attributes.color,
        borderBottom:  attributes.height / 2 + "px solid transparent",
      }
    })

    this.stem = new Node({
      style: {
        margin: "auto",
        width: 100 - attributes.percentArrow + "%",
        height: attributes.precentStem + "%",
        background: attributes.color,
        borderRight: "none",
        flexGrow: 2,
      }
    })

    this.container.appendChildren([ this.stem, this.arrow ])
    this.rotate( attributes.orientation )
  }

  /**
   * @return {node} the node of the arrow
   */
  get node(){
    return this.container;
  }

  /**
   * @private rotate the arrow
   * @return {node} the node of the arrow
   */
  rotate( rad ){
    this.container.rotate( rad, "rad" );
  }
  /**
   * @public change the length of the vector
   * @param {number} newLength in pixels
   */
  setLength( newLength ){

    this.container.setStyle({
      width: newLength + "px"
    })
  }
}
