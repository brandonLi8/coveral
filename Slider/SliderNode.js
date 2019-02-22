/**
 * Learning App
 * Slider.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/14/19 
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * **Updated version using Node **
 *
 * ## Functionality:
 *  - create the slider ui and link the css file
 *  
 * This is the full list of all the variables that can be overridden
 * The user doesn't have to provide every single property, only the property 
 * that is changing
 *
 */
"use strict";
// modules
import ScreenView from "../Screen/ScreenView.js";
import Node from "../Screen/Node.js"

export default class Slider{
  /**
   * @constructor
   * @param optional {object} options - overide the defaults
   * @return {node} - the slider node
   */  
  constructor( options ){
    const defaults = { 
      // This is the defaults, only overide the properties you wish to override
      lowerBound: 0, // the lowerBound or the slider
      upperBound: 1, // the upperBound of the slider
      startingValue: 0.5, // where the slider should start,
      round: 2, // decimal places to round the result of the value
      backgroundStyle: {
        // again this is the defaults, only overide the ones that you choose to
        // you dont need to provide all of these
        background: "#FFF", // the background of the slider background
        borderRadius: "10px", // slider background
        border: "1px solid black", // slider background
        boxShadow: "1px 1px 3px 1px #999",
        height: "auto",
        width: "600px",
        margin:  "5% auto", // of the entire container
      },
      
      unit: "m/s", // can be empty
      // the container holding the value and the title
      valueStyle: {
        background: "#EEE", // the background behind the box showing the value
        border: "1px solid grey",
        fontSize: "20px",
        paddingLeft : "30px",
        paddingRight : "30px",
        height: "30px",
        borderRadius: "5px",
      },
 
      // title of the entire div
      title: "Slider",
      titleStyle: {
        color: "#000",
        fontSize: "30px",
        marginRight: "10%",

      },
      // sides before and after the slider showing the values
      leftStyle: {
        width: "10%",
        marginRight: "5%",
        fontSize: "20px"
      },
      rightStyle: {
        width: "10%",
        marginLeft: "5%",
        fontSize: "20px"
      },
      leftText: "left", // labels the sides
      rightText: "right",
      // the actual slider line
      sliderStyle: {
        width: "70%",
        height: "2px",
        border: "1px solid black",
        borderRadius : "10px",
        background : "#555",
      },
      thumbStyle: {
        width: "10px",
        height: "22px",
        background: "#4E2",
        borderRadius : "4px",
        border: "1px solid #00E",
        // halfway up
        marginTop: "calc( -" + "20px" + " * 0.5"  + ")",
      },
      listener: null, // function called on change
    }
    // merge them with options overriding
    const attributes = { ...defaults, ...options };
    attributes.backgroundStyle = { 
      ...defaults.backgroundStyle,
      ...options.backgroundStyle 
    }
    attributes.valueStyle = { ...defaults.valueStyle, ...options.valueStyle };
    attributes.titleStyle = { ...defaults.titleStyle, ...options.titleStyle };
    attributes.leftStyle = { ...defaults.leftStyle, ...options.leftStyle };
    attributes.rightStyle = { ...defaults.rightStyle, ...options.rightStyle };
    attributes.sliderStyle = { ...defaults.sliderStyle, ...options.sliderStyle }
    attributes.thumbStyle = { ...defaults.thumbStyle, ...options.thumbStyle };
    this.attributes = attributes;
    /**
     * The Slider Background: the container containing the entire slider element
     * with the value and the title.
     */
    var sliderBackground = new Node({
      style: attributes.backgroundStyle
    })
    /**
     * the container for the value and the title
     */  
    var valueAndTitleContainer = new Node({
      style: {
        display: "flex",
        justifyContent: "center",
        margin: "1% auto",
        alignItems: "center",
      }
    })

    var value = new Node({
      text: attributes.startingValue + " " + attributes.unit,
      // leave it at the start for now
      style: {
        ...attributes.valueStyle,
        textAlign: "center", // cant overide these
        outline: "none"
      }
    })

    // now create the title
    var title = new Node({
      text: attributes.title,
      style: attributes.titleStyle
    })

    // append it to the slider background
    sliderBackground.addChild( valueAndTitleContainer )
    valueAndTitleContainer.appendChildren([ title, value ])
    /**
     * container of slider
     */ 
    var sliderContainer = new Node({
      style: {
        width: "95%",
        margin: "2% auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
    })
    sliderBackground.addChild( sliderContainer )
    /**
     *  sides labeling the left and the right side
     */ 
  
    var left = new Node({
      text: attributes.leftText,
      style: attributes.leftStyle
    })
    var right = new Node({
      text: attributes.rightText,
      style: attributes.rightStyle
    })
    /**
     * the actual slider line
     */ 
    var slider = new Node({
      style: attributes.sliderStyle,
      id: "slider"
    })

    sliderContainer.appendChildren([ left, slider, right ]); // in that order
    /**
     * the thumb of the slider
     */   
    var thumb = new Node({
      style: attributes.thumbStyle,

    })  
    this.thumb = thumb;
  
    slider.addChild( thumb )


    let listener = ( options.listener ) ? options.listener: function() {} ;
    // event listeners
    slider.addEventListener( "mousedown", function( event ){ 
      let coord = getCoordinates( event, slider.DOMobject )
      let length = slider.DOMobject.clientWidth;
      if ( coord > length ) return;
      if ( coord < 0 ) return;
      let percentage = coord / length * 100;

      let newNumber = ( attributes.upperBound - attributes.lowerBound ) 
                      * percentage / 100 + attributes.lowerBound;
      //round the new Number 
      newNumber = Math.round( newNumber * Math.pow( 10, attributes.round ) ) / 
                            Math.pow( 10, attributes.round )
      value.DOMobject.innerHTML = newNumber + " " + attributes.unit;
      thumb.setStyle( { 
          marginLeft :"calc( -" + attributes.thumbStyle.width + " * 0.5 + " +
                           percentage + "% )"
      } )
      listener();
    } );
    /**
     * shift the thumb on drag's
     */ 
    thumb.DOMobject.onmousedown = dragThumbStart;
    function dragThumbStart( event ) {
      event.preventDefault();
      document.onmouseup = dragThumbEnd;
      document.onmousemove = dragThumb;
    }

    function dragThumb( event ) {
      event.preventDefault();
      let coord = getCoordinates( event, slider.DOMobject )
      let length = slider.DOMobject.clientWidth;
      let percentage = coord / length * 100;
      if ( coord > length ) percentage = 100;
      if ( coord < 0 ) percentage = 0;
      let newNumber = ( attributes.upperBound - attributes.lowerBound ) 
                      * percentage / 100 + attributes.lowerBound;
      // round the new Number 
      newNumber = Math.round( newNumber * Math.pow( 10, attributes.round ) ) / 
                            Math.pow( 10, attributes.round )
      value.DOMobject.innerHTML = newNumber + " " + attributes.unit;
      thumb.setStyle( { 
          marginLeft :"calc( -" + attributes.thumbStyle.width + " * 0.5 + " +
                           percentage + "% )"
      } )
      document.body.style.cursor = "pointer";
      listener();
    }

    function dragThumbEnd() {
      document.onmouseup = null;
      document.onmousemove = null;
      document.body.style.cursor = "default"
    }

    // change the hover mouse
    slider.DOMobject.onmouseover = function() {
      slider.setStyle({
        cursor: "pointer"
      });
    }
    this.valueNode = value;
    this.slider = sliderBackground;

    /**
     * shift the thumb based on startingValue
     */ 
    this.setValue( attributes.startingValue ) 

    //@public the original value
    this.originalStartingValue = attributes.startingValue;
  }
  /**
   * @return {node} - the actual element node
   */ 
  get node(){
    return this.slider;
  }
  /**
   * @return {string} - the value of where the slider is at
   */ 
  get value(){
    return this.valueNode.DOMobject.innerHTML;
  }
  /**
   * change the value to a slider
   * @param {number || string} the new value
   */
  setValue( value ){
    let percentage = ( parseFloat( value ) 
                      - this.attributes.lowerBound ) 
                      / ( this.attributes.upperBound 
                        - this.attributes.lowerBound ) 
                      * 100;
    if ( percentage > 100 ) percentage = 100;
    this.thumb.setStyle({
      marginLeft : "calc( -" 
                    + this.attributes.thumbStyle.width 
                    + " * 0.5 + " 
                    + percentage 
                    + "% )"
    });
    this.valueNode.DOMobject.innerHTML = value + " " + this.attributes.unit;
  }
}


function getCoordinates( event, element ){ // the x coord
  const position = event.pageX;
  const offset = {
    left: element.offsetLeft,
    top: element.offsetTop
  };
  let reference = element.offsetParent;
  while ( reference != null ){
    offset.left += reference.offsetLeft;
    reference = reference.offsetParent;
  }
  return position - offset.left; 
}

