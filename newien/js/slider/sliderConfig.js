var mainslider;

$(document).ready(function(){
    var options = {
        slides: '.slide', // The name of a slide in the slidesContainer
        swipe: true,    // Add possibility to Swipe > note that you have to include touchSwipe for this
        slideTracker: true, // Add a UL with list items to track the current slide
        slideTrackerID: 'slideposition', // The name of the UL that tracks the slides
        slideOnInterval: true, // Slide on interval
        interval: 4000, // Interval to slide on if slideOnInterval is enabled
        animateDuration: 500, // Duration of an animation
        animationEasing: '', // Accepts: linear ease in out in-out snap easeOutCubic easeInOutCubic easeInCirc easeOutCirc easeInOutCirc easeInExpo easeOutExpo easeInOutExpo easeInQuad easeOutQuad easeInOutQuad easeInQuart easeOutQuart easeInOutQuart easeInQuint easeOutQuint easeInOutQuint easeInSine easeOutSine easeInOutSine easeInBack easeOutBack easeInOutBack
        pauseOnHover: false // Pause when user hovers the slide container
    };

    $(".slider").simpleSlider(options);
    mainslider = $(".slider").data("simpleslider");
    /* yes, that's all! */

    $(".slider").on("beforeSliding", function(event){
        var prevSlide = event.prevSlide;
        var newSlide = event.newSlide;
        $(".slider .slide[data-index='"+prevSlide+"'] .slidecontent").fadeOut();
        $(".slider .slide[data-index='"+newSlide+"'] .slidecontent").hide();
    });

    $(".slider").on("afterSliding", function(event){
        var prevSlide = event.prevSlide;
        var newSlide = event.newSlide;
        $(".slider .slide[data-index='"+newSlide+"'] .slidecontent").fadeIn();
    });

    $(".slide#first").backstretch("files/slider/1920/2016129.jpg");
    $(".slide#sec").backstretch("files/slider/1920/2016128.jpg");
    $(".slide#thirth").backstretch("files/slider/1920/2016127.jpg");
 /*   $(".slide#fourth").backstretch("files/slider/1920/2016126.jpg");*/
	

    $('.slide .backstretch img').on('dragstart', function(event) { event.preventDefault(); });

    $(".slidecontent").each(function(){
        $(this).css('margin-top', -$(this).height()/2);
    });
});
