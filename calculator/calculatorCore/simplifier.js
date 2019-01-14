/*  js: module
  * simplifier.js
  * learning app
  * Created by Brandon Li on 1/11/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */

/*
  step 1: replace pi and e with nnumerical value wrapped in parenthesis
  step 2: add * inbetween parenthesis and in other necessary places in
  order for the stack to execute properly

  example:
  turn "πℯ+1(4)√(cot(4)3)6" into
    "(3.1415926)*(2.718)+1*(4)*√(cot(4)*3)*6"
 */
//modules
import Contents from "./contents.js"
var contents = new Contents();

export default class Simplifier {
  constructor(str){
    this.str = this.addParenthesisAroundSymbols(str);
    this.str = this.addMultiplationSigns(this.str)
  }
  //@private
  /* add parenthesis around a symbol
    @recursive
  */
  addParenthesisAroundSymbols(str){
    for (var i = 0; i < str.length; i++){
        if (contents.symbols.has(str.charAt(i))){
            str = str.replace("(" + contents.symbolValues[str.charAt(i)] + ")", i);
            this.addParenthesisAroundSymbols(str);
        }
    }
    return str;
  }
  //@private
  /* add multiply sign in necessary spots
  */
  addMultiplationSigns(str){
    let i = 0;
    while (i < str.length){
        let char = str.charAt(i);
        if (char === "("){
          if (this.islegalBefore(str, i)){
            str = str.insert("*", i);
          }
        }
        if (char === ")"){
          if (this.islegalAfter(str, i)){
            str = str.insert("*", i + 1);
          }
        }
        i += 1 ;   
    }  

    return str;
  }
  //@private
  /* checks it a "(" needs a * before it
  */
  islegalBefore(str, i){
    if (i == 0){ //no need to add a * when it starts with "("
        return false;
    }
    if (i == str.length - 1){// "1+2(" cant have parenthesis at end like that
        throw new Error("error: '(' at the end");
    }
    if (str.charAt(i - 1) === "."){ // ".(" isn't legal
        throw new Error("error: '.(' is unkown")
    } 
    if (str.charAt(i - 1) === "("){ // "((" is fine
        return false;
    }
    if (str.charAt(i - 1) === ")"){ // ")" is fine
        return true;
    }
    if (contents.operators.has(str.charAt(i - 1)) ){
        return false;
    }
    if (i >= 3 && contents.trig.has(str.substring(i - 3, i)) ){
        return false;
    }
    if (i >= 5 && contents.inverse.has(str.substring(i - 5, i)) ){
        return false;
    }
    if (contents.numbers.has(str.charAt(i - 1)) ){
        return true;
    }
    //at this point, if none of the if cases catches, we have seen something illegal
    throw new Error("error: Syntax")
  }
  //@private
  /* checks it a ")" needs a * before it
  */
  islegalAfter(str, i){
    if (i >= str.length - 1){ // ')' at the end doesn't need anything after it
        return false;
    }
    if (i == 0){ //")1+3" -> can't have ) at the beggining
        throw new Error("error: ')' at the beginning");
    }
    if (str.charAt(i + 1) === "."){ // ".(" isn't legal
        throw new Error("error: ').' is unkown");
    } 
    if (str.charAt(i + 1) === ")"){ // "))" is legal
        return false;
    }
    if (str.charAt(i + 1) === "("){ // ")(" needs a * in between
        return true;
    }
    if (str.charAt(i + 1) === "√"){ // ")√" needs a * in between
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
        return true;
    }
    //at this point, if none of the if cases catches, we have seen something illegal
    throw new Error("error: Syntax")
  }
}

//helpers

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