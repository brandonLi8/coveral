/**
 * Learning App
 * Node.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/25/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - enscapulate the attributes of a THE PLAN for the planner
 */
'use strict';

export default class Node{
  /**
   * @constructor
   * @param {any} - the actual value of the node
   * @public
   */
  constructor( value, title, description, tags, id ){
    // all @public
    this.value = value;
    this.title = title;
    this.description = description;
    this.tags = tags;
  }
  lessThanOrEqualTo( other ){
    return this.value <= other.value
  }

  /**
   * @public
   * @retrun {string} - return a string representation of the node
   */
  toString(){
    return "" + this.value;
  }
}
