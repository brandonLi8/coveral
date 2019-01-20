/**
 * Learning App
 * Button.js
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
// modules
import Solver from "./Solver.js";
import Precedence from "./Precedence.js";
import FillParenthesis from "./FillParenthesis.js";

var precedence = new Precedence();
var fillParenthesis = new FillParenthesis();

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
   * Get the corresponding close parenthesis index 
   * @private
   */
  getCloseIndex( str, start ) {
    var count = 0;
    for ( var i = start + 1; i < str.length ; i++ ){
      if ( str.charAt( i ) === "(" ) count --;
      if ( str.charAt( i ) === ")" ) count ++;
      if ( count === 1 ) return i;
    }
    throw new Error( "parenthesis" );
  }
  /**
   * Handle the functionality of each button when pressed
   * @param {str} - the string that goes in.
   * @public
   * @return {String} the new string that it should display 
   * after the button is pressed
   */
  handlePressed( str, carrotPosition ){
    // handle each case
    if ( precedence.isTrig( this.text ) ){
      return { 
        newString: str.insert( this.text + "()" , carrotPosition ),
        newCarrot: carrotPosition + this.text.length + 1,
        error: false
      };
    }
    if ( this.text === "√" || this.text === "^"){
      return { 
        newString: str.insert( this.text + "()" , carrotPosition ),
        newCarrot: carrotPosition + this.text.length + 1,
        error: false
      };
    }
    if ( this.text === "⌫" ) {
      if ( precedence.isTrig( 
           str.substring( carrotPosition - 7, carrotPosition - 1 ) ) ){
        try {
        return {
          newString: str.substring( 0 , carrotPosition - 7 )
                   + str.substring( this.getCloseIndex( str, 
                                                      carrotPosition - 1 ) + 1, 
                                      str.length ),
          newCarrot: carrotPosition - 7,
          error: false,
        }
        } catch( err ) {
          return { 
            newString: str.replace( "", carrotPosition - 1 ),
            newCarrot: carrotPosition - 1,
            error: false
          };
        }
      }
      else if ( precedence.isTrig( 
           str.substring( carrotPosition - 4, carrotPosition - 1 ) ) ){
        try {
        return {
          newString: str.substring( 0 , carrotPosition - 4 )
                   + str.substring( this.getCloseIndex( str, 
                                                      carrotPosition - 1 ) + 1, 
                                      str.length ),
          newCarrot: carrotPosition - 4,
          error: false,
        }
        } catch( err ) {
          return { 
            newString: str.replace( "", carrotPosition - 1 ),
            newCarrot: carrotPosition - 1,
            error: false
          };
        }
      }
      
      return { 
        newString: str.replace( "", carrotPosition - 1 ),
        newCarrot: carrotPosition - 1,
        error: false
      };
    }
    if ( this.text === "C" ){
      return { 
        newString: "",
        newCarrot: 0,
        error: false
      };
    }
    if ( this.text === "(-)" ){
      return { 
        newString: str.insert( "-", carrotPosition ),
        newCarrot: carrotPosition + 1,
        error: false
      };
    }
    if ( this.text === "mod" ){
      return { 
        newString: str.insert( "%", carrotPosition ),
        newCarrot: carrotPosition + 1,
        error: false
      };
    }
    if ( this.text === "=" ){
      try {
        str = replaceSymbols( str );
        str = fillParenthesis.fill( str );
        str = new Solver(str);
        return { 
          newString: str.str,
          newCarrot: str.str.length,
          error: false
        };
      } catch( err ){
        let error = err.toString();
        return { 
          newString: error,
          newCarrot: error.length,
          error: true
        };
      }

    }
    else {
      return { 
        newString: str.insert( this.text, carrotPosition ),
        newCarrot: carrotPosition + this.text.length,
        error: false
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
 * replace P and E symbol with numerical value wrapped around in parenthesis
 * @helper
 * @public
 * @recursive
 * @returns {String} - Return the updated string
 */
function replaceSymbols( str ){
  for ( var i = 0; i < str.length; i++ ){
    if ( precedence.symbols.has( str.charAt( i ) ) ){
      str = str.replace( "(" 
                         + precedence.symbolValues[ str.charAt( i ) ] 
                         + ")", i );
      replaceSymbols(str);
    }
  }
  return str;
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
    result = this.substring( 0, index ) 
             + newString 
             + this.substring( index + 1, this.length );
  }
  return result;
}
/**
 * insert a char at a index
 * @helper
 * @public
 * @returns {String} - Return the updated string
 */
String.prototype.insert = function( newString, index ){
  let result;
  if ( index == 0 ){
    result = newString + this;
  }
  else{
    result = this.substring( 0, index ) 
             + newString 
             + this.substring( index, this.length );
  }
  return result;
}
