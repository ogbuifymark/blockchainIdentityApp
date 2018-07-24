(function($){
  $(function(){
    $('select').material_select();
    $("#otherCL").owlCarousel({items:5, autoplay:true, loop:true});
    $('.button-collapse').sideNav();

    
  }); // end of document ready
})(jQuery); // end of jQuery name space

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if(scroll>100){
    	$("#header, #index-banner").addClass("active");
    }
    else{
    	$("#header, #index-banner").removeClass("active")
    }
});