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
    this.str = this.addParenthesisAroundSymbols(str);
    this.str = this.addMultiplationSigns(this.str)
  }
  //@private
  /* add parenthesis around a symbol
    @recursive
  */
  //TODO: isLegalParenthesis
  //TODO: addParenthisis
}
   