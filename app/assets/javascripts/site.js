$("#menu_btn").click(function(){
	$("#site_menu").addClass("active");
	$(".lightbox_bkg").fadeIn();
})

$(".exit_menu_btn").click(function(){
	$("#site_menu").removeClass("active");
	$(".lightbox_bkg").fadeOut();
})

// -----------Lightbox functions-----------
function lightbox(type, content){
	$(".lightbox").attr('lb-type', type);
   $(".lightbox .lb_content_contain").html(content);
	$(".lightbox_bkg").fadeIn();
	$("#lightbox_contain").fadeIn();
}
function lightbox_exit(){
	$(".lightbox_bkg").hide();
	$("#lightbox_contain").hide();
	$(".lightbox .lb_content_contain").html("");
}
$(".lightbox_bkg").click(function(){
	if($(".lightbox_x").is(":visible")){
		lightbox_exit();
	}
	if($("#site_menu").hasClass("active")){
		$("#site_menu").removeClass("active");
		$(".lightbox_bkg").fadeOut();
	}	
})
$(".lightbox").on("click", ".exit_lightbox", function(){
	lightbox_exit();
})
$("#lightbox_contain").click(function(e){
	if($(".lightbox_x").is(":visible")){
		if (e.target.id === "lightbox_contain"){
			lightbox_exit();
		}
	}
})


// Home Theater
var scroll_ready = 0;
$('#home_theater').bind('mousewheel DOMMouseScroll', function(e){
 	if(scroll_ready == 0){ 		
	   if(e.originalEvent.detail < 0  || e.originalEvent.wheelDelta > 0) { //Scrolling Up
	   	if($(".theater_list >li.active").prev("li").length != 0){
	      	$(".theater_list >li.active").prev().addClass("active");
	      	$(".theater_list >li.active:last").removeClass("active");
	      	$(".theater_list >li.up:last").removeClass("up");
	      }
	   }
	   else{ //Scrolling Down
	   	if($(".theater_list >li.active:last").next("li").length != 0){
		      $(".theater_list >li.active").addClass("up");
		      $(".theater_list >li.active").next().addClass("active");
		   }
	   }
	   scroll_ready = 1;
	   setTimeout(release_scroll, 1000);
	   function release_scroll(){
	   	scroll_ready = 0;
	   }
 	}
});