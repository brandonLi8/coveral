/**
 * Learning App
 * Precedence.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/19/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * class for the contents and its properties of a calculator
 *
 * ## Functionality:
 *  - enscapulate contents and its properties of a calculator
 */
'use strict';

export default class Precedence {
  /**
   * @constructor
   * @public
   */
  constructor(){ 
    // use sets for o(1) average access
    this.operators = new Set( [ "+", "-", "×", "÷", "%", "^", "(", ")" ] );
    this.singleCharOperators = new Set( [ "√", "+", "-", "×", 
                                          "÷", "%", "^", "(", ")" ] )
    this.trig = new Set( [ "sin", "cos", "tan", "cot", "csc", "sec" ] );
    this.inverse = new Set( [ "arccos", "arcsin", "arctan" ] );
    this.additionals = new Set( [".", "√" ] );
    this.symbols = new Set( [ "ℯ", "π" ] );
    this.symbolValues = {
      "ℯ": 2.71828182845904523536,
      "π": 3.14159265358979323846, 
    };
    this.numbers = new Set(["0", "1", "2", "3", "4", "5",
                            "6", "7", "8", "9", "."]);
    this.precedence = {
      4: new Set( ["(", ")"] ),
      3: new Set(["^"]),
      2: new Set(["×", "÷", "%"]),
      1: new Set( [ "+", "-" ] )
    }
  }
  /**
   * get the precedence of the character
   * @public
   */
  getPrecedence( char ){
    for (var i = 1; i <= Object.keys( this.precedence ).length; i++){
      if ( this.precedence[i].has(char) ){
        return i;
      }
    }
    throw new Error("" + char + " is unrecognized");
  }
  /**
   * @public
   * @return {bool} - return if the string is a number
   */
  isNumber( str ){
    return this.numbers.has( str.charAt(0) );
  }
  /**
   * @public
   * @return {bool} - return if the string is a singleCharOperator
   */
  isOperator( str ){
    return this.singleCharOperators.has( str.charAt(0) );
  }
  /**
   * @public
   * @return {bool} - return if the string is a trig function
   */
  isTrig( str ){
    return this.trig.has( str ) || this.inverse.has( str );
  }


}