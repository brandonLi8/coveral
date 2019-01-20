/**
 * Learning App
 * ScreenView.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/12/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - methods to add children to any type of node
 */
"use strict";
export default class ScreenView {
  /**
   * add child to a parent
   * @public
   * @param {String} type - the type of child ex: "h1", "div" etc.
   * @param {String} id - the id of the NEW child. 
   * @param {String} className - the class of the NEW child. 
   * @param {String} text - the text for the new child. 
   * @param {String} parentType:
      - "class" means adding the child to the first instance with the CLASS name 
      - "given" means adding the child to  an exact parent with a pointer
      - "none" means to not add the Child and return the child
      - "id" means adding the child to the first instance with the ID name
   * @param {String} parentString - the id/className of the parent. 
   * Ignored if parentType is "none" or "given"
   * @param {String} parent - the actual parent.
   * Only used if parentType == "given"
   * @return {newChild} the node added
   */
  addChild( type, id, className, text, parentType, parentString, parent ){
    var newChild = document.createElement( type ); // create element
    // set attibutes
    newChild.setAttribute( "id", id );
    newChild.className = className;
    // create text child and add it to the new child. 
    var newHeading = document.createTextNode( text ); 
    newChild.appendChild( newHeading ); 
    // append the child to the parent
    if ( parentType === "class" ){
      let parents = document.getElementsByClassName( parentString );
      parents[ 0 ].appendChild( newChild );
    }
    else if ( parentType === "id" ){
      document.getElementById( parentString ).appendChild( newChild );
    }
    else if ( parentType === "given" ){
      parent.appendChild( newChild );
    }
    return newChild;
  }
  /**
   * add a child to a user given ID
   * @public
   */
  addChildToParentId( type, id, className, text, parentId ) {
     return this.addChild( type, id, className, text, "id", parentId );
  }
  /**
   * add a child to a user given CLASS
   * @public
   */
  addChildToParentClass( type, id, className, text, parentClassName ){
    return this.addChild( type,
                          id, 
                          className, 
                          text, 
                          "class", 
                          parentClassName );
  }
  /**
   * create a child an return it
   * @public
   */
  createChild( type, id, className, text ){
    return this.addChild( type, id, className, text, "none" );
  }
  /**
   * add a child to a user given Parent pointer
   * @public
   */
  addChildToParentNode( type, id, className, text, parentNode ){
    return this.addChild( type, 
                          id, 
                          className, 
                          text, 
                          "given", 
                          null, 
                          parentNode );
  }
  /**
   * add a child to a user given type of parent. ex: "body", "html" etc. 
   * @public
   */
  addChildToParentType( typeOfChild, id, className, text, parentType ){
    var parent = document.getElementsByTagName( parentType )[0];
    return this.addChildToParentNode( typeOfChild,
                                      id, 
                                      className, 
                                      text, 
                                      parent );
  }

}