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
 * Use the addEventListener method. Event types are the same as the default
 * document events ie mousedown, keydown, etc.
 *
 */

"use strict";
export default class Node {
  /**
   * Creates a Node with options that can overide the defaults.
   * The defaults are const defaults = {...
   * @public
   * @constructor
   *
   * @param {Object} [options] - Object with its attributes.
   * 
   */
  constructor( options ){
    // alias self
    var self = this;

    // the defualts 
    const defaults = {
      // {string} @optional
      type: "div", 
      // {string} @optional
      id: null, 
      // {string} @optional null means no text, otherwise use a string
      text: null, 
      // {string} @optional null means no text, otherwise use a string
      innerHTML: null,
      // {string} @optional the class of the node.
      class: null,
      // {object} @optional style the node
      style: null,
      // ONLY on type "img" @optional {string}
      src: null, 
      // {boolean} is it draggable?
      draggable: false, 

      // {function} only on draggable = true, function called on drag
      drag: null, 

      // {function} only on draggable = true, function called on drag release
      dragClose: null

    }
    // merge them with options overriding
    const attributes = { ...defaults, ...options }; 
    // create the type of child
    // @public {DOM} - the actual object for html
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
    // create the innerHTML
    if ( attributes.innerHTML ){
      this.DOMobject.innerHTML = attributes.innerHTML;
    }
    // set style
    if ( attributes.style ){
      this.setStyle( attributes.style )
    }
    
    // @public {array}
    this.children = [];

    // @public {node}
    this.parent = null;

    // on image nodes set the image if given
    if ( attributes.src && attributes.type === "img" ){
      this.DOMobject.src = attributes.src;
    }

    // @public {object} the attributes to the node. This will not listen to
    // in class id etc..
    this.attributes = attributes;

    if ( attributes.draggable && attributes.draggable === true ) 
      this.setupDrag();
    
  }
  /**
   * Sets up the node to be draggable.
   * @public
   *
   */
  setupDrag(){
    let node = this.DOMobject;
    let attributes = this.attributes;
    // keep track of positions
    var position1 = 0, position2 = 0, position3 = 0, position4 = 0;
    // start drag event listener
    node.onmousedown = dragMouseDown;

    function dragMouseDown( event ) {
      event = event || window.event;
      event.preventDefault();
      // mouse cursor
      position3 = event.clientX;
      position4 = event.clientY;

      document.onmouseup = closeDrag;
      document.onmousemove = drag;
    }

    function drag( event ) {
      event = event || window.event;
      event.preventDefault();
      // new position
      position1 = position3 - event.clientX;
      position2 = position4 - event.clientY;
      position3 = event.clientX;
      position4 = event.clientY;
      node.style.top = node.offsetTop - position2  + "px";
      node.style.left = node.offsetLeft - position1 + "px";
      if ( attributes.drag )
        attributes.drag() // call user provided
    }

    function closeDrag() {
      // on the release
      document.onmouseup = null; // remove event listeners
      document.onmousemove = null;

      if ( attributes.dragClose ) // call user provided
        attributes.dragClose();
    }
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
    if ( this.parent == document.getElementsByTagName( "body" )[ 0 ] ){
      this.parent.removeChild( this.DOMobject )
      this.parent = null;
      return;
    }
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
    return this.DOMobject.className;
  }
  /**
   * change the style of the node;
   * @param {object} options - the attributes that are changing
   */
  setStyle( options ){
    if ( !options ) return;
    let keys = Object.keys( options );
    for ( var i = 0; i < keys.length; i++ ){
      this.DOMobject.style[ keys[ i ] ] = options[ keys[ i ] ];
    }
  }
  // **ANIMATIONS**

  /**
   * Uses Web Animations API
   * Animates the node @custom
   * @public 
   * @animation
   * @param options {
   *    animation: @required {Array} 
   *    timing: @required {object}
   * }
   * @return {animation} - the animation object
   */
  newAnimation( options ){
    /**
     * The animation property of the object desribes where the animation goes
     * The timing describes the looping/ timing of the animation
     * Example Usage:
     * Node.newAnimation({
     *   animation: [
     *     { transform: "translateY( 0 )" },
     *     { transform: "translateY( -80% )" }
     *   ],  // this moves it upwards
     *   timing: {
     *     fill: "forwards", // keeps it still at the end
     *     duration: 500 // milliseconds
     *   }
     * });
     */
    return this.DOMobject.animate( options.animation, options.timing );
  }
  /**
   * Animate by moving vertically
   * @param {string} amount - express how much to go down or up by
   * this can be expressed in rem, px, % etc.
   * @param duration {number} milliseconds of the duration of the animation
   */
  moveVertically( amount, duration ){
    return this.newAnimation({
      animation: [
        { transform: "translateY( 0 )" },
        { transform: "translateY(" + amount + ")"}
      ], 
      timing: {
        fill: "forwards",
        duration: duration
      }
    });
  }
  /**
   * Animate by moving horizontally
   * @param {string} amount - express how much to go left or right by
   * this can be expressed in rem, px, % etc.
   * @param duration {number} milliseconds of the duration of the animation
   */
  moveHorizontally( amount, duration ){
    return this.newAnimation({
      animation: [
        { transform: "translateX( 0 )" },
        { transform: "translateX(" + amount + ")"}
      ], 
      timing: {
        fill: "forwards",
        duration: duration
      }
    });
  }
  /**
   * Animate by moving horizontally ( jiggle )
   * @param {number} duration - the time in ms of the animation
   */
  jiggle( duration ){
    return this.newAnimation({
      animation: [
        {  transform: "translate3d( -4px, 0, 0 )" },
        {  transform: "translate3d( 6px, 0, 0 )" },
        {  transform: "translate3d( -6px, 0, 0 )" },
        {  transform: "translate3d( 4px, 0, 0 )" }
      ],
      timing: {
        fill: "forwards",
        duration: duration
      }
    });
  }
  /**
   * enlarge the node
   * @param {number} duration - the time in ms of the animation
   */
  enlarge( duration ){
    return this.newAnimation({
      animation: [
        {  transform: "scale( 1, 1 )" },
        {  transform: "scale( 1.2, 1.2 )" },
      ],
      timing: {
        fill: "forwards",
        duration: duration
      }
    });
  }
  /**
   * add a border around the sides
   * @param {string} changeX - the amount to change x in
   * Still in development!
   */
  addBorderAnimation( duration, padding ){
    return this.newAnimation({
      animation: [
        {  border:  "none", padding: "0" },
        {  border: "2px solid red", padding: padding },
      ],
      timing: {
        fill: "forwards",
        duration: duration
      }
    });
  }
}
