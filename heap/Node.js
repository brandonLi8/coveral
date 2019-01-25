/**
 * Learning App
 * Node.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/25/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - enscapulate the attributes of a node
 */

export default class Node{
  /**
   * @constructor
   * @param {any} - the actual value of the node
   * @public
   */
  constructor( value, leftChild, rightChild, parent ){
    // all @public
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.parent = parent;
  }
  /**
   * @public
   * @param {Node} - the other node
   * @retrun {bool} - if they are equal VALUES
   */
  equals( other ){
    return other.value = 
  }
  /**
   * @public
   * @retrun {string} - return a string representation of the node
   */
  toString(){
    return "value: " + this.value.toString() 
           + ", leftChild: " + leftChild.value.toString()
           + ", rightChild: " + rightChild.value.toString();
  }
}
