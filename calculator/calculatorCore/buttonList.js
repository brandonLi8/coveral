/**
 * Learning App
 * buttonList.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/17/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * contains a list representation of the calculator
 */
"use strict";
// modules
import Button from "./button.js";

export default class controlPanel {
  /**
   * @constructor
   * @public
   * enscapulate the list
   */
  constructor(){
    this.buttons = [
      [ new Button( "(", "c_button" ),
        new Button( ")", "c_button" ),
        new Button( "C", "c_dark_button" ),
        new Button( "(-)", "c_dark_button" ),
        new Button( "⌫", "c_dark_button" ),
        new Button( "÷", "c_operator_button" ) ], 
      [ new Button( "sin(", "c_button" ),
        new Button( "cos(", "c_button" ),
        new Button( "7", "c_button_normal" ),
        new Button( "8", "c_button_normal" ),
        new Button( "9", "c_button_normal" ),
        new Button( "×", "c_operator_button" ) ], 
      [ new Button( "tan(", "c_button" ),
        new Button( "√(", "c_button" ),
        new Button( "4", "c_button_normal" ),
        new Button( "5", "c_button_normal" ),
        new Button( "6", "c_button_normal" ),
        new Button( "-", "c_operator_button" ) ],

      [ new Button( "csc(", "c_button" ),
        new Button( "sec(", "c_button" ),
        new Button( "1", "c_button_normal" ),
        new Button( "2", "c_button_normal" ),
        new Button( "3", "c_button_normal" ),
        new Button( "+", "c_operator_button" ) ],
      [ new Button( "cot(", "c_button" ),
        new Button( "^(", "c_button" ),
        new Button( "0", "c_button_normal" ),
        new Button( ".", "c_button_normal" ),
        new Button( "=", "c_equals_button" ) ],

      [ new Button( "sin-1(", "c_extend_button" ),
        new Button( "cos-1(", "c_extend_button" ),
        new Button( "tan-1", "c_extend_button" ),
        new Button( "mod", "c_extend_button" ),
        new Button( "^(-1)", "c_extend_button" ),
        new Button( "10^(", "c_extend_button" ) ],

      [ new Button( "rand", "c_extend_button" ),
        new Button( "entry", "c_extend_button" ),
        new Button( "π", "c_extend_button" ),
        new Button( "ℯ", "c_extend_button" ),
        new Button( "^(3)", "c_extend_button" ),
        new Button( "rad", "c_extend_button" ) ],
    ]
  }
}