/**
 * Learning App
 * PlannerController.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/30/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - create the slider ui and link the css file
 */
import ScreenView from "./../../ScreenView/ScreenView.js";
// modules
export default class Slider{
  constructor( min, max, value, color, width, height, borderRadius, 
               widthOfThumb, heightOfThumb, backgroundOfThumb, 
               background, listener ){
    var input = document.createElement( "input" ); // create element
    // set attibutes
    input.setAttribute( "id", "slider" );
    input.type = "range";
    input.min = "" + min;
    input.max = "" + max;
    input.value = "" + value;

    // input.style.webkitAppearance = "none"
    // input.style.width = width;
    // input.style.margin = "auto";
    // input.style.height = height;
    // input.style.borderRadius = borderRadius;
    // input.style.outline = "none";
    // input.style.webkitTransition = ".2s"
    // input.style.transition = ".2s"


  // var style = document.querySelector('[data="test"]');

  // setData( value );

  // input.oninput = function() {
  //   setData( this.value );
  // }

  // function setData( value ){
  //   style.innerHTML = ".slider::-webkit-slider-thumb { width: " + value + "px !important; height: " + value + "px !important; }";
  // }


    return {
      input: input,
      style: ".slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 250px; /*specified*/ height: 25px; /*specified*/border-radius: 50%;  background: #4CAF50; /*specified*/cursor: pointer;}"

    }

  }
}
