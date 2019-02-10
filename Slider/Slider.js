/**
 * Learning App
 * Slider.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/30/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - create the slider ui and link the css file
 *  
 * This is the full list of all the variables that can be overridden
 * The user doesn't have to provide every single property, only the property 
 * that is changing
 *
 *Everything in this object contains the defualt
 *
 *  options = {
 *
 *    low: 0,
 *    top: 1, 
 *    startingValue: 0.5,
 *    round: 2, // decimal places to round the result of the value
 *    background: "#FFF", // the background of the slider background
 *    borderRadius: "10px", // slider background
 *    border: "1px solid black", // slider background
 *    boxShadow: "1px 1px 3px 1px #999",
 *    height: "auto",
 *    width: "600px",
 *    margin:  "5% auto", // of the entire container
 *   
 *    // the container holding the value and the title
 *    unit: "m/s", // can be empty
 *    valueBackground: #EEE", // the background behind the box showing the value
 *    valueBorder: "1px solid grey",
 *    valueFontSize: "20px",
 *    valuePaddingLeft : "30px",
 *    valuePaddingRight : "30px",
 *    valueHeight 30px",
 *    valueBorderRadius: "5px",
 *
 *    // title of the entire div
 *    title: "Slider",
 *    titleColor : "#000",
 *    gapBetweenTitleAndValue : "10%",
 *    titleFontSize : "30px",
 *    // sides before and after the slider showing the values
 *
 *    leftWidth : options.leftWidth: "10%", // the width of the left box
 *    rightWidth: "10%",
 *    leftMargin : "5%", // to the slider
 *    rightMargin: "5%", // to the slider
 *    leftFontSize: "20px",
 *    rigthFontSize: "20px",
 * 
 *    // the actual slider
 *    sliderWidth : "70%",
 *    sliderBorder : "1px solid black",
 *    sliderBorderRadius : "10px", 
 *    sliderHeight : "2px",
 *    sliderBackground : "#555",
 *    
 *    // the thumb of the slider   
 *    thumbWidth : "10px",
 *    thumbHeight : "22px",
 *    thumbBackground: "#4E2",
 *    // halfway up
 *    options.thumbOffset: "calc( -" + thumbHeight + " * 0.5"  + ")",
 *    thumbBorderRadius : "4px",
 *    thumbBorder: "1px solid #00E",
 * }
 */
