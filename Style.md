<!--  README.md
      Learning App
      Created by Brandon Li on 2/7/19.
      Copyright © 2019 Brandon Li. All rights reserved. 
-->
Styling Guidline for Learning App
=======
By [Brandon Li](https://github.com/brandonLi8)

# Table of Contents
 * [General](#general)
 * [Javacript](#JS)
 * [Html](#HTML)
 * [Css](#CSS)
 * [Naming](#Naming)

-----------------------------------------------
<a name="general"></a>
## 1. General
  - This is the style guidline for the Learning app - required for this
      - The most important thing is to keep everything **consistent**
  - Tab sizes will always be **2 spaces**. Don't mix tabs and spaces.
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
  - **Always** use double duotes, **never** use single quotes.
  ```javascript
  var string = "stringname";
  ```
  -  `// single line comments should look like this`
  - Use appropriate multiline comments for [Javacript](#JSMultiline), [Html](#HTMLMultiline), and [Css](#CSSMultiline)
  - Start every document with a docstring for [Javacript](#JSDS), [Html](#HTMLDS), and [Css](#CSSDS)
  - Since the limit for a line is 80 spaces, runnning out or room is common
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

<a name="JS"></a>
## 2. JavaScript
  - **Always** Specify Parameters and function types
  ```javascript
  //Example:
  /**
   * @constructor
   * @param {ButtonNode} Node - the node that will be modified
   * @public
   */
   constructor( Node ){
    ...
   }
   // specify @public or @private, 
   // @constructor for constructors
   // @recursive for recursive functions
   // ALWAYS specificy every type of arguement. If the arguement is and object
   // specify all the properties of it. If the arguement is a function specify 
   // what the function should do and it's arguments

  ``` 
  - Use type coercion to your benefit
  ```javascript
  // unnecessary
  if ( foo === true ) 
  // concise
  if ( foo ) 

  // unnecessary
  if ( array.length > 0 )
  // concise
  if ( array.length )

  // unnecessary
  if ( array.length === 0 )
  // concise
  if ( !array.length )

  // unnecessary
  if ( string !== "" )
  // concise
  if ( string )

  // unnecessary
  if ( string === "" )
  // concise
  if ( !string )

  // bad UNLESS you are actually testing for false and not null, "", 0, or undefined
  if ( variable === false )
  // usually better
  if ( !variable )
  ```
  - **Do not** use snake case ever for JS
  ```javascript
  // use this naming convention
  functionNamesLikeThis;
  variableNamesLikeThis;
  ConstructorNamesLikeThis;
  methodNamesLikeThis;
  ```
 <a name="JSMultiline"></a>
  - Multiline comments for JS should look like:
  ```javascript
  /**
   * This 
   * is 
   * a multiline comment
   */
  ...
  ```
 <a name="JSDS"></a>
  - Docstrings for JS look like:
  ```javascript
  /**
   * Learning App
   * document name (fils.js)
   *
   * @author Brandon Li <brandon.li820@icloud.com> 
   * Created on date
   * Copyright © 2019 Brandon Li. All rights reserved.
   *
   * Briefly explain functionality
   */
  ```

<a name="HTML"></a>
## 3. Html
  - Html is **only** used for linking javascript and css files
  - No spacing on attributes
  ```html
  <!-- Bad --> 
  <div id = "id" class = "class"></div>
  <!-- Better --> 
  <div id="id" class="class"></div>
  ```
  - Remove white space
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
  - Use **Snake Case** ( snake_case ) for HTML and CSS
  ```html
  <div
      property="p"
      class="class_name"
      id="id_name">
      text
  </div>
  ```
  - **always** use double quotes `""`
  <a name="HTMLMultiline"></a>
  - Multiline comments for HTML should look like:
  ```html
  <!-- 
    this 
    is 
    a 
    multiline 
    comment
  -->
  ...
  ```
  <a name="HTMLDS"></a>
  - Docstrings for HTML look like:
  ```html
  <!-- file.html
       coveral
       Created by __ on ___
       Copyright © 2019 Brandon Li. All rights reserved. 
  -->
  ```

<a name="CSS"></a>
## 3. Css
  - Use **Snake Case** ( snake_case )
  ```css
  /* not for css */
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
    height: 8px; /* better */
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
  - Again, always use double quotes `" "`
  ```css
  /* Use double quotes */
  .class1, .class2, .class3 {
    font-family: "Courier";
  }
  ```
  <a name="CSSDS"></a>
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
  <a name="CSSMultiline"></a>
  - Css multiline comments are the same as javascripts
  ```css 
  /**
   * This
   * Is 
   * A
   * Multiline
   * Comment
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

<a name="Naming"></a>  
## 5. Naming
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

