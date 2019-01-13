/*  js: module
  * appendDiv.js
  * learning app
  * Created by Brandon Li on 1/11/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */

 /*  
    export module to add a div with specified contents/attributes
    user can specify the parent (both id and class name) or the 
    pointer to the actual parent (no id/classname needed)
 */
"use strict";
export default class AppendDiv {
  /**
   * main method to add a div: it creates the div and appends it to the parent
   * @param {String} type - the type of div, ex :"h1"
   * @param {String} id - the Id of the new div. Can be "" if user doesn't want an id
   * @param {String} className- the Class of the new div. Can be "" if user doesn't want an class
   * @param {text} text - the text for the new div. Can be ""
   * @param {String} parentType; either "class", "id", "given", or "none" specifies the parent type, 
     "given" means the user will give an exact parent
     "none" means to not add the div but to just get the div
   * @param {String} parentString; the id/class name (based on parentType)
   * @param {String} parent; the actual parent-only if parentType == "given"
   */
   // @private
  addDiv(type, id, className, text, parentType, parentString, parent){
    var newDiv = document.createElement(type);//create element
    //set attibutes
    newDiv.setAttribute("id", id);
    newDiv.className = className;
    //create text
    var newHeading = document.createTextNode(text); 
    newDiv.appendChild(newHeading); 

    if (parentType === "class"){
      let parents = document.getElementsByClassName(parentString);
      parents[0].appendChild(newDiv);
    }
    else if (parentType === "id"){
      document.getElementById(parentString).appendChild(newDiv);
    }
    else if (parentType === "given"){
      //user specified parent
      parent.appendChild(newDiv);
    }
    return newDiv; //"none" will only execute the return
  }
  //@public
  toParentId(type, id, className, text, parent) {
     //add a div to a user specified id
     return this.addDiv(type, id, className, text, "id", parent);
  }
  //@public
  toClass(type, id, className, text, parent){
    return this.addDiv(type, id, className, text, "class", parent);
  }
  //@public
  getNewDiv(type, id, className, text){
    return this.addDiv(type, id, className, text, "none");
  }
  //@public
  toParentNode(type, id, className, text, parentNode){
    return this.addDiv(type, id, className, text, "given", "", parentNode);
  }
  //@param parentType is the query selector
  byType(typeOfChild, id, className, text, parentType){
    var parent = document.getElementsByTagName(parentType)[0];
    return this.toParentNode(typeOfChild, id, className, text, parent);
  }

}