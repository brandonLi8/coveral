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

export default class PlannerNode {
  /**
   * @constructor
   * @param { number } value - the value of the plan
   * @param { string } title - the title of the plan
   * @param { string } description - the description of the plan
   * @param { array[string] } tags - list of the tags
   * @param { string } identifer - the identifier stored in the model
   * @public
   */
  constructor( value, title, description, tags, identifier ){
    // all @public
    this.value = value;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.identifier = identifier;
    return;
  }
  /**
   * @public
   * @retrun { boolean } - if one node is less than of equal to another node.
   */
  lessThanOrEqualTo( other ){
    return this.value <= other.value
  }
  /**
   * @public
   * @retrun { string } - return a string representation of the node
   */
  toString(){
    return "" + this.value;
  }
}
