var responsive_window = function(){
	var max_width = 800;
	$(window).resize(function(){
		if($(window).width() <= max_width){

			if($(".site_contain").length > 0){
				responsive_font();
			}
		}else if($("body").css("font-size") != "16px"){
			$("body").css('font-size', "100%")
		}
	})

	function responsive_font(){
		var em_perc;
		var window_width = $(window).width();

		if($(window).width() >= max_width){
			em_perc = 100;
		}else{
			em_perc = window_width/(max_width/100);
		}

		$("body").css('font-size', em_perc + "%")
	}

	if($(".site_contain").length > 0){
		responsive_font();
	}
}();

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
var home_theater = function(){	
	var scroll_ready = 0;

	//Initial Slide
	$(".theater_list >li:first").addClass("active");

	//Slide Index
	var slide_amnt = $(".theater_list > li").length;
	for(var i = 1; i <= slide_amnt; i++){
		if(i == 1){
			$(".slide_index").append("<li class=active><span>" + i +"</span></li>")
		}else{
			$(".slide_index").append("<li><span>" + i +"</span></li>")
		}
	}

	//Action Text
	var initail_action_text = $(".theater_list > li.active .action_text").html();
	$(".slide_action span").html(initail_action_text);

	//Slide Scroll
	var scroll_through = false;
	$('#home_theater').bind('mousewheel DOMMouseScroll', function(e){
		if(scroll_through == false){
			e.preventDefault();
		}
	 	if(scroll_ready == 0){	
		   if(e.originalEvent.detail < 0  || e.originalEvent.wheelDelta > 0) { //Scrolling Up
		   	if($(".theater_list >li.active").prev("li").length != 0){
		      	$(".theater_list >li.active").prev().addClass("active");
		      	$(".theater_list >li.active:last").removeClass("active");
		      	$(".theater_list >li.up:last").removeClass("up");

		      	//Slide Index
		      	$(".slide_index >li.active").prev().addClass("active");
		      	$(".slide_index >li.active").last().removeClass("active");

		      	//Action Text
		      	var action_text = $(".theater_list >li.active:last .action_text").html();
		      	$(".slide_action span").html(action_text);

		      	//Scroll Actions
		      	if(scroll_through == 1){
		      		scroll_through = 0;
		      		var body = $("html, body");
		      		body.stop().animate({scrollTop: 0}, 500, 'swing');
		      	}
		      }
		   }
		   else{ //Scrolling Down
		   	if($(".theater_list >li.active:last").next("li").length != 0){
			      $(".theater_list >li.active").addClass("up");
			      $(".theater_list >li.active").next().addClass("active");

			      //Slide Index
		      	$(".slide_index >li.active").next().addClass("active");
		      	$(".slide_index >li.active").first().removeClass("active");

		      	//Action Text
		      	var action_text = $(".theater_list >li.active:last .action_text").html();
		      	$(".slide_action span").html(action_text);

		      	//Scroll Actions
		      	if($(".theater_list > li").last().hasClass("active")){
		      		setTimeout(release_scroll, 1000);
		      		function release_scroll(){
		      			scroll_through = true;
		      		}		      		
		      	}
			   }
		   }
		   scroll_ready = 1;
		   setTimeout(release_scroll, 1000);
		   function release_scroll(){
		   	scroll_ready = 0;
		   }
	 	}
	});	
}();