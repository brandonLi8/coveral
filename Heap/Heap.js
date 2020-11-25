/**
 * Coveral
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
 *    have a LessThanOrEqualTo method that defines if a value is <= than
 *    another. It also should provide a toString method if you want the root
 *    order traversal. Demo on PlannerNode.js
 */
'use strict';

// import modules
import Node from "./Node.js";
// modules

export default class Heap {
  /**
   * @constructor
   * @param {Node} - the default values of a heap
   * @public
   */
  constructor( ...args ){
    // @public
    this.root;
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
      if ( !rootNode.leftChild.rightChild || !rootNode.leftChild.leftChild ){
        addNormally( rootNode.leftChild )
      }
      else if ( !rootNode.rightChild.rightChild ||
                !rootNode.rightChild.leftChild){
        addNormally( rootNode.rightChild )
      }
      else addNormally( rootNode.leftChild )
    }

    // compare with its parent, and swap up.
    let current = node;
    while ( current ){
      if ( current.parent &&
           current.parent.value.lessThanOrEqualTo( current.value ) ){
        let copyOfParent = current.parent.value;
        current.parent.value = current.value;
        current.value = copyOfParent;
        current = current.parent;
      }
      else break;
    }
  }
  /**
   * return the root order traversal in a list format
   * @private
   * @recursive
   * @return {object } {
   *   rootOrder: arr - the array representation of the NODE.
   *   isNotNull: - the array that tells if a given index is null for arr.
   *   size: size: - the size of the array
   * };
   */
  rootOrderList(){
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
    arr[ 0 ] = this.root;
    rootHelper( this.root, 0 );
    isNotNull[ 0 ] = true;
    /**
     * @recursive
     * @param {node} parent - the current TODO explain this
     * o(n) recursive, looks at each element in the tree.
     */
    function rootHelper( parent, index ) {
      if ( !parent ) return;
      if ( parent.leftChild ) {
        arr[ 2*index + 1 ] = parent.leftChild;
        isNotNull[ 2*index + 1 ] = true;
        rootHelper(  parent.leftChild, 2*index + 1 );
      }
      if ( parent.rightChild ) {
        arr[ 2*index + 2 ] = parent.rightChild;
        isNotNull[ 2*index + 2 ] = true;
        rootHelper(  parent.rightChild, 2*index + 2 ) ;
      }
    }
    return {
      rootOrder: arr,
      isNotNull: isNotNull,
      size: size
    };
  }
  /**
   * return the root order traversal
   * @public
   * @return {string} -a string representation of the heap
   */
  rootOrder() {
    let rootOrder = this.rootOrderList()
    let arr = rootOrder.rootOrder;
    let isNotNull = rootOrder.isNotNull;
    // concatanate the arr into a string and return it
    let res = "|";
    for ( var i = 0; i < rootOrder.size; i++ ) {
      if ( isNotNull[ i ] ) {
        res += arr[ i ].value.toString() + ", ";
      }
      else {
        res += "N, ";
      }
    }
    return res.substring( 0, res.length - 2 ) + "|";
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
      let rightChild = depthHelper( rootNode.rightChild );
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
    if ( !this.root ) return;
    if ( !this.root.leftChild && !this.root.rightChild ) {
      let popped = this.root.value;
      this.root = null;
      return popped;
    }
    let popped = this.root.value; // save it to return it
    // step 1: get the last added from root order.
    let rootOrder = this.rootOrderList();
    let arr = rootOrder.rootOrder;
    let isNotNull = rootOrder.isNotNull;
    let lastAdded;
    for ( var i = rootOrder.size - 1; i >= 0 ; i-- ){
      if ( isNotNull[ i ] ) {
        lastAdded = arr[ i ];
        break;
      }
    }
    // step 2: swap root with last added, remove last added
    this.root.value = lastAdded.value;


    if ( lastAdded.parent.leftChild == lastAdded ){
      lastAdded.parent.leftChild = null;
    }
    if ( lastAdded.parent.rightChild == lastAdded ){
      lastAdded.parent.rightChild = null;
    }
    lastAdded.dispose();

    // step 3: swap with the max of the children down until it's legal heap
    let current = this.root;

    while ( current ){
      let currentValue = current.value;

      let max;
      if ( current.leftChild && current.rightChild ){
        if ( !current.leftChild.value.lessThanOrEqualTo(
                                        current.rightChild.value ) ){
          max = current.leftChild;
        }
        else{
          max = current.rightChild;
        }
      }
      if ( current.leftChild && !current.rightChild ){
        max = current.leftChild;
      }
      else if ( current.rightChild && !current.leftChild ){
        max = current.rightChild;
      }

      if ( max && current.value.lessThanOrEqualTo( max.value ) ) { // swap
        let copyOfCurrent = current.value;
        current.value = max.value;
        max.value = copyOfCurrent;
        current = max;
      }
      else break;
    }
    return popped;
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