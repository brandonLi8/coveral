



// // import modules
// import ScreenView from "./../../ScreenView/ScreenView.js";
// // modules
// var screen = new ScreenView();

// screen.addChildToParentType( "div", "planner_wrapper", null, "", "body" );

// /**
//  * add the button that brings you back to the dashboard
//  */
// addReturnButton( "./assets/reset.png", 
//                  "../dashboard.html", 
//                  "./assets/resetHover.png",
//                  "backToDashboardButton" )
// // add the help button
// function addReturnButton( src, url , hoverSrc, id ){
//   // add the div to the wrapper
//   let button = screen.addChildToParentId( 
//                 "div", id, 
//                 null, "", "left" 
//               );
//   // add the image to the button node
//   let image = screen.addChildToParentNode( 
//                 "img", null, 
//                 "backToDashboard", "", button 
//               );
//   image.setAttribute( "src", src );
//   // handle user input
//   image.onmouseover = function() { 
//     image.setAttribute( "src", hoverSrc );
//   };
//   image.onmouseout = function() { 
//     image.setAttribute( "src", src );
//   };
//   image.onclick = function() { 
//     window.open(url, '_self');
//   };
//   console.log(image)
// }