import ScreenView from "../ScreenView/ScreenView.js";
var screen = new ScreenView();
// modules
export default class Slider{
  /**
   * @constructor
   * @param optional {object} options - overide the defaults
   * use the getDom method to get the actual element
   */  
  constructor( options ){
    options = ( !options ) ? {} : options;
    /**
     * The Slider Background: the container containing the entire slider element
     * with the value and the title.
     */
    var sliderLow =  ( options.low ) ? options.low : 0; 
    var sliderTop =  ( options.top ) ? options.top : 1; 
    var startingValue = ( options.startingValue ) ? 
                          options.startingValue: "" + sliderLow;
    var round = ( options.round || options.round === 0 ) ? options.round: 2;
    var sliderBackground = document.createElement( "div" );
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
                      "1px 1px 3px 1px #999";
    sliderBackground.style.boxShadow = boxShadow;

    // the height of the background behind it.
    var height = ( options.height ) ? options.height: "auto";
    sliderBackground.style.height = height;

    // the width of the background behind it.
    var width = ( options.width ) ? options.width: "600px";
    sliderBackground.style.width = width;

    // the margin of the background behind it.
    var margin = ( options.margin ) ? options.margin: "5% auto";
    sliderBackground.style.margin = margin;

    /**
     * the container for the value and the title
     */  
    var container = screen.createChild( "div", null, null, "" );
    container.style.display = "flex"
    container.style.justifyContent = "center"
    // margin is 10%
    container.style.margin = "1% auto";
    container.style.alignItems = "center";
    // create the value 
    var unit = ( options.unit || options.unit === "" ) ? options.unit: "m/s";
    var value = screen.createChild( "div", null, null, 
                                      startingValue + " " + " " + unit );
    var valueBackground = ( options.valueBackground ) 
                          ? options.valueBackground: "#EEE";
    value.style.background = valueBackground;
    value.style.border = ( options.valueBorder ) ? 
                            options.valueBorder: "1px solid grey";
    value.style.textAlign = "center";
    value.style.fontSize = ( options.valueFontSize ) ? 
                            options.valueFontSize: "20px";
    var valuePaddingLeft = ( options.valuePaddingLeft ) ? 
                            options.valuePaddingLeft: "30px";
    value.style.paddingLeft = valuePaddingLeft;
    var valuePaddingRight = ( options.valuePaddingRight ) ? 
                            options.valuePaddingRight: "30px";
    value.style.paddingRight = valuePaddingRight;
    value.style.outline = "none"

    var valueHeight = ( options.valueHeight ) ? 
                            options.valueHeight: "30px";
    value.style.height = valueHeight;

    var valueBorderRadius = ( options.valueBorderRadius ) ?
                              options.valueBorderRadius: "5px";
    value.style.borderRadius = valueBorderRadius;

    // now create the title
    var titleText = ( options.title ) ? options.title: "Slider";
    var title = screen.createChild( "div", null, null, titleText );
    var titleColor = ( options.titleColor ) ? options.titleColor: "#000"
    title.style.color = titleColor;
    var gapBetweenTitleAndValue = ( options.gapBetweenTitleAndValue ) ? 
                                    options.gapBetweenTitleAndValue: "10%"
    title.style.marginRight = gapBetweenTitleAndValue
    var titleFontSize = ( options.titleFontSize ) ? 
                          options.titleFontSize: "30px";
    title.style.fontSize = titleFontSize

    // append it to the slider background
    sliderBackground.appendChild( container )
    container.appendChild( title )
    container.appendChild( value )
    /**
     * container of slider
     */ 
    var sliderContainer = screen.createChild( "div", null, null, "" );
    sliderContainer.style.width = "95%";
    sliderContainer.style.margin = "2% auto";
    sliderContainer.style.display = "flex";
    sliderContainer.style.alignItems = "center";
    sliderContainer.style.justifyContent = "center";
    sliderBackground.appendChild( sliderContainer )
    /**
     *  sides
     */ 
    var left = screen.createChild( "div", null, null, "" + sliderLow )
    var right = screen.createChild( "div", null, null, "" + sliderTop )
    var leftWidth = ( options.leftWidth ) ? options.leftWidth: "10%"
    var rightWidth = ( options.rightWidth ) ? options.rightWidth: "10%"
    var leftMargin = ( options.leftMargin ) ? options.leftMargin: "5%"
    var rightMargin = ( options.rightMargin ) ? options.rightMargin: "5%"
    left.style.marginRight = leftMargin;
    right.style.marginLeft = rightMargin;
    var leftFontSize = ( options.leftFontSize ) ? options.leftFontSize: "20px";
    left.style.fontSize = leftFontSize;
    var rigthFontSize = ( options.rigthFontSize ) 
                          ? options.rigthFontSize: "20px";
    right.style.fontSize = rigthFontSize;

    /**
     * the actual slider
     */ 
    var slider = screen.createChild( "div", null, null, "" )
    var sliderWidth = ( options.sliderWidth ) ? options.sliderWidth: "70%"
    slider.style.width = sliderWidth;
    slider.style.border = ( options.sliderBorder ) ? 
                            options.sliderBorder: "1px solid black"
    slider.style.borderRadius = ( options.sliderBorderRadius ) ? 
                                  options.sliderBorderRadius: "10px" 
    slider.style.height = ( options.sliderHeight ) ?
                            options.sliderHeight: "2px"
    slider.style.background = ( options.sliderBackground ) ? 
                                options.sliderBackground: "#555"

    // rendering order ltr
    sliderContainer.appendChild( left )
    sliderContainer.appendChild( slider )
    sliderContainer.appendChild( right )
    /**
     * the thumb of the slider
     */     
    var thumb = screen.createChild( "div", null, null, "" );
    let thumbWidth = ( options.thumbWidth ) ? options.thumbWidth: "10px";
    thumb.style.width = thumbWidth;
    let thumbHeight = ( options.thumbHeight ) ? options.thumbHeight: "22px";
    thumb.style.height = thumbHeight
    thumb.style.background = ( options.thumbBackground ) ?
                               options.thumbBackground: "#4E2";
    // halfway up
    thumb.style.marginTop = ( options.thumbOffset ) ? options.thumbOffset: 
                            "calc( -" + thumbHeight + " * 0.5"  + ")";
    let thumbBorderRadius = ( options.thumbBorderRadius ) ? 
                              options.thumbBorderRadius: "4px";
    thumb.style.borderRadius = thumbBorderRadius;
    thumb.style.border = ( options.thumbBorder ) ? 
                    options.thumbBorder: "1px solid #00E";
    /**
     * shift the thumb based on startingValue
     */ 
    let percentage = ( parseFloat( startingValue ) - sliderLow) 
                      / ( sliderTop - sliderLow ) * 100;
    thumb.style.marginLeft = "calc( -" + thumbWidth + " * 0.5 + " +
                           percentage + "% )";
    slider.appendChild( thumb )


    let listener = ( options.listener ) ? options.listener: function() {} ;
    // event listeners
    slider.addEventListener("mousedown", function ( event ) { 
      let coord = ( event.pageX - slider.offsetLeft )
      let length = slider.clientWidth;
      if ( coord > length ) return;
      if ( coord < 0 ) return;
      let percentage = coord / length * 100;
      let newNumber = ( sliderTop - sliderLow ) * percentage / 100 + sliderLow;
      //round the new Number 
      newNumber = Math.round( newNumber * Math.pow( 10, round ) ) / 
                            Math.pow( 10, round )
      value.innerHTML = newNumber + " " + unit;
      thumb.style.marginLeft = "calc( -" + thumbWidth + " * 0.5 + " +
                           percentage + "% )";
      listener();
    } );
    /**
     * shift the thumb on drag's
     */ 
    thumb.onmousedown = dragThumbStart;
    function dragThumbStart( event ) {
      event.preventDefault();
      document.onmouseup = dragThumbEnd;
      document.onmousemove = dragThumb;
    }

    function dragThumb( event ) {
      event.preventDefault();
      let coord = ( event.pageX - slider.offsetLeft )
      let length = slider.clientWidth;
      let percentage = coord / length * 100;

      if ( coord > length ) percentage = 100;
      if ( coord < 0 ) percentage = 0;
      let newNumber = ( sliderTop - sliderLow ) * percentage / 100 + sliderLow;
      //round the new Number 
      newNumber = Math.round( newNumber * Math.pow( 10, round ) ) / 
                            Math.pow( 10, round )
      value.innerHTML = newNumber + " " + unit;
      thumb.style.marginLeft = "calc( -" + thumbWidth + " * 0.5 + " +
                           percentage + "% )";
      document.body.style.cursor = "pointer";
      listener();
    }

    function dragThumbEnd() {
      document.onmouseup = null;
      document.onmousemove = null;
      document.body.style.cursor = "default"
    }

    // change the hover mouse
    slider.onmouseover = function() {
      slider.style.cursor = "pointer"
    }
    this.value = value;
    this.slider = sliderBackground;
  }
  /**
   * @get
   * @retrun {dom} - the actual element
   */ 
  getDom(){
    return this.slider;
  }
  /**
   * @get
   * @retrun {string} - the value of where the slider is at
   */ 
  getValue(){
    return this.value.innerHTML;
  }
}

