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
var screen = new ScreenView();
// modules
export default class Slider{
  /**
   * @constructor
   * @retrun {Dom} - the actual dom element
   * @param optional {object} options - overide the defaults
   */  
  constructor( options ){
    var sliderBackground = document.createElement( "div" );
    options = ( !options ) ? {} : options;
    // after : is the default, the option object can overide
    // the background of the container of the slider itself
    var background = ( options.background ) ? options.background : "#FFF";
    sliderBackground.style.background = background;

    // the border radius of the background behind it.
    var borderRadius = ( options.borderRadius ) ? options.borderRadius: "10px";
    sliderBackground.style.borderRadius = borderRadius;

    // the border of the background behind it.
    var border = ( options.border ) ? options.border: "1px solid black";
    sliderBackground.style.border = border;

    // the box shadows of the background
    var boxShadow = ( options.boxShadow ) ? 
                      options.boxShadow : 
                      "1px 1px 5px 1px #444";
    sliderBackground.style.boxShadow = boxShadow;

    // the height of the background behind it.
    var height = ( options.height ) ? options.height: "100px";
    sliderBackground.style.height = height;

    // the width of the background behind it.
    var width = ( options.width ) ? options.width: "600px";
    sliderBackground.style.width = width;

    // the margin of the background behind it.
    var margin = ( options.margin ) ? options.margin: "auto";
    sliderBackground.style.margin = margin;

    // create the container of the value and the title
    var container = screen.createChild( "div", null, null, "" );
    container.style.display = "flex"
    container.style.justifyContent = "center"

    // create the value 
    var unit = ( options.unit ) ? options.unit: "m/s";
    var valueBackground = ( options.valueBackground ) 
                          ? options.valueBackground: "m/s";
    var startingValue = ( options.startingValue ) ? options.startingValue: "0";
    var value = screen.createChild( "div", null, null, startingValue + " " + " " + unit );
    value.style.border = ( options.valueBorder ) ? options.valueBorder: "1px solid grey";
    value.style.textAlign = "center";
    value.style.paddingTop = "0px"
    value.style.fontSize = ( options.valueFontSize ) ? options.valueFontSize: "30px";
    value.style.margin = "5px";
    value.style.height = ( options.valueFontSize ) ? options.valueFontSize + 10: "40px";
    value.style.outline = "none"
    // now create the title
    var titleText = ( options.title ) ? options.title: "Slider";
    var title = screen.createChild( "div", null, null, titleText );
    title.style.color = ( options.titleColor ) ? options.titleColor: "#000"
    title.style.marginRight = "10%"
    title.style.fontSize = ( options.titleFontSize ) ? options.titleFontSize: "30px"

    // append it to the slider background
    sliderBackground.appendChild( container )
    container.appendChild( title )
    container.appendChild( value )

    // now get a slider
    var slider = screen.createChild( "div", null, null, "" )
    slider.style.width = sliderBackground.style.width;
    slider.style.border = ( options.sliderBorder ) ? options.sliderBorder: "1px solid black"
    slider.style.borderRadius = ( options.sliderBorderRadius ) ? options.sliderBorderRadius: "10px" 
    slider.style.height = ( options.sliderHeight ) ? options.sliderHeight: "2px"
    slider.style.background = ( options.sliderBackground ) ? options.sliderBackground: "#555"
    slider.style.position = "absolute";
    // add the event listener
    slider.onmouseover = function() {
      slider.style.cursor = "pointer"
    }

    // now add a slider thumb    
    var thumb = screen.createChild( "div", null, null, "" );
    thumb.style.position = "absolute";
    let thumbWidth = ( options.thumbWidth ) ? options.thumbWidth: "8px";
    thumb.style.width = thumbWidth;
    thumb.style.height = ( options.thumbHeight ) ? options.thumbHeight: "20px";
    thumb.style.background = ( options.thumbWidth ) ? options.thumbBackground: "#222";
    thumb.style.marginTop = ( options.thumbOffset ) ? options.thumbOffset: "-9px";
    thumb.style.borderRadius = ( options.thumbBorderRadius ) ? options.thumbBorderRadius: "3px";
    thumb.style.border = ( options.thumbBorder ) ? options.thumbBorder: "1px solid #444";

    slider.appendChild( thumb )

    sliderBackground.appendChild( slider )
    // event listeners
    slider.addEventListener("mousedown", function ( event ) { 
      let coord = ( event.pageX - slider.offsetLeft )
      coord -= parseInt( thumbWidth.substring( 0, thumbWidth.length - 2 ) ) / 2
      let length = slider.style.width
      length = parseInt( length.substring( 0, length.length - 2 ) )
      if ( coord > length ) return;
      if ( coord < 0 ) return;
      console.log( Math.round( coord / length * 100))
      thumb.style.marginLeft = "" + coord + "px";
    } );
    return sliderBackground

  }
}
