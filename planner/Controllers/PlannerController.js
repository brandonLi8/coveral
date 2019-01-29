/**
 * Learning App
 * PlannerController.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/27/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - create instance of view ( the model is the local storage )
 *  - tell the view to create a header with basic structure
 *  - look at local storage and render it.
 *  - provide a class that can be imported that allows outside modules to
 *    render the model.
 */

'use strict';
// import modules
import PlannerView from "../Views/PlannerView.js";
import Heap from "../../Heap/Heap.js";
import Node from "../../Heap/Node.js";
import PlannerNode from "../Models/PlannerNode.js"
// modules
var view = new PlannerView(); // this will render the header


/**
 * @public 
 * provide a class for outside modules
 */
export default class PlannerController{
  /**
   * @public 
   * render everything from the model in order by popping elements from a heap.
   */
  renderInOrder(){
    var heap = new Heap( );
    let data;
    try{ data = JSON.parse( localStorage.getItem("data") )[ "data" ]; }
    catch( err ){ 
      return; 
    }
    if ( !data ) return;
    Object.keys( data ).forEach( function( key ) {
    let current = data[ key ];

    heap.add( new Node( new PlannerNode( 
                            parseInt( current.value ), 
                            current.title, 
                            current.description,
                             current.tags ), 
                null, 
                null) )
    });

    let current = heap.pop();
    while ( current ){
      view.addCard( 
        current.title, parseInt(current.value), 
        current.description, current.tags );
      current = heap.pop();
    }
  }

}

let data = JSON.parse( localStorage.getItem("data") );
// if the data doesn't exist create it
coif ( !data ){
  localStorage.setItem("data", JSON.stringify({}));
  data = JSON.parse( localStorage.getItem("data") );
}
data[ "1" ] = {
  title: "lmao",
  description: "daldkfnaldsknfa",
  value: "9",
  tags: ["2", "#342"]
};
data[ "2" ] = {
  title: "lmao",
  description: "daldkfnaldsknfa",
  value: "10",
  tags: ["2", "#342"]
};
localStorage.setItem("data", JSON.stringify({ data }));


// render in order
let controller = new PlannerController();
controller.renderInOrder();


// localStorage.removeItem("data");

localStorage.removeItem("data");
