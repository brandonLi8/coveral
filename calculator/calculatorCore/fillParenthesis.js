/*  js: module
  * fillParenthesis.js
  * learning app
  * Created by Brandon Li on 1/11/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */

/*
  loop trough adding ")" untill it is legal.
  if there are more ")" than "(" then it is illegal and throw a parenthesis error
  example of something legal: "((1+4)(5" --> "((1+4)(5))"
  example of something legal: ")((1+4)(5" --> ")((1+4)(5))" same amount bull still not legal so error
 */
export default class fillParenthesis {
  constructor(str){
    
  }
  //@private
  /* add parenthesis around a symbol
    @recursive
  */
  /* @public
  return if str has balanced parenthesis
  */
  hasBalancedParentheses(str){ 
    var amount = 0;
    var current = "";
    var i = 0;
    if (str.length) == 0{
        return true;
    }
    while (i < str.count){
      current = str.charAt(i)
      if (current === "(") {
          amount ++;
      }
      else (if current == ")"){
          amount --;
      }
      if (amount < 0) {
          return false;
      }
      i ++;
        
    }
    return amount == 0
    }
  //TODO: addParenthisis
}
   