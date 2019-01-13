/**
  * stack.js:module
  * learning app
  * Created by Brandon Li on 1/12/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */

 /*  
    export module that is a stack, a last in first out dataStructure.
    Arrays in js are implemented on average o(1)
    this stack will use an array and its methods
 */
"use strict";
export default class Stack {
  constructor(...args){ //ex stack = new Stack(1,2,3,4). O(n)
    this.arr = args; 
  }

  length(){ //O(1)
    return this.arr.length;
  }
  // @param {Stack} other, compares to see if the given stack is equal to this
  equals(other){ //O(n)
    return this.arr.every(( current, i, arr ) => current === other.arr[i]);
  }

  pop(){ //since it's preallocated, it is O(n)
    return this.arr.pop();
  }

  push(element){ //array- on average O(1), but on the case when you fill
    //it up all the way, it is O(N)
    this.arr.push(element);
  }

  toString(){
    return "<" + this.arr + ">";
  }
}