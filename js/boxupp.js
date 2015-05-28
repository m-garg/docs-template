var webPageInfo = (function(){

	var ipAddress = "";
	var addressData = {};
	var fetchUserIP = function(){
		
		$.ajax({
			type: "GET",
			url: "http://www.boxupp.com/boxupp-services/mail/checkIP",
			contentType: "application/json; charset=utf-8",
			async: true,
			success: function(responseData,status){
				ipAddress = responseData.realIPHeader;
				fetchIPDetails();
			}
		});
	};
	
	var fetchIPDetails = function(){
		
		$.ajax({
			type: "GET",
			url: "http://ipinfo.io/" + ipAddress + "/json",
			contentType: "application/json; charset=utf-8",
			async: true,
			success: function(responseData,status){
				addressData = responseData;	
				console.log(addressData);
			}
		});
	
	};
	
	return{
		userIP : function(){
			return ipAddress;		
		},
		ipDetails : function(){
			return addressData;
		},
		init : fetchUserIP(),
	}
})();

$(document).ready(function(){
	$('#siteNav').load('./partials/headerPart.html');
	$('#siteFooter').load('./partials/footerPart.html');
});
$('#feedback span.formControl input,#feedback span.formControl textarea').click(function(event){
	event.stopPropagation();
});

$('body').on('mouseover','div.descriptionPanl a',function(event){
	event.preventDefault();
	$(this).html('Coming Soon');
});

$('body').on('mouseout','div.descriptionPanl a',function(event){
	event.preventDefault();
	$(this).html('Show Me');
});

//$("#myForm").on('submit',function(event){
$("body").on('click','#subscribe',function(event){
event.preventDefault();
	var userEmail = $("#emailAddr").val();
	 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail))  
	  {  
		
		alert('ThankYou! For Subscribing To Our Monthly Newsletter');
		$.ajax({
			type: "GET",
			url: "http://www.boxupp.com/boxupp-services/mail/contactus?action=signup&email=" + userEmail,
			contentType: "application/json; charset=utf-8",
			async: true,
			success: function(data,status){
				//var responseData = JSON.parse(data);
			}
		});
		return false;
	  }  
    alert("Please enter a valid email address!");
	$('#emailAddr').focus();
    return false;

});

$('.downloadBoxupp').click(function(e){
	var downloadEmail = "";
	if(e.target.id === 'downloadBtn1'){
		downloadEmail = $('#mandatoryEmail1').val();	
	}else if(e.target.id === 'downloadBtn2'){
		downloadEmail = $('#mandatoryEmail2').val();	
	}
	
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(downloadEmail))  
	  {  
		//alert($('#startDownload').prop('id'));
		$('#startDownload')[0].click();
		$('p#directDownload').removeClass('hidden');
		$('p#emailMandate').addClass('hidden');
		$('p#directDownload').animate({opacity:'1'},400);
		saveEmailID(downloadEmail);
		alert("Thank you !! Your download will begin instantly. If it doesn't, please drop us an email at support@boxupp.com");
		return;
	  }
	  alert('Please enter correct email address');
});

function saveEmailID(userEmail){
	// var userEmail = $('#mandatoryEmail').val();
	var referrerSource = document.referrer;
	//if(referrerSource.length > 200){
		referrerSource = referrerSource.substring(0,50);
	//}
	console.log(referrerSource);
	var userDetails = webPageInfo.ipDetails();
	$.ajax({
			type: "GET",
			url: "http://www.boxupp.com/boxupp-services/mail/download?email=" + userEmail + "&productVersion=1.0.0" 
					+ "&source=" + referrerSource + "&address=" + userDetails.city + " " + userDetails.region + " "+userDetails.country 
					+ "&location=" + userDetails.ip,
			contentType: "application/json; charset=utf-8",
			async: true,
			success: function(data,status){
				//var responseData = JSON.parse(data);
			}
		});

}

$('#closeEmailMandate').click(function(e){
	e.preventDefault();
	$('p#directDownload').removeClass('hidden');
		$('p#emailMandate').addClass('hidden');
		$('p#directDownload').animate({opacity:'1'},400);
});

$('#enableMandate').click(function(e){
	$('p#directDownload').animate({opacity:'0.1'},400,function(){
		$('p#directDownload').addClass('hidden');	
		$('p#emailMandate').css({opacity:'0.1'});
		$('p#emailMandate').removeClass('hidden');
		$('p#emailMandate').animate({opacity:'1'},400,function(){
			
		});
	});
	
	
});

