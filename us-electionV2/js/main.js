var dasIp = "52.77.25.83";

var authenticatingString = window.btoa("admin:user@das");

;(function() {

    'use strict';

    // iPad and iPod detection
    var isiPad = function() {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function() {
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    };

    // Full height
    var fullHeight = function() {
        if (!isiPhone() || !isiPad()) {
            $('.js-full-height').css('height', $(window).height());
            $(window).resize(function() {
                $('.js-full-height').css('height', $(window).height());
            });
        }
    };

    // Scroll Next
    var ScrollNext = function() {
        $('body').on('click', '.scroll-btn', function(e) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: $($(this).closest('[data-next="yes"]').next()).offset().top
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
        $('.fh5co-counter-style-1').waypoint(function(direction) {
            var el = $(this.element).attr('class');
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                setTimeout(function() {
                    // console.log($(this.element));
                    $('.' + el).find('.js-counter').countTo({
                        formatter: function(value, options) {
                            return value.toFixed(options.decimals);
                        },
                    });
                }, 200);

                $(this.element).addClass('animated');

            }
        }, {
            offset: '75%'
        });


        $('.fh5co-counter-style-2').waypoint(function(direction) {
            var el = $(this.element).attr('class');
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                setTimeout(function() {
                    $('.' + el).find('.js-counter').countTo({
                        formatter: function(value, options) {
                            return value.toFixed(options.decimals);
                        },
                    });
                }, 200);

                $(this.element).addClass('animated');

            }
        }, {
            offset: '75%'
        });
    };

    // Click outside of offcanvass
    var mobileMenuOutsideClick = function() {
        $(document).click(function(e) {
            var container = $("#fh5co-offcanvass, .js-fh5co-mobile-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('html').removeClass('mobile-menu-expanded');
                $('.js-fh5co-mobile-toggle').removeClass('active');
            }
        });
    };

    // Burger Menu
    var burgerMenu = function() {

        $('body').on('click', '.js-fh5co-nav-toggle', function(event) {
            if ($('#navbar').is(':visible')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
            event.preventDefault();
        });

    };

    // Off Canvass
    var offCanvass = function() {

        if ($('#fh5co-offcanvass').length == 0) {
            if ($('.fh5co-nav-style-1').length > 0) {
                $('body').prepend('<div id="fh5co-offcanvass" />');

                $('.fh5co-link-wrap').each(function() {
                    $('#fh5co-offcanvass').append($(this).find('[data-offcanvass="yes"]').clone());
                })
                $('#fh5co-offcanvass').find('.js-fh5co-mobile-toggle').remove();
                $('#fh5co-offcanvass, #fh5co-page').addClass($('.fh5co-nav-style-1').data('offcanvass-position'));
                $('#fh5co-offcanvass').addClass('offcanvass-nav-style-1');
            }

            if ($('.fh5co-nav-style-2').length > 0) {
                $('body').prepend('<div id="fh5co-offcanvass" />');

                $('.fh5co-link-wrap').each(function() {
                    $('#fh5co-offcanvass').append($(this).find('[data-offcanvass="yes"]').clone());
                })
                $('#fh5co-offcanvass').find('.js-fh5co-mobile-toggle').remove();
                $('#fh5co-offcanvass, #fh5co-page').addClass($('.fh5co-nav-style-2').data('offcanvass-position'));
                $('#fh5co-offcanvass').addClass('offcanvass-nav-style-2');
            }
        }

        $('body').on('click', '.js-fh5co-mobile-toggle', function(e) {
            var $this = $(this);
            $this.toggleClass('active');
            $('html').toggleClass('mobile-menu-expanded');

        });

        if ($(window).width() < 769) {
            $('body, html').addClass('fh5co-overflow');
        }

        $(window).resize(function() {
            if ($(window).width() < 769) {
                $('body, html').addClass('fh5co-overflow');
            }
            if ($(window).width() > 767) {
                if ($('html').hasClass('mobile-menu-expanded')) {
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
            gallery: {
                enabled: false
            }
        });
    };


    // Window Scroll
    var windowScroll = function() {
        var lastScrollTop = 0;

        $(window).scroll(function(event) {

            var header = $('#fh5co-header'),
                scrlTop = $(this).scrollTop();

            if (scrlTop > 500 && scrlTop <= 2000) {
                header.addClass('navbar-fixed-top fh5co-animated slideInDown');
            } else if (scrlTop <= 500) {
                if (header.hasClass('navbar-fixed-top')) {
                    header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
                    setTimeout(function() {
                        header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
                    }, 100);
                }
            }

        });
    };



    // Document on load.
    $(function() {

     //drawCommunityGraph("tgraph");
        var graphNodes,graphEdges; var graph = new Object(); var map = new Object();
        var counter=1; var index=0;var dataset1,dataset2;

       var nodeWorker= new Worker('js/workerNode.js');
       nodeWorker.onmessage = function(event) {
                                 //  console.log("Community " + event.data + "iterations");
             dataset1=event.data;

             counter --;
             nodeWorker.terminate();
        };
       var edgeWorker= new Worker('js/workerEdge.js');
        edgeWorker.onmessage = function(event) {
                                          console.log("Community " + event.data + "iterations");
                      dataset2=event.data;

                     if(counter==0){
                                          console.log("render graph");
                                            dataset1.forEach(function (d) {
                                               // alert(d.name);
                                               map[d.name] = index;
                                               d.degree = parseInt(d.degree)
                                               index++;
                                           });

                                           graph.nodes = dataset1;
                                        //  tlinks = new Object();
                                           dataset2.forEach(function (d) {

                                               /*
                                                Data Format Edge
                                                ================
                                                source
                                                target
                                                value

                                                Data Format Vertex
                                                ================
                                                name
                                                group
                                                degree - decide size of the vertex

                                                */

                                              var s = map[d.source];
                                               var t = map[d.target];

                                               if (typeof  s === "undefined" || typeof  t === "undefined") {
                                                   d.source = 1
                                                   d.target = 2;

                                               } else {
                                                   d.source = map[d.source];
                                                   d.target = map[d.target];
                                                   d.value = parseInt(d.value)
                                               }
                                           });

                                        graph.links = dataset2;
                                        //console.log(graph);
                                        drawCommunityGraph("tgraph",graph)
                                       edgeWorker.terminate();

                     }

                };

      /*   var communityGraphWorker = new Worker('js/workerCommunityGraph.js');
                communityGraphWorker.onmessage = function(event) {
                          //  console.log("Community " + event.data + "iterations");
                            var graphData=event.data;
                            drawCommunityGraph("tgraph",graphData)
                           // console.log(JSON.stringify(graphData));
                             communityGraphWorker.terminate();
                }; */
        var top5Worker = new Worker('js/workerCandidate.js');
        top5Worker.onmessage = function(event) {
            //console.log("Completed top5 " + event.data + "iterations");
            var top=event.data;
           // console.log(JSON.stringify(top));
            for(var i=0;i<top.length;i++){
                $(top[i].imageID).attr("src", top[i].ImgUrl);
                $(top[i].nameID).html(top[i].fullName);
                $(top[i].countID).html(top[i].retweet);
                drawPersonWordCloud(top[i].cloudDiv, top[i].party, top[i].color);
                top5Worker.terminate();
            }
        };





         setInterval(ajaxLatest, 2000);
         ajaxNews();


        setInterval('ajaxPopular("Trump");', 5000);
        setInterval('PopularElection("Trump");',5000);
       setInterval(ajaxPopularLink, 5000);
        ajaxGarphSentiment("js/SentimetGraphServer.jag","11","22","33");




    });





}());