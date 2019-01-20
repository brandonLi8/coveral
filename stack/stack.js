/**
 * Learning App
 * Stack.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/12/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - normall stack data structure
 */
"use strict";
export default class Stack {
  constructor( ...args ){ 
    this.arr = args; 
  }

  length(){ 
    return this.arr.length;
  }
  /**
   * @param {Stack} other - compares to see if the given stack is equal to this
   */
  equals(other){ //O(n)
    return this.arr.every(( current, i, arr ) => current === other.arr[i]);
  }
  /**
   * since it's preallocated, it is O(n)
   */
  pop(){ 
    return this.arr.pop();
  }
  /**
   * On average O(1)
   * But on the case when you fill it up all the way, it is O(N)
   */
  push(element){ 
    this.arr.push(element);
  }
  toString(){
    return "<" + this.arr + ">";
  }
}