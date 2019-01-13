/*  js: load the footer and the buttons
  * dashboard.js
  * learning app
  * Created by Brandon Li on 1/11/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */
'use strict';

// modules
import AppendDiv from "./../dashboardCore/appendDiv.js";
var appendDiv = new AppendDiv();

//set up initial strucutre
appendDiv.byType("div", "main_wrapper", "", "", "body");
appendDiv.toParentId("div", "app_wrapper", "", "", "main_wrapper");

// load the footer items
var footer = ["2019© By Brandon Li", "brandon.li820@icloud.com", "303-717-1568"];

for (var i = 0; i < footer.length; i++){
  appendDiv.toParentId("p",  "" , "", footer[i], "content");
}

//define apps
var Planner = {
  title: "Planner",
  src: "assets/plannerIcon.png",
  hover: "assets/plannerHoverIcon.png",
  url: "google.com"
};
var Simulations = {
  title: "Simulations",
  src: "assets/simulationIcon.png",
  hover: "assets/simulationHoverIcon.png",
  url: "google.com"
};
var Calculator = {
  title: "Calculator",
  src: "assets/calculatorIcon.png",
  hover: "assets/calculatorHoverIcon.png",
  url: "google.com"
}

var apps = {
  "Planner": Planner,
  "Simulations": Simulations,
  "Calculator": Calculator,
}  
var appsList = Object.keys(apps);

for (var i = 0 ; i < appsList.length; i ++){
  let app = apps[appsList[i]];
  addApp(app.title, app.src, app.url)
}

function addApp(title, src, url){
    //add the app container
    let app = appendDiv.toParentId("div", "", "app", "", "app_wrapper");
    //add a to app
    let link = appendDiv.toParentNode("a", "", "", "", app);
    link.setAttribute("target", "_self");
    link.setAttribute("href", url);
    //add a button and set attributes
    let button = appendDiv.toParentNode("input", title, "", "", link);
    let label = appendDiv.toParentNode("p", "", "", title, app);
    button.type = "image";
    button.src = src;
    
    button.onmouseover = function() {hoverApp(this)};
    button.onmouseout = function() {unHoverApp(this)};
}

//change image on hover
var hoverApp = function(element){
  let obj = apps[element.id];
  if (obj){
  element.setAttribute("src", obj.hover);
  }
}
//change back when unhovering
var unHoverApp = function (element){
  let obj = apps[element.id];
  if (obj) {
    element.setAttribute("src", obj.src);
  }
}
