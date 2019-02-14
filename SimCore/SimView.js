/**
 * Learning App
 * SimView.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/13/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Create a tree with the beginning nodes filled ( background, footer etc.)
 */

import ScreenView from "../Screen/ScreenView.js";
import Node from "../Screen/Node.js";

"use strict";
export default class Sim {
  /**
   * Creates a Node representation of the beggining nodes of the sim
   * @public
   * @constructor
   *
   * @param {object} options - options {
   *  title: {string} - the title of the sim @required
   *  backgroundSrc: {string} - the src of the background image @required
   *  home: {string} - the url to the home page (usually the sim page)
   *  author: {string} - the author of the sim
   * }
   */
   constructor( options ){
    this.simWrapper = new Node({
      id: "sim_wrapper",
      style: {
        height: "100%",
        width: "100%",
        position: "relative",
        background: "url(" + options.backgroundSrc + ")"
      }
    });
    // this.simWrapper.DOMobject.src = options.backgroundSrc;
    // the are for the sim
    this.sim = new Node({
      id: "sim",
      style: {
        margin: "0",
        height: "92%", // the footer is the remaining 8%
        width: "100%",
        position: "relative",
      }
    })
    this.footer = new Node({
      id: "footer",
      style: {
        width: "100%",
        height: "8%",
        margin: "0",
        color: "#fff",
        bottom: "0",
        left: "0",
        background: "#000",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        marginBottom: "0",
        boxShadow: "0 -3px 0 0 rgba( 50, 50, 50, 0.2 )"
      }
    });


    this.homeButton = new Node({
      type: "img",
      style: {
        width: "60px",
        position: "absolute",
        left: "50px"
      }
    })

    this.homeButton.DOMobject.src = "../SimCore/home.png";
    this.homeButton.addEventListener( "mouseover", function(){
      this.src = "../SimCore/homeHover.png";
      this.style.cursor = "pointer";
    });
    this.homeButton.addEventListener( "mouseout", _ =>
      this.homeButton.DOMobject.src = "../SimCore/home.png"
     );
    this.homeButton.addEventListener( "mousedown", function(){
      window.open( options.home, "_self" )
    } );

    this.footer.addChild( this.homeButton )
    this.simWrapper.appendChildren([ this.sim, this.footer ])

    this.screenView = new ScreenView( this.simWrapper )
    this.screenView.dispose();
  } 
}