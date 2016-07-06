var mainslider;

$(document).ready(function(){
    var options = {
        slides: '.slide3', // The name of a slide in the slidesContainer
        swipe: true,    // Add possibility to Swipe > note that you have to include touchSwipe for this
        slideTracker: true, // Add a UL with list items to track the current slide
        slideTrackerID: 'slideposition3', // The name of the UL that tracks the slides
        slideOnInterval: false, // Slide on interval
        interval: 9000, // Interval to slide on if slideOnInterval is enabled
        animateDuration: 500, // Duration of an animation
        animationEasing: 'ease', // Accepts: linear ease in out in-out snap easeOutCubic easeInOutCubic easeInCirc easeOutCirc easeInOutCirc easeInExpo easeOutExpo easeInOutExpo easeInQuad easeOutQuad easeInOutQuad easeInQuart easeOutQuart easeInOutQuart easeInQuint easeOutQuint easeInOutQuint easeInSine easeOutSine easeInOutSine easeInBack easeOutBack easeInOutBack
        pauseOnHover: false // Pause when user hovers the slide container
    };

    $(".slider3").simpleSlider(options);
    mainslider = $(".slider3").data("simpleslider");
    /* yes, that's all! */
    

    $(".slider3").on("beforeSliding", function(event){
        var prevSlide = event.prevSlide;
        var newSlide = event.newSlide;
        $(".slider3 .slide3[data-index='"+prevSlide+"'] .slidecontent").fadeOut();
        $(".slider3 .slide3[data-index='"+newSlide+"'] .slidecontent").hide();
    });

    $(".slider3").on("afterSliding", function(event){
        var prevSlide = event.prevSlide;
        var newSlide = event.newSlide;
        $(".slider3 .slide3[data-index='"+newSlide+"'] .slidecontent").fadeIn();
    });

    $(".slide3#first").backstretch("imgs/onloading.gif");
    $(".slide3#sec").backstretch("imgs/onloading.gif");
    $(".slide3#thirth").backstretch("imgs/onloading.gif");

    $('.slide3 .backstretch img').on('dragstart', function(event) { event.preventDefault(); });

    $(".slidecontent").each(function(){
        $(this).css('margin-top', -$(this).height()/2);
    });
});
