/*  js: module
  * solver.js
  * learning app
  * Created by Brandon Li on 1/11/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */

 /**
  module that takes in a screen and solves it
 */
'use strict';
/*  
  step 1: check if all contents is something this calculator can do
  step 2: add multiplication signs around ()
 */

 //modules
import Screen from "../../dashboard/dashboardCore/screen.js";
import Stack from "../../stack/stack.js";
import Simplifier from "/simplifier.js"

var screen = new Screen();
var stack = new Stack();

export default class Solver {
  //@param {String} str- input str, ex: "1+3(4*5)"

  constructor(str){
    this.str = str;
    this.str = this.addMultiplication(str);
        console.log(this.str)

    this.solve();
    // screen.addDivToParentType("h1", "", "" , "adfadfadfasdf", "body");

  }
  solve(){
    // console.log(this.operators)
  }

}

