/**
 * Module
 * ObservableVariable.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/19/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * An ObservableVariable is a variable that is observable. I know, crazy.
 * 
 * Basically you have the option to supply a listener that is called when
 * the variable changes.
 *
 * The user can provide the listener in the constructor.
 * There are methods to remove the listener or change it to another function.
 *
 * When listeners are no longer necessary, it is best to call the removeListener
 * method to save memory!
 *
 */

"use strict";

export default class ObservableVariable {
  /**
   * @Constructor
   * Set up the variable
   * @param {any} value - the value of the variable
   * @param {function} listener - the listener of the function
   * Note: in the listener this will now be ObservableVariable
   * If you want to use your own scope on the listener create a alias to this
   * with self: var self = this; and use self as a refrence to yourself.
   * 
   * Note: the value can be set to null or undefined and still work
   */
  constructor( value, listener ){
    // double check that listener is a function if it exists
    if ( listener ){
      assert( 
        typeof listener === "function", 
        "listener must be type: function"
      );
    }

    // @private the method called on the variable change
    this.listeners = [ listener ];

    // create a variable to listen to
    var val = value; 
    // define this.value as something that is observable
    Object.defineProperty( 
      this, 
      'value', 
      {
        /**
         * gets the value and returns it
         * @return value
         */
        get: function() { 
          return val; 
        },
        /**
         * sets the newValue and calls the listener
         * @param {any} set the value to a new value
         */
        set: function( newValue ) {
          val = newValue;
          // call the listener with the newValue as the parameter
          for ( var i = 0; i < this.listeners.length; i++ ){
            if ( this.listeners[ i ] ) this.listeners[ i ]( newValue );
          } 
          
        }

    } );

  }
  /**
   * @return {string} - the string format or the value
   */
  toString(){
    if ( this.value )
      return this.value.toString();
    else
      return this.value
  }
  /**
   * Set the listener to a function 
   * @param {function} newListener - the function called when the value changes
   */
  setListener( newListener ){
    assert( 
      typeof newListener === "function", 
      "listener must be type: function"
    );

    this.listeners.push( newListener );
    
  }
  /**
   * remove the listener to the variable
   */
  removeListener(){
    this.listener = null;
  }

}

/**
 * @assert
 * assert a statement
 */
function assert( condition, message ) {
  if ( !condition ) {
    message = message || "Assertion failed";

    if ( typeof Error !== "undefined" ) {
      throw new Error( message );
    }
    throw message; 
  }
}
