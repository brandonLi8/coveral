/**
 * Learning App
 * solver.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/19/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * module that takes in a string and solves it
 *
 * ## Functionality:
 *  step 1: turn the string into a list
 *  step 2: loop trough each thing in the list, pushing it to stacks in order to solve
 */

'use strict';

// modules
import Stack from "../../stack/stack.js";
import Precedence from "./Precedence.js";

export default class Solver {
  /**
   * @constructor
   * @public
   * enscapulate the precendence module
   */
  constructor( str ){
    this.precedence = new Precedence();
    this.str = str;
    this.str = this.solve( this.transformToList( this.str ) );


  }

  solve( list ){
    if ( list[0] === "-" || list[0] === "+"){
      list = [ "0" ].concat(list);
    }
    var values = new Stack();
    var operators = new Stack();
    var index = 0;
    while ( index < list.length ){
      if ( this.precedence.numbers.has( list[ index ].charAt(0) ) ){//is a number
        values.push( list[ index ] );
      }
      else if ( list[index] === "(" ){
        if ( index != 0 && (list[index - 1] === ")" || this.precedence.numbers.has( list[ index - 1 ].charAt(0) )) ){
          operators.push( "×")
        }
        let after = false;
        let corresodingIndex = this.getCorrespondingCloseParenthesisIndex( list, index );
        if ( corresodingIndex != list.length - 1 && (list[corresodingIndex + 1] === "(" || this.precedence.numbers.has( list[ corresodingIndex + 1 ].charAt(0) )) ){
          after = true;

        }
        if ( corresodingIndex - 1 === index ){
          throw new Error("parenthesis")
        }
        let newlist = list.removeFrom( index, corresodingIndex + 1);
        newlist = newlist.removeFrom( 1, newlist.length - 1);
        let newValue = this.solve( newlist );
        values.push( newValue );
        if (after ){
          operators.push( "×")
        }
        index --;

      } 
      else if ( this.precedence.singleCharOperators.has( list[ index ] ) ){ // single char operator
        if ( operators.length() === 0 ){
          operators.push( list[ index ] );
        }
        else if ( this.precedence.getPrecedence( list[ index ]) <= this.precedence.getPrecedence( operators.arr[ operators.length() - 1 ] ) ){
          let value2 = values.pop();
          let value1 = values.pop();
          let operator = operators.pop();
          values.push( this.operate( value1, value2, operator ) );
          index --;
        }
        else {
          operators.push( list[index] );
        }
      }
     
      index ++;

    }
    return this.solveStack( values, operators )
  }

  solveStack( val, ops ){
    let values= val;
    let operators = ops;
    while ( values.length() > 1){
      let value2 = values.pop();
      let value1 = values.pop();
      let operator = operators.pop();
      values.push( this.operate( value1, value2, operator ) );
    }
    return values.arr[ 0 ];
  }
  operate( value1, value2, operator ){
    if (isNaN(value1) || isNaN(value2)){
        throw new Error("something went wrong");
    }
    value1 = parseFloat(value1);
    value2 = parseFloat(value2);
    if (operator === "+"){
        return "" + (value1 + value2);
    }
    if (operator === "-"){
        return "" + (value1 - value2);
    } 
    if (operator === "×"){
        return "" + (value1 * value2);
    }
    if (operator === "÷"){
        return "" + (value1 / value2);
    }
    if (operator === "%"){//modulus
        if (!Number.isInteger(value1) || !Number.isInteger(value2)) {
            throw new Error("modulus with non integer value");
        } 
        return "" + (value1 % value2);
    }

  }
  /**
   * Transform the string into a meaningful list
   * For example getNextNumber( "1+5-cos(3)" ) -> ["1", "+", "5", "-", "cos", "(", "3", ")"]
   * @param {str} - the string that goes in.
   * @private
   * @return {array} - the result array
   */
  transformToList( str ){
    var index = 0;
    var result = []; 
    while ( index < str.length ){
      var current = str.charAt( index );

      if ( this.precedence.numbers.has( current ) ){ // is a number
        let nextDigit = this.getNextNumber( str, index );
        result.push( nextDigit.result );
        index = nextDigit.index;
      }
      else {
        let nextDigit = this.getNextOperator( str, index );
        result.push( nextDigit.result );
        index = nextDigit.index;
      }
    }
    return result;
  }

  /**
   * Get the next number from a given index
   * For example getNextNumber( "12+4.6", 3 ) -> result:4.6, index: 6
   * @param {str} - the string that goes in.
   * @param {index} - starting index place
   * @private
   * @return {Object} {
   *   result: - the next number
   *   str: - the new index
   * }
   */
  getNextNumber( str, index ){
    var result = "";
    while ( true ){
      if ( this.precedence.numbers.has( str.charAt( index ) ) ) { // is a number
        result += str.charAt(index);
        index ++;
      }
      else{
        return {
          result: result,
          index: index,
        }
      }
    }
  }
  /**
   * Get the next number from a given index
   * For example getNextNumber( "12cos5", 2 ) -> result:cos, index: 5
   * @param {str} - the string that goes in.
   * @param {index} - starting index place
   * @private
   * @return {Object} {
   *   result: - the next operator
   *   str: - the new index
   * }
   */
  getNextOperator( str, index ){
    var result = "";
    if ( this.precedence.singleCharOperators.has( str.charAt( index ) ) ){
      return {
        result: str.charAt( index ),
        index: index + 1
      }
    }
    if ( index <= str.length - 3 && this.precedence.trig.has( str.substring( index, index + 3 ) ) ){
      return {
        result: str.substring( index, index + 3 ),
        index: index + 3
      }
    }
    if ( index <= str.length - 6 && this.precedence.inverse.has( str.substring( index, index + 6 ) ) ){
      return {
        result: str.substring( index, index + 6 ),
        index: index + 6
      }
    }
    throw new Error( "something went wrong" );
  }

  getCorrespondingCloseParenthesisIndex( list, start ) {
    var count = 0;
    for ( var i = start + 1; i < list.length ; i++){
      if ( list[ i ] === "(" ){
          count --;
      }
      if ( list[ i ] === ")" ){
          count ++;
      }
      if ( count === 1 ){
          return i;
      }
        
    }
    throw new Error( "parenthesis" )
  }

}
Array.prototype.removeFrom = function( start, end ){
  let result = [];
  for (var i = start; i < end; i ++){
    let removed = this.splice( start, 1 );
    result = result.concat( removed );
    
  }
  return result;

}
