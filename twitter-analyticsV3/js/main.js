
var dasIp = "52.77.25.83";

var authenticatingString = window.btoa("admin:user@das");


;(function () {

	'use strict';

	// iPad and iPod detection
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Full height
	var fullHeight = function() {
		if ( !isiPhone() || !isiPad() ) {
			$('.js-full-height').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-full-height').css('height', $(window).height());
			});
		}
	};

	// Scroll Next
	var ScrollNext = function() {
		$('body').on('click', '.scroll-btn', function(e){
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $( $(this).closest('[data-next="yes"]').next()).offset().top
			}, 1000, 'easeInOutExpo');
			return false;
		});
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	// Counter
	var counter = function() {
		$('.fh5co-counter-style-1').waypoint( function( direction ) {
			var el = $(this.element).attr('class');
			if( direction === 'down' && !$(this.element).hasClass('animated')) {
				setTimeout( function(){
					// console.log($(this.element));
					$('.'+el).find('.js-counter').countTo({
						 formatter: function (value, options) {
				      	return value.toFixed(options.decimals);
				   	},
					});
				} , 200);

				$(this.element).addClass('animated');

			}
		} , { offset: '75%' } );


		$('.fh5co-counter-style-2').waypoint( function( direction ) {
			var el = $(this.element).attr('class');
			if( direction === 'down' && !$(this.element).hasClass('animated')) {
				setTimeout( function(){
					$('.'+el).find('.js-counter').countTo({
						 formatter: function (value, options) {
				      	return value.toFixed(options.decimals);
				   	},
					});
				} , 200);

				$(this.element).addClass('animated');

			}
		} , { offset: '75%' } );
	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvass, .js-fh5co-mobile-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	$('html').removeClass('mobile-menu-expanded');
	    	$('.js-fh5co-mobile-toggle').removeClass('active');
	    }
		});
	};

	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
			event.preventDefault();
		});

	};

	// Off Canvass
	var offCanvass = function() {

		if ( $('#fh5co-offcanvass').length == 0 ) {
			if ( $('.fh5co-nav-style-1').length > 0 ) {
				$('body').prepend('<div id="fh5co-offcanvass" />');

				$('.fh5co-link-wrap').each(function(){
					$('#fh5co-offcanvass').append($(this).find('[data-offcanvass="yes"]').clone());
				})
				$('#fh5co-offcanvass').find('.js-fh5co-mobile-toggle').remove();
				$('#fh5co-offcanvass, #fh5co-page').addClass($('.fh5co-nav-style-1').data('offcanvass-position'));
				$('#fh5co-offcanvass').addClass('offcanvass-nav-style-1');
			}

			if ( $('.fh5co-nav-style-2').length > 0 ) {
				$('body').prepend('<div id="fh5co-offcanvass" />');

				$('.fh5co-link-wrap').each(function(){
					$('#fh5co-offcanvass').append($(this).find('[data-offcanvass="yes"]').clone());
				})
				$('#fh5co-offcanvass').find('.js-fh5co-mobile-toggle').remove();
				$('#fh5co-offcanvass, #fh5co-page').addClass($('.fh5co-nav-style-2').data('offcanvass-position'));
				$('#fh5co-offcanvass').addClass('offcanvass-nav-style-2');
			}
		}

		$('body').on('click', '.js-fh5co-mobile-toggle', function(e){
			var $this = $(this);
			$this.toggleClass('active');
			$('html').toggleClass('mobile-menu-expanded');

		});

		if ( $(window).width() < 769 ) {
			$('body, html').addClass('fh5co-overflow');
		}

		$(window).resize(function(){
			if ( $(window).width() < 769 ) {
				$('body, html').addClass('fh5co-overflow');
			}
			if ( $(window).width() > 767 ) {
				if ( $('html').hasClass('mobile-menu-expanded')) {
					$('.js-fh5co-mobile-toggle').removeClass('active');
					$('html').removeClass('mobile-menu-expanded');
				}
			}
		});

	};


	// Magnific Popup

	var imagePopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 10,
			titleSrc: 'title',
			gallery:{
				enabled:false
			}
		});
	};


	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#fh5co-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top fh5co-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
					}, 100 );
				}
			}

		});
	};



	// Document on load.
	$(function(){

                setInterval(ajaxLatest, 2000);
                ajaxNews();
		getTop6();
                getTop5();
		setInterval('ajaxPopular("Trump");', 5000);
		setInterval('PopularElection("Trump");',5000);
		setInterval(ajaxPopularLink, 5000);
		ajaxGarphSentiment("js/SentimetGraphServer.jag","11","22","33");


        communityGraph("tgraph");


	});


	//Top 6
	function getTop6(){
        $.ajax({

        		url: "https://52.77.25.83:9453/analytics/tables/TOP5",
        		beforeSend: function (xhr) {
        			xhr.setRequestHeader("Authorization", "Basic " + authenticatingString);
        		},
        		method: "GET",

        		contentType: "application/json",
        		success: function (top) {
        			//	console.log(JSON.stringify(top));
                              			var j = 1;
        			for (var i = 0; i < 5; i++) {

        				var nameID = "#Cname" + (j);
        				var imageID = "#Cimage" + (j);
        				var countID = "#Ccount" + (j);
        				var cloudDiv="single-word-cloud"+(j);
        				j++;
        				$(imageID).attr("src",top[i].values.imageUrl);

        				$(nameID).html(top[i].values.fullName);

        				$(countID).html(top[i].values.retweet);

        				drawPersonWordCloud( cloudDiv ,top[i].values.party ,top[i].values.color);


        			}

        		}


        	});


	}


	function getTop5() {
         var tstart=0, tcount=5;
	$.ajax({

		url: "https://52.77.25.83:9453/analytics/tables/TOPRETWEETER/1456876800000/1482451201000/0/5",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + authenticatingString);
		},
		method: "GET",

		contentType: "application/json",  
        	success: function (data) {
			console.log(JSON.stringify(data));
			var j = 1;
			for (var i = 0; i < 5; i++) {

				var nameID = "#ID" + (j);
				var imageID = "#img" + (j);
				var fullNameID = "#Fname" + (j);

				var countID = "#count" + (j);
				j++;

				var url = "https://twitter.com/" + data[i].values.name + "/profile_image?size=original";

				var tname = "@" + data[i].values.name;

				$(imageID).attr("src",url);

				//$(fullNameID).html(data[i].values.fullName);
				$(nameID).html(tname);
				$(countID).html(data[i].values.retweet);


			}

		}


	});


}

}());
