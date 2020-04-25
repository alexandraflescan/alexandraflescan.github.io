const movingBall = document.getElementById("movingBall"),
      hole = document.getElementById("hole"),
      movingBallj = $("#movingBall"),
      holej = $("#winHole"),
      loserHole = $(".loser"),
      holes = $(".circle-hole");

function dragElement(elmnt) {
 var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
 if (elmnt) {
   /* if present, the header is where you move the DIV from:*/
   elmnt.on("mousedown touchstart", (event) => dragMouseDown())
   }


 function dragMouseDown(e) {
   e = e || window.event;
  e.preventDefault();
   // get the mouse cursor position at startup:
   pos3 = e.clientX;
   pos4 = e.clientY;
   $(document).on("mouseup touchend", (event) => {
       $(document).off("mouseup touchend");
       $(document).off("mousemove touchmove"); 
       closeDragElement();
   } );
   // call a function whenever the cursor moves:
  
    movingBall.addEventListener('touchmove',elementDrag, false);
   
 }

 function elementDrag(e) {
  var e = event.changedTouches[0];
   // calculate the new cursor position:
   pos1 = pos3 - e.clientX;
   pos2 = pos4 - e.clientY;
   pos3 = e.clientX;
   pos4 = e.clientY;
   var elementOffSet = document.getElementById(elmnt[0].id);
   elementOffSet.style.top = (elementOffSet.offsetTop - pos2) + "px";
   elementOffSet.style.left = (elementOffSet.offsetLeft - pos1) + "px";
 }

 function closeDragElement() {
  var t; // should return whether they are touching
  let currentCircle;
  $(".circle-hole").each(function() {
    currentCircle = $("#" + $(this)[0].id);
    t = is_colliding(elmnt, currentCircle)
    if (t) {
      if (currentCircle[0].id == holej[0].id) {
        showSuccess()
        return;
      } else {
        showFailure();
        return;
      }  
    }

})
 
  
}

function showModal() {
  $(".win-modal").modal('show');
  elmnt.css("top", "75%");
  elmnt.css("left", "30%");
}

function showSuccess() {
  showModal() 
    $(".winning-text").show();
    $(".losing-text").hide();
  }

function showFailure() {
  showModal() 
  $(".winning-text").hide();
  $(".losing-text").show();
}
}


dragElement(movingBallj);




var is_colliding = function( $movingBall, $hole ) {

 // Div 1 data
 var d1_offset             = $movingBall.offset();
 var d1_height             = $movingBall.outerHeight( true );
 var d1_width              = $movingBall.outerWidth( true );
 var d1_distance_from_top  = d1_offset.top + d1_height;
 var d1_distance_from_left = d1_offset.left + d1_width;

 // Div 2 data
 var d2_offset             = $hole.offset();
 var d2_height             = $hole.outerHeight( true );
 var d2_width              = $hole.outerWidth( true );
 var d2_distance_from_top  = d2_offset.top + d2_height;
 var d2_distance_from_left = d2_offset.left + d2_width;

 var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );

 // Return whether it IS colliding
 return ! not_colliding;
};