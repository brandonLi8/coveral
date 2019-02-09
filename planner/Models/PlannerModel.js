/**
 * Learning App
 * PlannerController.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/29/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  1. Store all the data in local storage and allow a interface for the 
 *     controller to access it. The 'plans' will be stored in a object with
 *     the order that they go in as the key and a object with the 
 *      properties of a planner node as the value.
 *  2. Provide method that gets all of the 'plans' by putting it in a heap
 *     (that I implemented) and returning it.
 */
'use strict';
// import modules
import Heap from "../../Heap/Heap.js";
import Node from "../../Heap/Node.js";
import PlannerNode from "../Models/PlannerNode.js";
// create date object
var date = new Date();

export default class PlannerModel{
  /**
   * Since it uses local storage (already constructed) the model won't need a 
   * constructor because it is already made and the model won't be needed to be
   * passes around from different mvc's of the new page and the edit page.
   */
  constructor( ){ return; }
  /**
   * @public
   * clear all the data
   */
  clear( ){ 
    localStorage.clear();
    window.open( "/planner.html", "_self" );
  }
  /**
   * @public
   * Add a 'plan' to the model.
   * @param {PlannerNode} plannerNode - node that is being added.
   */
  add( plannerNode ){
    let length = "" + localStorage[ "length" ];
    let identifier =  Date.now() + " number: " + length;
    let obj = {
      title: plannerNode.title,
      description: plannerNode.description,
      value: plannerNode.value,
      tags: plannerNode.tags,
      identifier: identifier
    };
    localStorage[ identifier ] = JSON.stringify( obj );
  }
  /**
   * @public
   * get the Heap representation of the data.
   * @return {Heap}
   */
  getHeap( ){
    var heap = new Heap( );
    let keys = Object.keys( localStorage )
    for ( var i = 0; i < keys.length; i++ ){
      let key = keys[ i ];
      let current = JSON.parse( localStorage[ key ] );
      let newPlannerNode = new PlannerNode( 
                                parseInt( current.value ), 
                                current.title, 
                                current.description,
                                current.tags,
                                current.identifier );
      let newNode = new Node( newPlannerNode, null, null );
      heap.add(  newNode ) ;
    }
    return heap;
  }
  /**
   * @public
   * remove a node based on the identifier
   */
  removeNode( id ){
    localStorage.removeItem( id );
  }
  /**
   * @public
   * change a node based on the identifier
   */
  changeNode( id, newNode ){
    this.removeNode( id )
    this.removeNode( "edit" )
    let obj = {
      title: newNode.title,
      description: newNode.description,
      value: newNode.value,
      tags: newNode.tags,
      identifier: id
    };
    localStorage[ id ] = JSON.stringify( obj );
  }

}


