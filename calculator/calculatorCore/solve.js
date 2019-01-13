/*  js: module
  * appendDiv.js
  * learning app
  * Created by Brandon Li on 1/11/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */
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
 // export default class Screen {