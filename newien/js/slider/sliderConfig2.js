var mainslider;

$(document).ready(function(){
    var options = {
        slides: '.slide2', // The name of a slide in the slidesContainer
        swipe: true,    // Add possibility to Swipe > note that you have to include touchSwipe for this
        slideTracker: true, // Add a UL with list items to track the current slide
        slideTrackerID: 'slideposition2', // The name of the UL that tracks the slides
        slideOnInterval: true, // Slide on interval
        interval: 9000, // Interval to slide on if slideOnInterval is enabled
        animateDuration: 500, // Duration of an animation
        animationEasing: 'ease', // Accepts: linear ease in out in-out snap easeOutCubic easeInOutCubic easeInCirc easeOutCirc easeInOutCirc easeInExpo easeOutExpo easeInOutExpo easeInQuad easeOutQuad easeInOutQuad easeInQuart easeOutQuart easeInOutQuart easeInQuint easeOutQuint easeInOutQuint easeInSine easeOutSine easeInOutSine easeInBack easeOutBack easeInOutBack
        pauseOnHover: false // Pause when user hovers the slide container
    };

    $(".slider2").simpleSlider(options);
    mainslider = $(".slider2").data("simpleslider");
    /* yes, that's all! */
    

    $(".slider2").on("beforeSliding", function(event){
        var prevSlide = event.prevSlide;
        var newSlide = event.newSlide;
        $(".slider2 .slide2[data-index='"+prevSlide+"'] .slidecontent").fadeOut();
        $(".slider2 .slide2[data-index='"+newSlide+"'] .slidecontent").hide();
    });

    $(".slider2").on("afterSliding", function(event){
        var prevSlide = event.prevSlide;
        var newSlide = event.newSlide;
        $(".slider2 .slide2[data-index='"+newSlide+"'] .slidecontent").fadeIn();
    });

    $(".slide2#first").backstretch("imgs/onloading.gif");
    $(".slide2#sec").backstretch("imgs/onloading.gif");
    $(".slide2#thirth").backstretch("imgs/onloading.gif");

    $('.slide2 .backstretch img').on('dragstart', function(event) { event.preventDefault(); });

    $(".slidecontent").each(function(){
        $(this).css('margin-top', -$(this).height()/2);
    });
});
