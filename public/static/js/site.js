$(window).on("load" ,function(){
	setTimeout(function(){
		$(".load_screen").fadeOut();
	},3200);
	setTimeout(function(){
		$(".theater_list >li:first").removeClass("start");
	},2300)
});
//$(".load_screen").fadeOut();
var responsive_window = function(){
	var max_width = 1200;
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

$(".deck_link").click(function(){
	$("#site_menu").removeClass("active");
})

// Site Navigation
var navigation = function(){

	$(".nav_list a").click(function(e){
		var hash = this.hash;
		var s_hash = hash.split("?");

		var href = s_hash[0];
		var header_height = $("header").outerHeight(true);
		var anchor = $(href).offset().top;
		var body_pos = Math.abs($("body").scrollTop());
		var body = $("html,body");

		body.stop().animate({scrollTop: (anchor + body_pos)}, 500, 'swing');
		$("#site_menu").removeClass("active");
		$(".lightbox_bkg").fadeOut();
	})
}();

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
$(".lb_btn").click(function(){
	var content_name = $(this).attr("lb-content");
	var content = $(".lb_content[lb-content=" + content_name + "]").html();
	lightbox("contact", content);
})

// Subscribe
$("#subscribe_form").on("submit", function(e){
	e.preventDefault();
	var email = $(this).find("#subscribe_email").val();
	var id = "c673411e11";

	// $.post("https://usX.api.mailchimp.com/3.0/lists/c673411e11/members/",{
	// 	email_address : email,
 //    	status : "subscribed"
	// })
	// .done(function(data){
	// 	console.log(data);
	// })
console.log(email)
	$.ajax({
	    type: 'POST',
	    url: 'https://usX.api.mailchimp.com/3.0/lists/c673411e11/members/',
	    data: ({email_address: 'arisnunez@gmail.com', status : "subscribed"}),
	    success: function(data){
	    	console.log(data)
	    },
	    contentType: "application/json",
	    dataType: 'json'
	});
})

// Home Theater
var home_theater = function(){	
	var scroll_ready = 0;

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
	$('#home_theater').bind('mousewheel DOMMouseScroll', theater_slide_action);

	// Touch Slide
	$("#home_theater").bind('touchstart', handleTouchStart);        
	$("#home_theater").bind('touchmove', handleTouchMove);

	var xDown = null;
	var yDown = null;

	function handleTouchStart(e){
	   xDown = e.touches[0].clientX;
	   yDown = e.touches[0].clientY;
	};

	function handleTouchMove(e){
		if(scroll_through == false){
			e.preventDefault();
		}

		if(! xDown || ! yDown){return;}

		var xUp = e.touches[0].clientX;
		var yUp = e.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

	   if(Math.abs( xDiff )+Math.abs( yDiff )>150){ //to deal with to short swipes

	    	if(Math.abs(xDiff) > Math.abs(yDiff)){/*most significant*/
	    		           
	    	}else{
	    		if(yDiff > 0){/* up swipe */
	    			scroll_down();
	    		}else{ /* down swipe */
	    			scroll_up();
	    		}
	    	}

	    	/* reset values */
	    	xDown = null;
	    	yDown = null;
	   }
	};

	function theater_slide_action(e){
		if(scroll_through == false){
			e.preventDefault();
		}
	 	if(scroll_ready == 0){	
		   if(e.originalEvent.detail < 0  || e.originalEvent.wheelDelta > 0) { //Scrolling Up
		   	scroll_up()
		   }
		   else{ //Scrolling Down
		   	scroll_down()
		   }

		   scroll_ready = 1;
		   setTimeout(release_scroll, 1000);
		   function release_scroll(){
		   	scroll_ready = 0;
		   }
	 	}
	}
	$(".slide_index").on("click", "li", function(){
		var active_slide = $(".slide_index >li.active").index();
		var index = $(this).index();
		var slides = $(".theater_list >li");

		$(".slide_index >li").removeClass("active");
		$(this).addClass("active");

		slides.removeClass("active up");
		slides.eq(index).addClass("active");
		slides.eq(index).prevAll().addClass("active up");

		if($(".theater_list > li").last().hasClass("active")){
   		setTimeout(release_scroll, 1000);
   		function release_scroll(){
   			scroll_through = true;
   		}		      		
   	}
	})

   function scroll_up(){
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

   function scroll_down(){   	
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
	
}();