/*  js: module
  * button.js
  * learning app
  * Created by Brandon Li on 1/11/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
   
    export module with the contents of a button
 */
"use strict";
export default class Button {
    constructor( text, type ){
        this.text = text;
        this.type = type; 
    }
    handlePressed(){
        console.log(this.text)
    }
    toString(){
        return this.text;
    }
}