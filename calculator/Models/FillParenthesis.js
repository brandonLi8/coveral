/**
 * Coveral
 * FillParenthesis.js
 *
 * @author Brandon Li <brandon.li820@icloud.com>
 * Created on 1/19/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * module that takes in a string and solves it
 *
 * ## Functionality:
 *  - check if a string has balanced parenthesis
 *  - fill parenthesis to the end of a string
 */

export default class FillParenthesis {
  /**
   * Check if a string has balanced parenthesis
   * @param {string} - input a string to check
   * @public
   * @return {bool} if it is balanced
   */
  hasBalancedParentheses( str ){
    /**
      loop through the string keeping a count.
      everytime there is a "(" add 1 to the count
      everytime there is a ")" subtract 1 from the count
      if amount is 0 at the end than it is balanced
      if at anytime the count is less than 1, than it is unbalanced
     */
    if ( str.length === 0 ){
        return true;
    }
    var count = 0;
    for ( var i = 0; i < str.length; i ++ ) {
      let current = str.charAt(i)
      if ( current === "(" ){
          count ++;
      }
      else if ( current === ")" ){
          count --;
      }
      if ( count < 0 ) {
          return false;
      }
    }
    return ( count == 0 );
  }
  /**
   * fill parenthesis at the end
   * @param {string} - input a string
   * @public
   * @return {string} - updated string
   */
  fill( str ) {
    while ( !this.hasBalancedParentheses( str ) ){
      var openCount = str.split( "(" ).length - 1;
      var closeCount = str.split( ")" ).length - 1;
      if ( openCount === closeCount ){
        if ( !this.hasBalancedParentheses( str ) ){
            throw new Error( "parenthesis" )
        }
      }
      if ( closeCount > openCount ){
            throw new Error( "parenthesis" );
      }
      if ( openCount > closeCount ){
          str += ")";
      }

    }
    return str;
  }
}
