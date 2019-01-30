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
import PlannerModel from "../Models/PlannerModel.js"
// modules
// create the instances for the view and the model
var view = new PlannerView( ); 
var model = new PlannerModel( );
/**
 * Intance Data
 * Set up the header and its children.
 */
let header = view.addHeader( );

let plannerIcon = view.addImageToHeader( );
// add events
plannerIcon.setAttribute( "src", "./assets/plannerTBackground.png" );
// handle user input
plannerIcon.onmouseover = function() { 
  plannerIcon.setAttribute( "src", "./assets/plannerTBackgroundHover.png" );
};
plannerIcon.onmouseout = function() { 
  plannerIcon.setAttribute( "src", "./assets/plannerTBackground.png" );
};
// back to dashboard button
let backToDashboard = view.addLinkToHeader( "Back To Dashboard" );
backToDashboard.onclick = function(){
  window.open( "../dashboard.html", "_self" ) 
}
backToDashboard.style.border = "none";
// add the help button
let help = view.addLinkToHeader( "Help" )
help.onclick = function(){
  window.open( "./help.html", "_self" ) 
}
help.style.border = "none";
// add the new plan button
let newPlan = view.addLinkToHeader( "New" );
newPlan.onclick = function(){
  window.open( "../new.html", "_self" ) 
}
newPlan.style.border = "none";
// add the remove all
let removeAll = view.addLinkToHeader( "Remove All" )
removeAll.style.border = "none"
removeAll.onclick = function( ){
  model.clear();
};

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
    let heap = model.getHeap( );
    let current = heap.pop();
    while ( current ){
      view.addCard( 
        current.title, parseInt(current.value), 
        current.description, current.tags );
      current = heap.pop();
    }
  }
}

let controller = new PlannerController();
controller.renderInOrder();






