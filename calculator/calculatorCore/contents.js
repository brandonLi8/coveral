//contents for a calculator
'use strict';

export default class Contents {
  constructor(){ //use sets for o(1) average access
    //all instance data is @public
    this.operators = new Set(["+", "-", "*", "/", "÷", "%", "^", "√"]);
    this.trig = new Set(["sin", "cos", "tan", "cot", "csc", "sec"]);
    this.inverse = new Set(["cos-1", "sin-1", "tan-1"]);
    this.additionals = new Set([".", "√"]);
    this.symbols = new Set(["ℯ", "π"]);
    this.symbolValues = {
        "ℯ": 2.71828182845904523536,
        "π": 3.14159265358979323846, 
    };
    this.notSupported = new Set(["e"]);
    this.numbers = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  }
}