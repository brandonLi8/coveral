/**
 * Learning App
 * Heap.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/25/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - all methods of a Max heap. 
 * 
 * ## User Instructions:
 *  - The user must provide the value for the node. This means that that the 
 *    value for the Node.js is anything the user wants. However, the value must
 *    have a LessThanOrEqualTo method that defines if a value is greater than 
 *    another. It also should provide a toString method if you want the root
 *    order traversal. Demo on PlannerNode.js
 */
'use strict';

// import modules
import Node from "./Node.js";
// modules

export default class Heap{
  /**
   * @constructor
   * @param {Node} - the default values of a heap
   * @public
   */
  constructor( ...args ){
    // @public
    this.root; 
    // @private
    this.lastAdded;
    for ( var i = 0; i < args.length; i++ ){
      this.add( args[ i ] );
    }
    return;

  }
  /**
   * @param {Node} - the Node to add to the heap
   * @public
   */
  add( node ){
    assert( node instanceof Node, "cannot add non node type to heap" );
    if ( !this.root ){
      this.root = node;
      return;
    }
    /**
     * first add normaly
     * @recursive
     * add in order, as if appending to the root order list
     */
    addNormally( this.root )
    function addNormally( rootNode ){
      /**
       * First check left and right child to fill.
       * then check their children's children to decide what to add on to
       */
      if ( !rootNode.leftChild ) {
        rootNode.leftChild = node;
        node.parent = rootNode;
        return;
      }
      else if ( !rootNode.rightChild ) {
        rootNode.rightChild = node;
        node.parent = rootNode;
        return;
      }
      if ( !rootNode.leftChild.rightChild || !rootNode.leftChild.leftChild){
        addNormally( rootNode.leftChild )
      }
      else if ( !rootNode.rightChild.rightChild || !rootNode.rightChild.leftChild){
        addNormally( rootNode.rightChild )
      }
      else addNormally( rootNode.leftChild )
    }

    // compare with its parent, and swap up.
    let current = node;
    while ( current ){
      if ( current.parent && 
           current.parent.value.lessThanOrEqualTo( current.value ) ) {
        let copyOfParent = current.parent.value;
        current.parent.value = current.value;
        current.value = copyOfParent;
        current = current.parent;
      }
      else break;
    }
    this.lastAdded = node;

  }
  /**
   * return the root order traversal
   * @public
   * @recursive
   * @return {string} -a string representation of the heap
   */
  rootOrder() {
    let size = Math.pow(2, this.getDepth( this.root ) ) - 1;
    /**
     * The size of the array is going to be the 2 to the depth minus one
     * because it's a tree. Nulls are included.
     * Proof: First level is 1 = 2^0, second level is 2 children = 2^1,
     * 3rd level is 2^2 = 4 ... Therefore the size is 2^depth minus one.
     */ 
    if ( size === 0 ) return "||" ; 
    let arr = new Array( size ); // the array representation of the heap
    /** example [ 1, 2, N ] for the tree 
     *    2
     *   / \
     *  1   N
     */
    let isNotNull = new Array( size );
    // an array that tells if the current index isn't null. Lines up with arr.
    arr[ 0 ] = this.root.value; 
    rootHelper( this.root, 0 );
    isNotNull[ 0 ] = true;
    // concatanate the arr into a string and return it
    let res = "|"; 
    for ( var i = 0; i < size; i++ ) {
      if ( isNotNull[ i ] ) {
        res += arr[ i ].toString() + ", ";
      }
      else {
        res += "N, ";
      }
    }
    return res.substring( 0, res.length - 2 ) + "|";
    /**
     * @recursive
     * @param {node} parent - the current TODO explain this
     */   
    function rootHelper( parent, index ) {
      if ( !parent ) return; 
      if ( parent.leftChild ) {
        arr[ 2*index + 1 ] = parent.leftChild.value;
        isNotNull[ 2*index + 1 ] = true;
        rootHelper(  parent.leftChild, 2*index + 1 );
      }
      if ( parent.rightChild ) {
        arr[ 2*index + 2 ] = parent.rightChild.value;
        isNotNull[ 2*index + 2 ] = true; 
        rootHelper(  parent.rightChild, 2*index + 2 ) ;
      }
    } 
  }
  /**
   * return the Depth of the of heap
   * the depth is defined as the number of edges from 
   * the node to the tree's root node
   * @public
   * @recursive
   * @return {int} - the depth
   */
  getDepth( root ) {
    return depthHelper( root ); 
    function depthHelper( rootNode ) {
      if ( !rootNode ) {
        return 0;
      }
      let leftChild = depthHelper( rootNode.leftChild );
      let rightChild = depthHelper(rootNode.rightChild );
      // defined as the max of the depth of the left tree and right tree
      // plus 1 because the current node is also counted for the depth
      return Math.max( rightChild, leftChild ) + 1;
    }
  }
  /**
   * remove the max item (the root) or the heap
   * o(log n)
   * @public
   * @return {node.value} - the removed node Value
   */
  pop( ){
    // step 1: swap root with last added, remove last added
    let max = this.root.value;
    this.root.value = this.lastAdded.value;
    if ( this.lastAdded.parent.leftChild == this.lastAdded ){
      this.lastAdded.parent.leftChild = null
    }
    if ( this.lastAdded.parent.right == this.lastAdded ){
      this.lastAdded.parent.right = null
    }
    // step 2: swap down until legal heap
    let current = this.root;
    while ( current ){
      if ( current.leftChild &&
           current.value.lessThanOrEqualTo( current.leftChild.value ) ) {
        let copyOfCurrent = current.value;
        current.value = current.leftChild.value;
        current.leftChild.value = copyOfCurrent;
        current = current.leftChild;
      }
      else if ( current.rightChild &&
                current.value.lessThanOrEqualTo( current.rightChild.value ) ) {
        let copyOfCurrent = current.value;
        current.value = current.rightChild.value;
        current.rightChild.value = copyOfCurrent;
        current = current.rightChild;
      }
      else break;
    }
    return max; 
  }

}



function assert(condition, message) {
  if (!condition) {
    message = message || "Assertion failed";
    if (typeof Error !== "undefined") {
        throw new Error(message);
    }
    throw message; 
  }
}