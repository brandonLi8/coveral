



// import modules
import ScreenView from "./../../ScreenView/ScreenView.js";
// modules
var screen = new ScreenView();


/**
  * add the header
  */ 
screen.addChildToParentType( "div", "header", null, "", "body" );
screen.addChildToParentId( "div", "left", null, "", "header");
addPlannerIcon();
function addPlannerIcon() {
  // add the div to the wrapper
  let conatiner = screen.addChildToParentId( 
                    "div", "header_content", 
                    null, "", "left" 
                  )
  // add the image to the container
  let image = screen.addChildToParentNode( 
                "img", "backToDashboard", 
                null, "", conatiner
              );
  image.setAttribute( "src", "./assets/plannerTBackground.png" );
  // handle user input
  image.onmouseover = function() { 
    image.setAttribute( "src", "./assets/plannerTBackgroundHover.png" );
  };
  image.onmouseout = function() { 
    image.setAttribute( "src", "./assets/plannerTBackground.png" );
  };
}
let backToDashboard = screen.addChildToParentId( 
                        "div", "header_content", 
                        null, "Back To Dashboard", "left" 
);
backToDashboard.onclick = function(){
  window.open( "../dashboard.html", "_self" ) 
}
let help = screen.addChildToParentId( 
            "div", "header_content", 
            null, "Help", "left"
);
help.onclick = function(){
  window.open( "./help.html", "_self" ) 
}
screen.addChildToParentId( 
        "div", "header_content_right", 
        null, "Planner", "left"
);
