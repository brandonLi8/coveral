/*  js: module
  * addMultiplicationAfterNumbers.js
  * learning app
  * Created by Brandon Li on 1/11/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */

/*
  step 1 look at each number in the string
  step 2 after each nnumber check if it is a function ex 5sin() -> 5*sin()

  example:
  turn "πℯ+1(4)√(cot(4)3)6" into
    "(3.1415926)*(2.718)+1*(4)*√(cot(4)*3)*6"
 */
//modules
import Contents from "./contents.js"
var contents = new Contents();

export default class AddMultiplicationAfterNumbers {
  constructor(str){
    this.str = str;
    this.str = this.addMultiplationSigns(this.str)
    console.log(this.str)
  }
  //@private
  /* add multiply sign in necessary spots
  */
  addMultiplationSigns(str){
    let i = 0;
    while (i < str.length){
        let char = str.charAt(i);
        if (contents.numbers.has(char)){
          if (this.needsMultiplication(str, i)){
            str = str.insert("*", i + 1);
          }
        }
        i += 1 ;  
        if (i > 50){
          break;
        } 
    }  
    return str;
  }
  //@private
  /* checks it a number needs a * after it
  */
  needsMultiplication(str, i){
    console.log(str)
    console.log(str.charAt(i + 1))
    if (i >= str.length - 1){ // number at the end doesn't need anything after it
        return false;
    }
    if (str.charAt(i + 1) === "."){
        return false; 
    } 
    if (i >= 4 && contents.inverse.has(str.substring(i - 4, i + 1)) ){
        return false;
    }
    if (str.charAt(i + 1) === ")"){ // "5)" is legal
        return false;
    }
    if (str.charAt(i + 1) === "("){ // "5(" needs a * in between
        return true;
    }
    if (str.charAt(i + 1) === "√"){ // "5√" needs a * in between
        return true;
    }
    if (contents.operators.has(str.charAt(i + 1)) ){
        return false;
    }
    if (i + 3 <= str.length - 1 && contents.trig.has(str.substring(i + 1, i + 4)) ){ // )sin() needs a * in between
        return true;
    }
    if (i + 5 <= str.length - 1 && contents.trig.has(str.substring(i + 1, i + 6)) ){ // )sin-1() needs a * in between
        return true;
    }
    if (contents.numbers.has(str.charAt(i + 1)) ){
        return false;
    }
    //at this point, if none of the if cases catches, we have seen something illegal
    throw new Error("error: Syntax");
  }
}

//helpers
String.prototype.replace = function(newString, index){
  let result;
  if (index == 0){
    result = newString + this.substring(1, this.length);
  }
  if (index == this.length){
    return;
  }
  if (index == this.length -1){
    result = this.substring(0, index) + newString;
  }
  else{
    result = this.substring(0, index) + newString + this.substring(index + 1, this.length);
  }
  return result;
}

String.prototype.insert = function(newString, index){
  let result;
  if (index == 0){
    result = newString + this;
  }
  else{
    result = this.substring(0, index) + newString + this.substring(index, this.length);
  }
  return result;
}