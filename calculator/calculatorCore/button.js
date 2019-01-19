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
   * @param {str} - the string that goes in.
   * @public
   * @return {String} the new string that it should display after the button is pressed
   */
  handlePressed( str, carrotPosition ){
    // handle each case
    if ( this.text === "⌫" ) {
      return { 
        newString: str.replace( "", carrotPosition - 1 ),
        newCarrot: carrotPosition - 1
      };
    }
    if ( this.text === "C" ){
      return { 
        newString: "",
        newCarrot: 0
      };
    }
    if ( this.text === "(-)" ){
      return { 
        newString: str + "-",
        newCarrot: 0
      };
    }
    if ( this.text === "mod" ){
      return { 
        newString: str + "%",
        newCarrot: 0
      };
    }
    if ( this.text === "=" ){
      return { 
        newString: "",
        newCarrot: 0
      };
    }
    else {
      return { 
        newString: str.insert( this.text, carrotPosition ),
        newCarrot: carrotPosition + this.text.length
      }
    }
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
/**
 * replace a char at a index with @param {String} newString
 * @helper
 * @public
 * @returns {String} - Return the updated string
 */
String.prototype.replace = function( newString, index ){
  let result;
  if ( index == 0 ){
    result = newString + this.substring( 1, this.length );
  }
  if ( index == this.length ){
    return;
  }
  if ( index == this.length - 1 ){
    result = this.substring( 0, index ) + newString;
  }
  else{
    result = this.substring( 0, index ) + newString + this.substring( index + 1, this.length );
  }
  return result;
}
/**
 * insert a char at a index
 * @helper
 * @public
 * @returns {String} - Return the updated string
 */
String.prototype.insert = function(newString, index){
  let result;
  if (index == 0){
    result = newString + this;
  }
  else{
    result = this.substring(0, index) + newString + this.substring(index, this.length);
  }
  return result;
}
