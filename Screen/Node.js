/**
 * Portfolio
 * Node.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/12/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * File for Node.js
 * Supported for DOM
 *
 * ## Description of nodes:
 *
 * For the Document Object Model used in HTML, the output is determined by a 
 * tree. Every node has a parent a nodes children will be displayed if the node
 * is being displayed. Typically there is one root node that is passed around.
 *
 * For example, nodes A, B, C, D and E:
 * - B is a child of A (thus A is a parent of B)
 * - C is a child of A (thus A is a parent of C)
 * - D is a child of C (thus C is a parent of D)
 * - E is a child of C (thus C is a parent of E)
 * where A would be the root node. Visual representation: 
 *   A
 *  / \
 * B   C
 *    / \
 *   D   E
 *
 * Additionally, in this case:
 * - D is a 'descendant' of A 
 * (due to the C being a child of A, and D being a child of C)
 * - A is an 'ancestor' of D (due to the reverse)
 * - C's 'subtree' is C, D and E,
 *  which consists of C itself and all of its descendants.
 *
 *
 * ## Creating nodes
 *
 * Generally, there are two types of nodes:
 * - Nodes that don't display anything, but serve as a container for other nodes
 * - Nodes that display content, but ALSO serve as a container
 *
 * When a node is created with the default Node constructor, e.g.:
 *   cont node = new Node();
 * then that node WILL NOT display anything by itself.
 * 
 * IMPORTANT:
 * Node.js is used for creating nodes. It is only used for adding a node to a
 * new node. This means you must have the pointer to the node itself and its
 * child.
 *
 * If you want to add a node to a ID or a ClassName or a document type 
 * (body etc.) you must use ScreenView.js
 *
 * ScreenView.js should be used for creating the basic tree as it creates the
 * root.
 *
 * To make a 'childNode' become a 'parentNode', the typical way is to call 
 * addChild():
 *   parentNode.addChild( childNode );
 *
 * To remove this connection, you can call:
 *   parentNode.removeChild( childNode );
 *
 * ## Events
 * The user must provide the functions when a event is triggered.
 */


"use strict";
export default class Node {
  /**
   * Creates a Node with options.
   * @public
   * @constructor
   *
   * @param {Object} [options] - Object with its attributes.
   * information of the default options is inside (const defualts ...)
   */
  constructor( options ){
    // the defualts 
    const defaults = {
      type: "div", // @optional
      id: null, // @optional
      text: null, // @optional null means no text, otherwise use a string
      innerHTML: null,
      class: null,
      style: null
    }
    // merge them with options overriding
    const attributes = { ...defaults, ...options }; 
    // create the type of child
    // @Public {DOM} - the actual object for html
    this.DOMobject = document.createElement( attributes.type ); 
    // set attributes
    if ( attributes.id ){ 
      this.DOMobject.setAttribute( "id", attributes.id );
    }
    if ( attributes.class ){
      this.DOMobject.className = attributes.class;
    }
    // create the text child
    if ( attributes.text ){
      var textNode = document.createTextNode( attributes.text ); 
      this.DOMobject.appendChild( textNode ); 
    }
    if ( attributes.innerHTML ){
      this.DOMobject.innerHTML = attributes.innerHTML;
    }
    if ( attributes.style ){
      this.setStyle( attributes.style )
    }
    // create instance data
    this.children = [];
    this.parent = null;
  }
  /**
   * Get the parent DOM OBJECT
   * @return {DOM} - the dom element
   */
  get parentDOM(){
    return this.DOMobject.parentElement
  }
  /**
   * Get the parent NODE
   * @return {Node} - the node element
   */
  get parentNode(){
    return this.parent;
  }
  /**
   * Add a NODE
   * @param {Node} otherNode - the child of this node
   */
  addChild( otherNode ){
    if ( this.children.includes( otherNode ) ) return;
    this.children.push( otherNode );
    otherNode.parent = this;
    this.DOMobject.appendChild( otherNode.DOMobject ); 
  }
  /**
   * Add a list of nodes
   * @param {Array<Node>} children - list of the children being added
   */
  appendChildren( children ){
    for ( var i = 0 ; i < children.length; i++ ){
      this.addChild( children[ i ] );
    }
  }
  /**
   * Remove all children
   * @param {Array<Node>} children - list of the children being added
   */
  removeAllChildren(){
    // children have to exist first
    if ( this.children.length == 0 ) return;
    while ( true ){
      let removedNode = this.children[ 0 ];
      if ( !this.removeChild( removedNode ) ) break;

    }
  }
  /**
   * Remove a child
   * @param {node} node - the node being removed
   * @return {bool} if the node is a child or not
   */
  removeChild( node ){
    if ( !node ) return;
    if ( this.children.includes( node ) ) {
      // remove it from the list
      this.children.splice( this.children.indexOf( node ), 1 );
      this.DOMobject.removeChild( node.DOMobject );
      node.parent = null;
      return true;
    }
    return false;
  }
  /**
   * Create a event listener 
   * @param {String} event - the even (keydown etc.)
   * @param {function} callBack - event caled when event happens
   */
  addEventListener( event, callBack ){
    this.DOMobject.addEventListener( event, callBack );
  }
  /**
   * Remove itself ( children preserved ) 
   */
  dispose( ){
    if ( !this.parent ) return;
    this.removeAllChildren();
    this.parent.removeChild( this );
    this.parent = null;
  }
  /**
   * get the id
   */
  get id(){
    return this.DOMobject.id;
  }
  /**
   * get the class 
   */
  get class(){
    console.log( this.DOMobject.className)
    return this.DOMobject.className;
  }
  /**
   * change the style of the node;
   * @param {object} options - the attributes that are changing
   */
  setStyle( options ){
    let keys = Object.keys( options );
    for ( var i = 0; i < keys.length; i++ ){
      this.DOMobject.style[ keys[ i ] ] = options[ keys[ i ] ];
    }
  }

}
