/**
 * Learning App
 * button.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/17/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * class for a Button Node
 *
 * ## Functionality:
 *  - handle functionality when a button is pressed
 *  - enscapulate the properties of a button
 */
"use strict";
export default class Button {
  /**
   * @constructor
   * @public
   * enscapulate the properties of a button
   * @param {string} text - The text on top of the button
   * @param {string} type - The type of button ex: dark, operator etc.
   */
  constructor( text, type ){
    // @public 
    this.text = text;
    // @public
    this.type = type; 
  }
  /**
   * Handle the functionality of each button when pressed
   * @public
   */
  handlePressed(){
    console.log(this.text)
  }
  /**
   * Simple way of identifying a button when debugging.
   * @public
   * @returns {String} - Return the text on the button
   */
  toString(){
    return this.text;
  }
}