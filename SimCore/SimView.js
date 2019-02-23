/**
 * Portfolio
 * CheckButton.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/18/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * This well create a tree that you can add to your tree which represents a 
 * button that contains a image.
 *
 * A Node that takes a image, its hover image (optional), and text (optional)
 * that is a button. The user will provide the styling and the listener function
 * when the button is pressed
 *
 *  img <- root ( the actual button)
 *
 */

import Node from "../Screen/Node.js";
import ImageButton from "../Buttons/ImageButton.js";
import TextPushButton from "../Buttons/TextPushButton.js";
import CheckButton from "../Buttons/CheckButton.js";


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
   *
   */
   constructor( options ){

    // @public {node} the whole screen
    this.simWrapper = new Node({
      id: "sim_wrapper",
      style: {
        height: "100%",
        width: "100%",
        position: "relative",
        margin: "0",
        padding: "0"
      }
    });

    // @public {node} just the Sim Node
    this.sim = new Node({
      id: "sim",
      style: {
        margin: "0",
        height: "92%", // the footer is the remaining 8%
        width: "100%",
        position: "absolute",
        bottom: "8%",
      }
    });

    this.imageNode = new Node({
      type: "img",
      src: options.backgroundSrc,
      style: {
        top: "0",
        position: "absolute",
      }
    })
    this.sim.addChild( this.imageNode )
    // @public {node} the footer at the bottom
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
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        marginBottom: "0",
        boxShadow: "0 -3px 0 0 rgba( 50, 50, 50, 0.2 )"
      }
    });

    // append the chlidren to the base node
    this.simWrapper.appendChildren([ this.sim, this.footer ])

    // @public {ImageButton} the home Button
    this.homeButton = new ImageButton({
      style: {
        width: "60px",
        position: "absolute",
        left: "50px",
      },
      src: "../SimCore/home.png",
      hover: "../SimCore/homeHover.png",
      listener: function(){
        window.open( options.home, "_self" )
      },
    }).node;
    // add a animation that enlarges the home button
    var enlargeHomeButton = this.homeButton.enlarge( 200 );
    // don't play
    enlargeHomeButton.pause();

    this.homeButton.addEventListener( "mouseover", function( _ ){
      // play the enlarge on mouse over
      enlargeHomeButton.play()
    });

    this.homeButton.addEventListener( "mouseout", function( _ ){
      // reset on the mouse out
      enlargeHomeButton.cancel()
    });

    // @public {node} the title of the sim
    this.title = new Node({
      text: options.title,
      style: {
        position: "absolute",
        fontSize: "24px",
        padding: "0",
        left: "200px",
        fontFamily: "Courier"
      }
    })

    // @public {node} the author of the sim
    this.author = new Node({
      text: options.author,
      style: {
        position: "absolute",
        fontSize: "17px",
        padding: "0",
        right: "130px",
        fontFamily: "Courier"
      }
    });

    // add the author and the home button to the footer
    this.footer.appendChildren([ this.homeButton, this.title, this.author ]);
  }
  /**
   * add a Control Panel
   * @param {object} options - the style of the control panel itself 
   * @return {node} - the control panel
   */
  addControlPanel( options ){
    const defaults = {
      border: "2px solid red",
      width: "250px",
      height: "190px",
      border: "1px solid black",
      borderRadius: "5%",
      position: "absolute",
      background: "#DDC",
      boxShadow: "0 0 3px 0 rgb( 40, 40, 40 )"
    }
    // merge them with options overriding
    const attributes = { ...defaults, ...options };
    const controlPanel = new Node({
      style: attributes
    })

    this.sim.addChild( controlPanel )
    return controlPanel;
  } 

}