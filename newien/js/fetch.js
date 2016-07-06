$(document).ready(function(){
    var baseUrl = 'http://www.fudan.edu.cn';
    var MONTH_CN = {'01':'一','02':'二','03':'三','04':'四','05':'五','06':'六','07':'七','08':'八','09':'九','10':'十','11':'十一','12':'十二'};
    var news_xml_1,news_xml_2;
    var news_xml_p;

    function cutoff(title,len) {
    if (title.length>len)
    	return title.substr(0,len)+'...';
    else
	return title;
    }

    var conf = [
	{"pageNum":"1", 
	 "function":function(result){
	     news_xml_1=result;
	     news_xml_p=1;
	     var data_list=$(result).find('channel').find('item');
	     var nodei=data_list.first();
	     $('#news-fig img').attr('src',nodei.find('enclosure').attr('url'));
	     $('#news-fig a').attr('href',nodei.find('link').text());
	     $("#rss-news .panel-body .caption .content-title a").html(cutoff(nodei.find('title').text(),42));
	     $("#rss-news .panel-body .caption .content-title a").attr('href',nodei.find('link').text());
	     $("#rss-news .panel-body .caption .content-detail").html(cutoff(nodei.find('description').text(),50));
	     $("#special-time").html(nodei.find('pubDate').text())
	 }},
	{"pageNum":"2", 
	 "function":function(result){
	     news_xml_2=result;
	     var data_list=$(result).find('channel').find('item');
	     var nodei=data_list.first();
	     $("#rss-news .panel-body .post-padding .content-title a").each(function(i){
		 $(this).html(cutoff(nodei.find('title').text(),28));
		 $(this).attr('href',nodei.find('link').text());
		 nodei=nodei.next();
	     });

	     var nodei=data_list.first();
	     $("#rss-news .panel-body .post-padding .content-detail").each(function(i){
		 $(this).html(cutoff(nodei.find('description').text(),36));
		 nodei=nodei.next();
	     });

	     var nodei=data_list.first();
	     $("#rss-news .panel-body .post-padding .content-time").each(function(i){
		 $(this).html(nodei.find('pubDate').text());
		 nodei=nodei.next();
	     });
	 }},
	{"pageNum":"30000", 
	 "function":function(result){
	     var data_list=$(result).find('channel').find('item');
	     var nodei=data_list.first();
	     $("#rss-events .panel-body .lined-title a").each(function(i){
		 $(this).html(cutoff(nodei.find('title').text(),24));
		 $(this).attr('href',nodei.find('link').text());
		 nodei=nodei.next();
	     });

	     var nodei=data_list.first();
	     $("#rss-events .panel-body .event-location-address").each(function(i){
		 $(this).html(nodei.find('place').text());
		 nodei=nodei.next();
	     });

	     var nodei=data_list.first();
	     $("#rss-events .panel-body .event-time").each(function(i){
		 $(this).html(nodei.find('pubDate').text().substr(-8,5));
		 nodei=nodei.next();
	     });

	     var nodei=data_list.first();
	     $("#rss-events .panel-body .event-date").each(function(i){
		 var date=nodei.find('pubDate').text();
		 var month=MONTH_CN[date.substr(5,2)]+"月";
		 var day=date.substr(8,2);
		 // alert($(this).html());
		 $(this).find(".event-month").html(month);
		 $(this).find(".event-day").html(day);
		 nodei=nodei.next();
	     });

	 }},
	{"pageNum":"20000",
	 "function":function(result){
	     var data_list=$(result).find('channel').find('item');
	     var nodei=data_list.first();
	     $("#rss-notices .panel-body .content-title a").each(function(i){
		 $(this).html(cutoff(nodei.find('title').text(),30));
		 $(this).attr('href',nodei.find('link').text())
		 nodei=nodei.next();
	     });

	     var nodei=data_list.first();
	     $("#rss-notices .panel-body .content-detail").each(function(i){
		 $(this).html(cutoff(nodei.find('description').text(),42));
		 nodei=nodei.next();
	     });

	     var nodei=data_list.first();
	     $("#rss-notices .panel-body .content-time").each(function(i){
		 $(this).html(nodei.find('pubDate').text().substr(0,10));
		 nodei=nodei.next();
	     });
	 }},
	{"pageNum":"12",
	 "function":function(result){
	     var data_list=$(result).find('channel').find('item');
	     var nodei=data_list.first();
	     $("#fd-news2 ul.newslist li a").each(function(i){
		 $(this).html(cutoff(nodei.find('title').text(),30));
		 $(this).attr('href',nodei.find('link').text())
		 nodei=nodei.next();
	     });

	     var nodei=data_list.first();
	     $("#fd-news2 ul.newslist li span").each(function(i){
		 $(this).html(cutoff(nodei.find('pubDate').text(),42));
		 nodei=nodei.next();
	     });
	 }}	 
    ];

    function parseFetchedData(pageNum, processFunc){
	if (pageNum<7)
	    $.get("../xml/tagid"+pageNum+".xml", processFunc);
	else
	    $.get("../xml/catid"+pageNum+".xml", processFunc);
	//$.get("rss"+pageNum, processFunc);
    }

    $.each(conf, function(index, value){
	parseFetchedData(value["pageNum"], value["function"]);
    });

	/*
	
    // $.get(baseUrl+"/weibo.txt", function(result){
    $.get("weibo.txt", function(result){
	var s=result.split('\n\n');
	var i=0;
	while (i<2 && s[2*i+1].length<20)
	    i++;
	$('#weibo-content').html(s[2*i+1]);
	$('#weibo-time').html(s[2*i]);
    },"text");
    // $.get(baseUrl+"/weixin.txt", function(result){
    $.get("weixin.txt", function(result){
	var s=result.split('\n\n');
	$('#weixin-title').html(cutoff(s[0],15));
    	$('#weixin-content').html(s[1]);
	$('#weixin-time').html(s[2]);
    },"text");


    $('#news-change').click(function(){
	// alert(news_xml_p);

	var data_list=$(news_xml_1).find('channel').find('item');
	var nodei=data_list.first();
	for (var i=0;i<news_xml_p;i++)
	    nodei=nodei.next();
	$('#news-fig img').attr('src',nodei.find('enclosure').attr('url'));
	$('#news-fig a').attr('href',nodei.find('link').text());
	$("#rss-news .panel-body .caption .content-title a").html(cutoff(nodei.find('title').text(),42));
	$("#rss-news .panel-body .caption .content-title a").attr('href',nodei.find('link').text());
	$("#rss-news .panel-body .caption .content-detail").html(cutoff(nodei.find('description').text(),50));
	$("#special-time").html(nodei.find('pubDate').text())

	data_list=$(news_xml_2).find('channel').find('item');
	nodei=data_list.first();
	for (var i=0;i<3*news_xml_p;i++)
	    nodei=nodei.next();
	var first_node=nodei;
	$("#rss-news .panel-body .post-padding .content-title a").each(function(i){
	    $(this).html(cutoff(nodei.find('title').text(),28));
	    $(this).attr('href',nodei.find('link').text());
	    nodei=nodei.next();
	});

	var nodei=first_node;
	$("#rss-news .panel-body .post-padding .content-detail").each(function(i){
	    $(this).html(cutoff(nodei.find('description').text(),36));
	    nodei=nodei.next();
	});

	var nodei=first_node;
	$("#rss-news .panel-body .post-padding .content-time").each(function(i){
	    $(this).html(nodei.find('pubDate').text());
	    nodei=nodei.next();
	});
	
	news_xml_p+=1;
	if (news_xml_p==3)
	    news_xml_p=0;
    });
	*/	
})