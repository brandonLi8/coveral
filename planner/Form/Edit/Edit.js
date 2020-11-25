/**
 * Coveral
 * Edit.js
 *
 * @author Brandon Li <brandon.li820@icloud.com>
 * Created on 2/2/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - Display contents based on what node is being edited
 */
'use strict';

import PlannerController from "../../Controllers/PlannerController.js"
import Form from "../Form.js"
import PlannerNode from "../../Models/PlannerNode.js";
// modules
var controller = new PlannerController();

// get the current node that is being edited
let node = JSON.parse( localStorage.getItem( "edit" ) );
let tags = node.tags;
let tagStr = "";
tags.forEach( function( element ){
  tagStr += "#" + element + ", ";
} );

var form = new Form( {
  page: "New Plan",
  title: node.title,
  description: node.description,
  value: node.value,
  tags: tagStr,
  tagsPlaceholder: "",
  submit: function( title, description, slider, tags ) {
    // concat the tags into an array
    console.log( slider )
    let reduced = []
    if ( tags.value.length > 0 ){
      let string = tags.value;
      var result = string.split( '#' ).map(
                          element => element.split( ',' ) ).reduce(
                                    ( acc, curr ) => acc.concat( curr ) );
      result.forEach( function( element ){
        if ( element.trim().length !== 0 ) reduced.push( element )
      }  );
    }
    controller.changeNode(
      new PlannerNode(
          parseInt( slider.getValue() ),
          title.value,
          description.value,
          reduced,
          node.identifier
    ) );
    window.open( "../planner", "_self" )

  }

} );

String.prototype.trim = function () {
  // remove the white space characters
  return this.replace( /^\s*/, "" ).replace( /\s*$/, "" );
}