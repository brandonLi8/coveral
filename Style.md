<!--  README.md
      Learning App
      Created by Brandon Li on 2/7/19.
      Copyright © 2019 Brandon Li. All rights reserved. 
-->
Styling Guidline for Learning App
=======
By Brandon Li [@brandonLi8](https://github.com/brandonLi8)

## Table of Contents
 * [General](#general)
 * [Javacript](#JS)
 * [Html](#HTML)
 * [Css](#CSS)
 
-----------------------------------------------

1. <a name="general"><strong>General</strong></a>
  - This is the style guidline for the Learning app - required for this
      - The most important thing is to keep everything consistent
  - Tab sizes will always be 2 spaces. Don't mix tabs and spaces.
  - No end of line whitespace or blank line whitespace
  - ***Never*** go over 80 characters a line 
  - Use spaces in between parenthesis ( readability )
  ```javascript
  if ( condition ) {

  }
  else if ( condition ) {

  }
  while ( condition ) {

  }
  for ( var i = 0; i < 100; i++ ) {

  }

  // EXCEPTIONS
  // Function accepting an array = no space
  randomFunction([ "item1", "item1" ]);
  // function accepting an object = no space
  randomFunction({
        a: "item1",
        b: "item2"
  });
  ```
  - never use single quotes ''
  -  `// single line comments should look like this`
  -  Use built in multiline comments
  ```javascript
  /**
   - This 
   - is 
   - a multiline comment
   */
  ```
  - start every document with a docstring
  ```javascript
  /**
   - Learning App
   - document name (fils.js)
   *
   - @author Brandon Li <brandon.li820@icloud.com> 
   - Created on date
   - Copyright © 2019 Brandon Li. All rights reserved.
   *
   - Briefly explain functionality
   */
  ```
  - since the limit for a line is 80 spaces, runnning out or room is common
  ```javascript
  // long functions names should start at the same space and split as evenly as possible
  function longFunctionName(
           varOne, varTwo,
           varThree, varFour ){
    ...
  }

  // same for if statments or anything of the sort
  if ( condition1 &&
       condition2 ||
       condition3 &&
       condition4 ){ // notice how the operator goes after for && and ||
    // do something
  }
  // the operator should go before for anything else
  var str = "long string here"
            * "5"
            * "something else here";
  // another example
  var income = ( grossWages
                 * taxableInterest
                 * ( dividends - qualifiedDividends )
                 + iradeduction
                 + studentLoanInterest )
  ```
2. <a name="JS"><strong>JavaScript</strong></a>
  - use type coercion
```javascript
// wrong
if ( foo === true ) 
// better
if ( foo ) 


// wrong
if ( array.length > 0 )
// correct
if ( array.length )
// wrong
if ( array.length === 0 )
// better
if ( !array.length )

// wrong
if ( string !== "" )
// better
if ( string )

// wrong
if ( string === "" )
// better
if ( !string )

// wrong UNLESS you are actually testing for false and not null, "", 0, or undefined
if ( variable === false )
// usually better
if ( !variable )
```
  - **Do not** use snake case ever
```javascript
// use this naming convention
functionNamesLikeThis;
variableNamesLikeThis;
ConstructorNamesLikeThis;
methodNamesLikeThis;
```

3. <a name="HTML"><strong>Html</strong></a>
  - Html is **only** used for linking javascript and css files
  - No spacing on attributes
  - Remove white space
  - Use **Snake Case** ( snake_case )
```html
<!-- Bad --> 
<p> text is here </p>
<!-- Better --> 
<p>text is here</p>

```
  - New lines on children
```html
<ul>
  <li>1
  <li>2
  <li>3
</ul>
```
  - (optional) break long lines
  - Use lowerCaseCamel for all names in css and html
```html
<div
    property="p"
    class="class_name"
    id="id_name">
    text
</div>
```
  - again always use double quotes `"`
  
4. <a name="CSS"><strong>Css</strong></a>
  - Use **Snake Case** ( snake_case )
```css
/* Bad */
#idNameHere {

}
/* Use Snake Case for css */
#id_name_here {
 
}
```
  - Space after the ':'
```css
/* bad */
div { 
  width:9px;
  height:8px; /* cramped */
}
/* use a space */
div { 
  width: 9px;
  height: 8px; /* lesscramped */
}
```
  - Use newlines/indents when styling:
```css
/* Bad */
div {
  width: 80%; height: 90%;
}
/* Use new line for sub styling and 2 space tabs */
div {
  width: 80%; 
  height: 90%;
}
```
  - Use newlines on inheritance
```css
/* Bad */
.class1, .class2, .class3 {
  
}
/* Better */
.class1, 
.class2, 
.class3 {
  
}
```
  - Again, always use double quotes `"`
```css
/* Use double quotes */
.class1, .class2, .class3 {
  font-family: "Courier";
}
```
  - start off all css files with a docstring
```css 
/**
 * Learning App
 * file.css
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on date
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * functionality here
 */
```
  - Create spacing on comma seperated values and
```css
div {
  /* dont put units on 0 values! */
  box-shadow: 0 40px 40px -40px rgba( 200, 100, 200, 0.2 );  
  /* 
   * Spacing in between parenthesis.
   * Spacing After commas.
   */
}
```


    
5. <a name="Naming"><strong>Naming</strong></a>
    - be specific when naming variables

```javascript
// REALLY BAD

function dog(cat) {
  return cat*5-6;
}
var i=0;
var gi=["23"];
var lol=false;

// better

function query( selector ) {
  return document.querySelectorAll( selector );
}

var keyIsPressed = false;
if ( keyIsPressed ){
  console.log( "key was pressed" )
}

// use singular for a item, use plural for a collection
'book' is a single book
'books' is a list of books

```