$('body').on('submit','#feedback',function(event){
	event.preventDefault();
	var feedbackMail = feedback.feedbackEmail.value;
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(feedbackMail))  
	  {  
		var userEmail = feedback.feedbackEmail.value;
		alert('Thanks for your feedback. We will get back to you soon');
		$('#feedbackSlider').click();
		var message = $("#feedbackMessage").val();
		$.ajax({
			type: "GET",
			url: "http://www.boxupp.com/boxupp-services/mail/contactus?action=feedback&email=" + userEmail + "&feedback="+message,
			contentType: "application/json; charset=utf-8",
			async: true,
			success: function(data,status){
				//var responseData = JSON.parse(data);
			}
		});
		return (true)  
	  }  
    alert("Please enter a valid email address!");
	$('#feedbackEmail').focus();
});

$('video').click(function(event){
	$('body').addClass('noScroll');
	$('#lightBox').show();
	//alert('Hello');
});

$('body').on('click','.triggerDescription',function(event){
	event.preventDefault();
	var activeFeature = $(this).data('feature');
	//$('#featuresDescription').children('div.active').fadeOut();
	$('#featuresDescription').children('div.active').removeClass('active');
	//$('#featuresDescription').children('div.featureDescription:eq(' + (activeFeature-1) + ')').fadeIn();
	$('#featuresDescription').children('div.featureDescription:eq(' + activeFeature + ')').addClass('active');
});

/*$('body').on('scroll','.container3',function(){
	alert('Hello');
});*/

$('body').on('click','.triggerSubFeature',function(event){
	event.preventDefault();
	$(this).siblings('.triggerSubFeature.active').removeClass('active');
	$(this).addClass('active');
	var activeParentFeature = $('.featureDescription.active');
	//alert($(this).data('subfeature'));
	var clickedSubFeature = $(this).data('subfeature');
	var activeSubFeatureDiv = $('.featureDescription.active').children('.subfeature.active');
	var activeSubFeature = $(activeSubFeatureDiv).data('subfeatureindex');
	if(activeSubFeature !== clickedSubFeature){
		$(activeSubFeatureDiv).animate({opacity:0},1000);
		$(activeSubFeatureDiv).removeClass('active');
		$('.featureDescription.active').children('.subfeature:eq(' + clickedSubFeature + ')').animate({opacity:1},1000);
		$('.featureDescription.active').children('.subfeature:eq(' + clickedSubFeature + ')').addClass('active');
	}
});

$('#feedbackSlider').click(function(event){
 event.preventDefault();
 event.stopPropagation();
 var state = $(this).data('state');
 if(state === 'close'){
  $("#feedbackWindow").animate({width:'350px'},1000);
  $(this).data('state','open');
 }
 else{
  $("#feedbackWindow").animate({width:'34px'},1000);
  $(this).data('state','close');
 }
});

$('#shareIdeas').click(function(event){
 event.stopPropagation();
 $('#feedbackSlider').click();
});

$('body').click(function(event){
 var feedbackSliderState = $('#feedbackSlider').data('state');
 if( feedbackSliderState === 'open'){
  $('#feedbackSlider').click();
 }
});

$('#lightBox').click(function(event){
	$('body').removeClass('noScroll');
	$('#lightBox').hide();
});

/*function prepareLayout(){
//alert('inside function');

$.featureList(
		$("#tabs li a"),
		$("#output li"), {
			start_item	:	0
		}
	);
	var heading_cur=0;
	showHeading();
	function showHeading(){
		$('#heading'+(heading_cur+1)).css({opacity: 0}).animate({opacity: 1.0,left: "50px"}, 1000);
		setTimeout(hideHeading, 5000);
	}
	function hideHeading(){
		$('#heading'+(heading_cur+1)).css({opacity: 1}).animate({opacity: 0,left: "-50px"}, 1000,function(){showHeading();});
		heading_cur=(heading_cur+1)%4;
	}
}*/



jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');
		$back_to_top2 = $('body');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible')  : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		//( $(this).scrollTop() > offset ) ? $back_to_top2.addClass('body-top60') : $back_to_top2.removeClass('body-top60'); 
		
		
		//$back_to_top2.addClass('top-bar-hide') : $back_to_top2.removeClass('top-bar-hide cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
			//$back_to_top2.addClass('body-top80');
			//$back_to_top2.animate({'opacity':'1'},500);
			
			
			
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		
		$('body,html').animate({
			scrollTop: 0 
		 	}, scroll_top_duration
		);
		
		//$('body').css("padding-top", 60 +'px' );
		
	});

});


$(".readmore").on("click",function(){
	
	$(".show-contnet").addClass("show-contnet-show");
	$(".readmore").css("display","none");
	
})



/*
.bind("click", function(e){
    $(".test").animateAuto("height", 1000); 
});*/
