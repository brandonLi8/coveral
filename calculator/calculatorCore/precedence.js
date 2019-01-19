//contents for a calculator
'use strict';

export default class Precedence {
  constructor(){ //use sets for o(1) average access
    //all instance data is @public
    this.operators = new Set(["+", "-", "×", "÷", "%", "^", "(", ")"]);
    this.singleCharOperators = new Set(["√", "+", "-", "×", "÷", "%", "^", "(", ")"])
    this.trig = new Set(["sin", "cos", "tan", "cot", "csc", "sec"]);
    this.inverse = new Set(["arccos", "arcsin", "arctan"]);
    this.additionals = new Set([".", "√"]);
    this.symbols = new Set(["ℯ", "π"]);
    this.symbolValues = {
        "ℯ": 2.71828182845904523536,
        "π": 3.14159265358979323846, 
    };
    this.notSupported = new Set( ["e"] );
    this.numbers = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]);

    // this.order{
    //     new Set(["+", "-"]): 1,

    // } // "sin(", "cos(", "tan(", "cot(", "csc(", "sec(", "cos-1(", "sin-1(", "tan-1(", "√(",
    this.precendence = {
        4: new Set( "(", ")" ),
        3: new Set(["^"]),
        2: new Set(["×", "÷", "%"]),
        1: new Set( [ "+", "-" ] )
    }
  }
  getPrecedence( char ){
    for (var i = 1; i <= Object.keys( this.precendence ).length; i++){
        console.log(this.precendence[i.toString()])
        if ( this.precendence[i].has(char) ){
            return i;
        }
    }
    throw new Error("" + char + " is unrecognized");
  }

}