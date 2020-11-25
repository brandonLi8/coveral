/**
 * Coveral
 * New.js
 *
 * @author Brandon Li <brandon.li820@icloud.com>
 * Created on 1/30/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - Display the contents to a new plan and send it to the controller.
 */

// import modules
import PlannerController from "../../Controllers/PlannerController.js"
// modules
var controller = new PlannerController();

import Form from "../Form.js"
var form = new Form( {
  page: "New Plan",
  title: "",
  description: "",
  value: 10,
  tags: "",
  tagsPlaceholder: "#tag1, #tag2",
  submit: function( title, description, slider, tags ) {
    // concat the tags into an array
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
    controller.submit(
        title.value, description.value,
        slider.getValue(), reduced
    );
    window.open( "../planner", "_self" )
  }

} );

String.prototype.trim = function () {
  // remove the white space characters
  return this.replace( /^\s*/, "" ).replace( /\s*$/, "" );
}