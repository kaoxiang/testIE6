///<jscompress sourcefile="rss.js" />
	var newslist = new Array();
	var medialist = new Array();

	//复旦新闻视频部分
	
	// /fudannews/rss/?tagid=1
	$.get("../xml/content1.xml", function(data){
		
    	var target=$(".slide2");
    	doAppend(target,data,3,2);
    	storeArray(newslist,data);

    	//var target=$("#fd-news1 #news-sliders1 ul").first();
    	//doAppend(target,data,3,2);
    	
    });
	//媒体视角视频部分
	
	// /fudannews/rss/?tagid=8
	$.get("../xml/content2.xml", function(data){
  
		var target=$(".slide3");
    	doAppend(target,data,3,2);
    	storeArray(newslist,data);
	/*	var target=$("#small_slides2 li");
    	doAppend(target,data,3,2);
    	storeArray(medialist,data);
			$('#small_slides2').bxSlider2({
				prev_image: 'images/btn_arrow_left.jpg',
				next_image: 'images/btn_arrow_right.jpg',
				wrapper_class: 'slides1_wrap',
				margin: 70,
				auto: false,
				auto_controls: true
			});*/
    });
	//复旦新闻
	
	// /fudannews/rss/?catid=12
    $.get("../xml/content3.xml", function(data){
    	var target=$("#fd-news1 .newslist").first();
    	doAppend(target,data,5,3);
    //	doAppend(target,data,1,4);
    	
    });

    //综合新闻
	
	// /fudannews/rss/?catid=31
    $.get("../xml/content4.xml", function(data){
    	var target=$("#fd-news2 .newslist").first();
    	doAppend(target,data,9,0);
    	//doAppend(target,data,1,1);
    	
    });

    //媒体视角
	
	// /fudannews/rss/?catid=44
    $.get("../xml/content5.xml", function(data){
    	var target=$("#fd-news4 .newslist").first();
    	doAppend(target,data,4,5);
    	//doAppend(target,data,1,6);
    	
    });

    //科技动态
	
	// /fudannews/rss/?catid=68
    $.get("../xml/content6.xml", function(data){
    	var target=$("#fd-news5 .newslist").first();
    	doAppend(target,data,8,0);
    	//doAppend(target,data,1,1);
    	
    }); 
    
   //重要通知
   
   // /fudannews/rss/?catid=20000
    $.get("../xml/content7.xml", function(data){
    	var target=$("#fd-news6 .newslist").first();
    	doAppend(target,data,8,0);
    	//doAppend(target,data,1,1);
    	
    });

function storeArray(list,data) {
    $(data).find('channel').find('item').each(function(index, ele){
    	var title = $(ele).find('title').text();
    	list.push(title);
    });
}

function isInArray(text,list) {
	if($.inArray(text, list)==-1){
		return false;
	}else{
		return true;
	}
}

function doAppend(target,data,num,type) {
    $(data).find('channel').find('item').each(function(index, ele){
	var node="";
	if (type == 0){
		num = num-1;
	    node = genNewsNode1(ele);
	    target.append(node);
	}
	else if (type == 1){
		num = num-1;
	    node = genNewsNode2(ele);
	    target.append(node);
	}
	else if (type == 2){
		num = num-1;
	   // node = genPictureNode(ele);
	  //  target.append(node);
	 	modifyPicNode(index, ele, target);
	}
	else if (type == 3){
		var title = $(ele).find('title').text();
		if(isInArray(title,newslist)){
		}else{
			num = num-1;
			node = genNewsNode1(ele);
		    target.append(node);
		}
	}
	else if (type == 4){
		var title = $(ele).find('title').text();
		if(isInArray(title,newslist)){
		}else{
			num = num-1;
			node = genNewsNode2(ele);
		    target.append(node);
		}
	}else if (type == 5){
		var title = $(ele).find('title').text();
		if(isInArray(title,medialist)){
		}else{
			num = num-1;
			node = genNewsNode1(ele);
		    target.append(node);
		}
	}
	else if (type == 6){
		var title = $(ele).find('title').text();
		if(isInArray(title,medialist)){
		}else{
			num = num-1;
			node = genNewsNode2(ele);
		    target.append(node);
		}
	}    	
	
	if (num == 0){
	    	return false;
		}
    });
}

function genNewsNode1(ele) {
    var title = $(ele).find('title').text();
    var time = $(ele).find('pubDate').text();
    var link = $(ele).find('link').text();
    return "<li><a href='"+link+"'>"+title+"</a><span>"+time+"</span></li>";
}

function genNewsNode2(ele) {
	 var title = $(ele).find('title').text();
	 var time = $(ele).find('pubDate').text();
	 var link = $(ele).find('link').text();
	 return "<div style=\"font-size:14px;color:#444;padding:0px;margin-left:15px;\" class=\"col-xs-9 add-ellipsis\"><a href=\""+link+"\">"+title+"</a></div><div style=\"font-size:10px;padding:0px;margin-left:15px;\" class=\"col-xs-2\">"+time+"</div>";
}

function genPictureNode(ele) {
	 var title = $(ele).find('title').text();
	 var time = $(ele).find('pubDate').text();
	 var link = $(ele).find('link').text();
	 var description = $(ele).find('description').text();
	 var pictureUrl = $(ele).find('enclosure').attr("url");
	 
	 return "<li class=\"newsslider\"><div class=\"newsslidertext\"><a  href=\"" + link + "\" target=\"_blank\" >"+title+"</a><p>"+description+"</p></div><a  class=\"newssliderimg\" href=\""+link+"\" target=\"_blank\"><img src=\""+pictureUrl+"\"/></a></li>";
}


function modifyPicNode(index, ele, target) {
	 var title = $(ele).find('title').text();
	 var time = $(ele).find('pubDate').text();
	 var link = $(ele).find('link').text();
	 var description = $(ele).find('description').text();
	 var pictureUrl = $(ele).find('enclosure').attr("url");
	 
	 var t1 = target[index];
	 
	 if($(t1).hasClass("slide2")){
		 $(t1).find("img").attr("src", pictureUrl);
		 $(t1).find(".slide2_title").text(title);
		 $(t1).find("a").attr("href", link);
		 $(t1).find(".slide2_content").text(description);
		 $(t1).find(".slide2_time").text(time); 
	 }
	 else if($(t1).hasClass("slide3")){
		 $(t1).find("img").attr("src", pictureUrl);
		 $(t1).find(".slide3_title").text(title);
		 $(t1).find("a").attr("href", link);
		 $(t1).find(".slide3_content").text(description);
		 $(t1).find(".slide3_time").text(time); 
	 }
	 
	
	 
	 /*
	 if (target.length == 3) {
		 var t1 = target[index];
		 $(t1).find("img").attr("src", pictureUrl);
		 $(t1).find(".slides-a").text(title);
		 $(t1).find(".slides-a").attr("href", link);
		 $(t1).find(".slides1-content").text(description);
		 $(t1).find(".slides1-time").text(time);
	 }
	 else if (target.length == 5) {
		 var t1 = target[index + 1];
		 $(t1).find("img").attr("src", pictureUrl);
		 $(t1).find(".slides-a").text(title);
		 $(t1).find(".slides-a").attr("href", link);
		 $(t1).find(".slides1-content").text(description);
		 $(t1).find(".slides1-time").text(time);
	 }
	 */
}

function cutoff(title,len) {
    if (title.length>len)
    	return title.substr(0,len)+'...';
    else
	return title;
}