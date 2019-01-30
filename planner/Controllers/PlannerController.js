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
var view = new PlannerView(); // this will render the header
var model = new PlannerModel();
// instance data
/**
 * @public 
 * the button that removes all plans from the heap;
 */
//  

// let reset =   JSON.stringify({ data: new Heap( new Node(5) )  } );
//   localStorage.setItem( "data", reset );
//   let h = JSON.parse(localStorage.getItem("data"))["data"];
//   console.log( h )

// removeAll.addEventListener( "click", function() {
//   let data = localStorage.getItem("data");
//   if ( !data ) return;
//   let reset =   { data: new Heap( new Node(5) )  } ;
//   localStorage.setItem( "data", reset );
//   console.log( JSON.parse( localStorage.getItem("data") ) )
// } );
/**
 * @public 
 * provide a class for outside modules
 */

// console.log(localStorage, typeof localStorage);
model.clear()
model.add( new PlannerNode( 7, "title", "description", ["adfa", "ERf"]))

model.add( new PlannerNode( 9, "title", "description", ["er", "ER"]))
// console.log( model.getHeap().toString())

// export default class PlannerController{
//   /**
//    * @public 
//    * render everything from the model in order by popping elements from a heap.
//    */
//   renderInOrder(){
    

//     let current = heap.pop();
//     console.log(current)
//     while ( current ){
//       view.addCard( 
//         current.title, parseInt(current.value), 
//         current.description, current.tags );
//       current = heap.pop();
//     }
//   }

// }

// let data = JSON.parse( localStorage.getItem("data") );
// // // if the data doesn't exist create it
// if ( !data ){
//   localStorage.setItem("data", JSON.stringify({}));
//   data = JSON.parse( localStorage.getItem("data") );
// }

// data[ "1" ] = {
//   title: "lmao",
//   description: "daldkfnaldsknfa",
//   value: "9",
//   tags: ["2", "#342"]
// };
// data[ "2" ] = {
//   title: "lmao",
//   description: "daldkfnaldsknfa",
//   value: "10",
//   tags: ["2", "#342"]
// };
// localStorage.setItem("data", JSON.stringify({ data }));

// console.log(JSON.parse(localStorage.getItem("data")))

// // render in order
// let controller = new PlannerController();
// controller.renderInOrder();


// localStorage.removeItem("data");





