/**
 * Learning App
 * Node.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/25/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - enscapulate the attributes of a node for a heap
 */
'use strict';

export default class Node{
  /**
   * @constructor
   * @param {any} - the actual value of the node
   * @public
   */
  constructor( value, leftChild, rightChild ){
    // all @public
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.parent = null; // handle externally
    return;
  }
  /**
   * @public
   * @param {Node} - the other node
   * @retrun {bool} - if they are equal VALUES
   */
  equals( other ){
    return other.value = this.value;
  }
  /**
   * @public
   * @retrun {string} - return a string representation of the node
   */
  toString(){
    try{
      var left = this.leftChild.value.toString();
    }catch( err ) {
      var left = null;
    }
    try{
      var right = this.rightChild.value.toString();
    }catch( err ) {
      var right = null;
    }
    try{
      var parent = this.parent.value.toString();
    }catch( err ) {
      var parent = null;
    }
    return "value: " + this.value.toString() 
           + ", leftChild: " + left
           + ", rightChild: " + right
           + ", parent: " + parent;
  }
  /**
   * @public
   * dispose the node
   */
  dispose(){
    this.value = null;
    this.parent = null;
    this.this = null;
  }
}
