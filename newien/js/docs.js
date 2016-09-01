$(function(){
	
// make code pretty
    	window.prettyPrint && prettyPrint();
    	
    	
    	$('.docs-taber-head li').click(function(){
    		$('.docs-taber-head li').removeClass('selected').eq($(this).index()).addClass('selected');
    		$('.docs-taber-body').hide().eq($(this).index()).show();
    		return false;
    	})
		
// thumb
	var images = $('.thumbs');
    if (images !== undefined && images[0] !== undefined) {
        for (var i = 0; i < images.length; i++) {
            var pcCol = images[i].attributes["pc-col"].nodeValue;
            var mobCol = images[i].attributes["mob-col"].nodeValue;
            if ($(window).width() > 940) {
                var screenWidth = $(window).width() / pcCol;
            } else {
                var screenWidth = $(window).width() / mobCol;
            }
            switch (true) {
            case screenWidth <= 240 : var imageResize = "240";
                break;
            case (screenWidth <= 320) && (screenWidth > 240) : var imageResize = "320";
                break;
            case (screenWidth <= 360) && (screenWidth > 320) : var imageResize = "360";
                break;
            case (screenWidth <= 480) && (screenWidth > 360) : var imageResize = "480";
                break;
            case (screenWidth <= 540) && (screenWidth > 480) : var imageResize = "540";
                break;
            case (screenWidth <= 640) && (screenWidth > 540) : var imageResize = "640";
                break;
            case (screenWidth <= 720) && (screenWidth > 640) : var imageResize = "720";
                break;
            case (screenWidth <= 768) && (screenWidth > 720) : var imageResize = "768";
                break;
            case (screenWidth <= 800) && (screenWidth > 768) : var imageResize = "800";
                break;
            case (screenWidth < 940) && (screenWidth > 800) : var imageResize = "940";
                break;
            case (screenWidth <= 1440) && (screenWidth >= 940) : var imageResize = "1001";
                break;
            case (screenWidth <= 1680) && (screenWidth > 1440) : var imageResize = "1180";
                break;
            case (screenWidth <= 1920) && (screenWidth > 1680) : var imageResize = "1370";
                break;
            case screenWidth > 1920 : var imageResize = "1600";
                break;
            default:
                var imageResize = "default";
                break;
            }
            var imageArray = images[i].attributes["data-src"].nodeValue.split('/');
            if (imageArray[imageArray.length - 2] == "default") {
                imageArray[imageArray.length - 2] = imageResize;
            }
            images[i].src = imageArray.join('/');
        }
    }

//gallery

	$('.animated').click(function(){
		window.location.href=$(this).attr('href');

	});

	$('.img-container').mouseover(function(){
		var desc_container = $(this).children('.desc-container');
		var an = $(this).children('.animated');
		$(desc_container).css({
			'display':'none'
		});
		$(an).css({
			'display':'block'
		})
	});
	
	$('.img-container').mouseout(function(){
		var desc_container = $(this).children('.desc-container');
		var an = $(this).children('.animated');
		$(desc_container).css({
			'display':'block'
		});
		$(an).css({
			'display':'none'
		})
	});

//wiki	

    $(".taber .head a").click(function (e) {  
      e.preventDefault();  
    }); 
/*	
    $(".taber .head a").click(function () {  
        return false; 
    })	
*/	
})



