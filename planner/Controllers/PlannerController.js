/**
 * Learning App
 * PlannerController.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/27/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - create instance of view and the view.
 *  - tell the view to create a header with basic structure
 *  - look at local storage and render it.
 */

'use strict';
// import modules
import PlannerView from "../Views/PlannerView.js";
import PlannerModel from "../Models/PlannerModel.js";
import PlannerNode from "../Models/PlannerNode.js";

// create the instances for the view and the model
var view = new PlannerView( ); 
var model = new PlannerModel( );

/**
 * @public 
 * provide a class for outside modules
 */
export default class PlannerController{
  /**
   * @public 
   * render the planner page
   */
  run( ){
    this.renderBasics();
    this.renderInOrder();
  }
  /**
   * @public 
   * render the header
   */
  renderBasics( ){
    /**
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
      window.open( "/planner/new.html", "_self" ) 
    }
    newPlan.style.border = "none";
    // add the remove all
    let removeAll = view.addLinkToHeader( "Remove All" );
    removeAll.style.border = "none"
    removeAll.onclick = function( ){
      model.clear();
    };
    // create instance data
    this.header = header;
    this.plannerIcon = plannerIcon;
    this.help = help;
    this.newPlan = newPlan;
    this.removeAll = removeAll;
  }
  /**
   * @public 
   * render everything from the model in order by popping elements from a heap.
   */
  renderInOrder(){
    let heap = model.getHeap( );
    let current = heap.pop();
    if( !current ){
      view.displayNone();
    }
    while ( current ){
      view.addCard( 
        current.title, 
        parseInt( current.value ), 
        current.description, 
        current.tags, 
        current.identifier,
        this.removeNode 
      );
      current = heap.pop();
    }
  }
  /**
   * @public 
   * sumbit a new node on to the the model (doesn't refresh the screen)
   */
  submit( title, description, value, tags ){
    model.add( new PlannerNode( value, title, description, tags ) );
  }
  /**
   * @private
   * called when trash can is pressed
   * remove the node from the model and the view.
   */
  removeNode( ){
    // this is the image dom node
    let id = this.id;
    model.removeNode( id ); // remove it from the model
    // update display
    view.removeCard( id );
  }

}


