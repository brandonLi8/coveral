/*  js: test
  * solverTest.js
  * learning app
  * Created by Brandon Li on 1/11/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */
/*  
test modules for calculator
 */
'use strict';
 //modules
import Solver from "./solver.js";
import Simplifier from "./simplifier.js";
// import FillParenthesis from "./fillParenthesis.js"

export default class SolverTest {
  test(){
    var simplifyOne = new Simplifier("πℯ+1(4)√(cot(4)3)6πππsin-1(π)π")
    assert(simplifyOne.str === "(3.141592653589793)*(2.718281828459045)+1*(4)*√(cot(4)*3)*6*(3.141592653589793)*(3.141592653589793)*(3.141592653589793)*sin-1((3.141592653589793))*(3.141592653589793)")
    var simplifyTwo = new Simplifier("1+(32)(4(4))")
    assert(simplifyTwo.str === "1+(32)*(4*(4))")
  }
}


function assert(condition, message) {
  if (!condition) {
    message = message || "Assertion failed";
    if (typeof Error !== "undefined") {
        throw new Error(message);
    }
    throw message; 
  }
}
