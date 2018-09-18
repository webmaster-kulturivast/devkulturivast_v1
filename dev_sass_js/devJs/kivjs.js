

// CENTER LANDING PAGE TEXT

jQuery(function ($){
    var _base_server_url = "http://www.kulturivast.se"; //"http://kulturivast.se.preview.binero.se"; //"http://kivdev.monoclick-dev.se";

    var changeFontColorArtikelsidor = function () {
        var changeh1 = $('.omossspace h1');

        if ($('.term-top-image').css('background-color') == "transparent") {

        } else {
            if (changeh1.css('color') != "transparent") {
                //changeh1.css('color', '#fff');
                console.log("inte transparent");
            }
            
        };
        if ($('.ajimage-omrade-nod').find("img").length > 0) {
            console.log("visar bild");
            if (changeh1.css('color') != "transparent") {
               // changeh1.css('color', '#eee');
                //changeh1.css('background-color', '#000');
                //changeh1.css('padding-bottom', '0.9rem');
                //changeh1.css('opacity', '0.9');

               // changeh1.attr('style', 'color:#eee; background-color:#000;  opacity:0.9; display:inline;');
                //$('.omossspace, .omossMenu2').css('margin-top', '-0.1rem');
                console.log("inte transparent");
            }
        } else {
            console.log("INGEN bild");
        }        

    
    };
    changeFontColorArtikelsidor();

    $.fn.getSize = function () {
        var $wrap = $("<div />").appendTo($("body"));
        $wrap.css({
            "position": "absolute !important",
            "visibility": "hidden !important",
            "display": "block !important"
        });

        $clone = $(this).clone().appendTo($wrap);

        sizes = {
            "width": this.width(),
            "height": this.height()
        };

        $wrap.remove();

        return sizes;
    };


    $(document).foundation({
        orbit: {
            stack_on_small: false,
            navigation_arrows: false,
            slide_number: false,
            pause_on_hover: false,
            resume_on_mouseout: false,
            bullets: false,
            timer: false,
            variable_height: false,
        }
    });
   
    
    // Menu offcanvas show hide START
   
    $('.left-small').on('click', function (e) {
        $('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
        return false;
    });
    $('.left-off-canvas-toggle').on('click', function (e) {
        $('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
        return false;
    });

    $('.exit-off-canvas').on('click', function (e) {
        $('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-right');
    });
    // Menu offcanvas show hide END

    $(".y-center").css("top", $(".y-center").parent().height() / 3.5);

   


    $(document).on('click', '.showingresstext', function (e) {
        //var valdclass = $(this).find('i');
        var valdclass = $(e.currentTarget).find('i');
        var addOrRemove = valdclass.hasClass("closed");
        var st = $(this).attr("style");
        var thatobj = $(e.currentTarget).parent().siblings(".ingresstext");

        
        var itembottommargin = 0;


        if (thatobj.length <= 0) {           
            thatobj = $(e.currentTarget).parent().siblings().find('.ingresstext');
        } else {
            //hämta clickat item
            var cur_clicked_Item = $(e.currentTarget).parent().parent().parent().parent().attr("style");
           
            //rensa bort absolut värdet från stringen
            cur_clicked_Item = cur_clicked_Item.replace('position: absolute;', '').trim();

            ////hämta clickatitem leftvärde:                
            var start_pos = cur_clicked_Item.indexOf('left:') + 5;
            //console.log("start_pos " + start_pos);
            var end_pos = cur_clicked_Item.indexOf('top:', start_pos);
            //console.log("end_pos " + end_pos);
            //hämta clickatitem topvärde
            var clickeditmTop_start = cur_clicked_Item.indexOf('top:') + 4;
            //console.log("clickeditmTop_start " + clickeditmTop_start);
            var clicked_item_height = cur_clicked_Item.substring(clickeditmTop_start, cur_clicked_Item.length - 3).trim();
            //console.log("clicked_item_height " + clicked_item_height);

            // hämta första delen av style för sökning senare
            var itemSelectStyleValue = cur_clicked_Item.substring(0, end_pos).trim();
            var Maincontainerheight = $(this).closest('.kivisotope').attr("style");
            //console.log("Maincontainerheight " + Maincontainerheight);

            //rensa bort position: relative; värdet från stringen
            Maincontainerheight = Maincontainerheight.replace('position: relative;', '').trim();
                       
            var cont_start_pos = Maincontainerheight.indexOf('height:') + 7;
            var cont_height = Maincontainerheight.substring(cont_start_pos, Maincontainerheight.length - 3).trim();
            Maincontainerheight = Maincontainerheight.substring(0, cont_start_pos).trim();
            //console.log("Maincontainerheight2 " + Maincontainerheight);
            var ny_cont_height = cont_height;
            //console.log("ny_cont_height " + ny_cont_height);
            var valdheight = thatobj.height();
            var debugg = thatobj.getSize();
            //console.log("thatobj.height() " + thatobj.height());

            if (addOrRemove) {
                thatobj.attr("rel", valdheight);
                itembottommargin += parseFloat(valdheight)
                ny_cont_height = parseFloat(ny_cont_height) + itembottommargin;

                Maincontainerheight = Maincontainerheight + " " + ny_cont_height.toString();
            } else {
                valdheight = thatobj.attr("rel");
                itembottommargin += parseFloat(valdheight)

                ny_cont_height = parseFloat(ny_cont_height) - itembottommargin;
                Maincontainerheight = Maincontainerheight + " " + ny_cont_height.toString();
                thatobj.attr("rel", "");
            }
            $(this).closest('.kivisotope').attr('style', "position: relative; "+ Maincontainerheight + "px;");
            var curid = $(this).closest('.kivisotope').attr('id');
            var rakna = 0;
            var loopdom = $('#' + curid + ' div[style*="' + itemSelectStyleValue + '"]');

            loopdom.each(function (index, value) {
                //hämta clickatitem topvärde
                var currentItem = $(value).attr('style');
                //rensa bort absolut värdet från stringen
                currentItem = currentItem.replace('position: absolute;', '').trim();

                var curitmTop_start = currentItem.indexOf('top:') + 4;
                var current_item_height = currentItem.substring(curitmTop_start, currentItem.length - 3).trim();
                // console.log("domloop current_item_height " + current_item_height);
                var nyposition = current_item_height;
                // console.log("domloop nyposition " + nyposition);
                if (parseInt(clicked_item_height) < parseInt(current_item_height)) {
                    var addedheight = itembottommargin + 0;
                    if (addOrRemove) {
                        nyposition = parseInt(current_item_height) + addedheight;
                    } else {
                        nyposition = parseInt(current_item_height) - addedheight;
                    }
                    var updatedStyleToAdd =" position: absolute; " + itemSelectStyleValue + ' top:' + nyposition.toString() + 'px;';
                    $(value).attr('style', updatedStyleToAdd);
                }               
            });
        }
          
        if (addOrRemove) {
            valdclass.removeClass("closed");
            valdclass.addClass("open");
            valdclass.html('<img src="'+_base_server_url +'/sites/all/themes/kivnew/images/MosaikStang28.png" alt="Dölj" />');
            
        } else {
            valdclass.addClass("closed");
            valdclass.removeClass("open");
            valdclass.html('<img src="' + _base_server_url + '/sites/all/themes/kivnew/images/MosaikPlus28.png" alt="Visa" />');
        }

         thatobj.slideToggle(100, function () {
             if (!$('i').hasClass("open")) {
                 $(this).closest('.kivisotope').isotope("layout", {
                     transitionDuration: 0
                 });
                 //console.log(" isotope run-----------------");
             }
             return false;
         });

         return false;
    });

    // körs på alla sidor som har en egen drupal listsida  dvs ingen css växling mellan mosaik och lista
    $(document).on('click', '.showingresstextlist', function (e) {
        var valdclass = $(this).find('i');
        var addOrRemove = valdclass.hasClass("closed");       
        var thatobj = $(e.currentTarget).parent().siblings(".ingresstextlist");
             
        if (addOrRemove) {
            valdclass.removeClass("closed");
            valdclass.addClass("open");
            valdclass.html('<img src="' + _base_server_url + '/sites/all/themes/kivnew/images/MosaikStang28.png" alt="Dölj" />');
            thatobj.show();

        } else {
            valdclass.addClass("closed");
            valdclass.removeClass("open");
            valdclass.html('<img src="' + _base_server_url + '/sites/all/themes/kivnew/images/MosaikPlus28.png" alt="Visa" />');
            thatobj.hide();
        }

        return false;
    });

    //old
    $('.showsnabblink').click(function (e) {
        var valdclass = $(this).find('i');
       
        //alert(cur_clicked_Item + "-->" + $(this).height());
        $(this).parent().siblings(".snabblink").slideToggle("fast", function () {
            $('#kivisotope2').isotope("layout", {
                transitionDuration: 0
            });
            var addOrRemove = valdclass.hasClass("fi-plus");
            var valdheight = $(this).height();
            if (addOrRemove) {
                valdclass.addClass("fi-x");
                valdclass.removeClass("fi-plus");
            } else {
                valdclass.addClass("fi-plus");
                valdclass.removeClass("fi-x");              
            }                       
        });

        return false;
    });

    $('#lasMerOmOssLink').on('click', function (e) {
        var addOrRemove = $('.omossMenu').hasClass("arrowhead");
      
        $('.omossContentBox2').slideToggle("slow", function () {            ///ändrat till 2
            $('.kivisotope').isotope("layout");            
            if (addOrRemove) {
                $('.omossMenu2').removeClass("arrowhead2");  // ändrat till 2
            };
        });
        
        if (!addOrRemove) {
            $('.omossMenu2').addClass("arrowhead2");
        }
        
        return false;
    });


    // TEST BLOCK om oss visa START
    $('.omossmenycontainer .lasMerOmOssLink ').on('click', function (e) {
        var that = $(this);
        var addOrRemove = that.hasClass("arrowhead2");
        var isAllreadyvisible= $('.omossContentBox2').is(':visible')
        $('.omossContentBox2').slideToggle("slow", function () {
            $('.kivisotope').isotope("layout");
            if (addOrRemove) {
                $('.omossmenycontainer a').removeClass("arrowhead2");//rensa alla
                
            };
        });

        if (!addOrRemove) {
            //$('.omossmenycontainer a').removeClass("arrowhead2");//rensa alla
            if (!isAllreadyvisible) {
                that.addClass("arrowhead2");
            }
            
        }

        return false;
    });
    // TEST BLOCK om oss visa END



    $('#kivlist').on('click', function (e) {
        $('.kivisotope').isotope('destroy');
        //$('.mozaikitems .small-10').removeClass('small-10').addClass('small-11');
        //$('.mozaikitems .small-2').removeClass('small-2').addClass('small-1');        
        $('.kivlistview').children().attr('class', "kivlist row callout-card aktuellt").attr('style', "");
        $('.mozaikimg').attr('class', "large-3 medium-3 small-3 columns imgplaceholder  listheight crop-height");
        $('.mozaikitems').attr('class', "large-9 medium-9 small-12 columns listcontent ").removeClass('mozaikitems');        
        $('.apsisbtnbox').removeClass('apsisbtnbox').addClass('apsisbtnboxList');
        
        return false;
    });

    $('#kivmozaik').on('click', function (e) {
//$('.kivlistview .small-11').removeClass('small-11').addClass('small-10');
//        $('.kivlistview .small-1').removeClass('small-1').addClass('small-2');
        $('.kivlist').attr('class', "large-3 medium-6 small-12 columns item callout-card aktuellt");
        $('.imgplaceholder').attr('class', "").addClass('mozaikimg');
        $('.listcontent').attr('class', "").addClass('mozaikitems');               
        $('.apsisbtnboxList').removeClass('apsisbtnboxList').addClass('apsisbtnbox');
        
 
        $('.kivisotope').isotope({
            itemSelector: '.item',
            //containerStyle: null,
            masonry: {
                // use element for option
                columnWidth: 250
            }
        });
       
        return false;
    })

    //evenemang
    // körs på alla sidor som har en egen drupal listsida  dvs ingen css växling mellan mosaik och lista
    $(document).on('click', '.showingresstext_list', function (e) {
        var valdclass = $(this).find('i');
        var addOrRemove = valdclass.hasClass("closed");
        var thatobj = $(e.currentTarget).parent().siblings(".ingresstext");

        if (addOrRemove) {
            valdclass.removeClass("closed");
            valdclass.addClass("open");
            valdclass.html('<img src="' + _base_server_url + '/sites/all/themes/kivnew/images/MosaikStang28.png" alt="Dölj" />');
            thatobj.show();

        } else {
            valdclass.addClass("closed");
            valdclass.removeClass("open");
            valdclass.html('<img src="' + _base_server_url + '/sites/all/themes/kivnew/images/MosaikPlus28.png" alt="Visa" />');
            thatobj.hide();
        }

        return false;
    });



    var removePlussicon = function (e) {
        var istextset = $('.ingresstext');
        istextset.each(function (index, value) {
            var testar = $(value).html();
            if ($(value).html()) {
                $(value).siblings().find('.showingresstext').show();
            }

        });

    }();

    var removelistPlussicon = function (e) {
        var istextset = $('.ingresstext');
        istextset.each(function (index, value) {
            var testar = $(value).html();
            if ($(value).html()) {
                $(value).siblings().find('.showingresstext_list').show();
            }

        });

    }();

    var removeListPagesPlussicon = function (e) {
        var istextset = $('.ingresstextlist');
        if (istextset.length <=0) {
            return function () { return false; };
        }

        istextset.each(function (index, value) {
            var testar = $(value).html();
            if ($(value).html()) {
                $(value).siblings().find('.showingresstextlist').show();
            }

        });
        
    }();

    $('.searchMainWrapper').hide();
    $('.right-small').on('click', function (e) {
        $('.searchMainWrapper').slideToggle('600', function () {           
        });
    });

    $(".menu-mlid-7255 a").first().addClass('togglebgimagehide');
    //$('.multiColumn').hide();
    $(".menu-mlid-7255 a").first().on('click', function (e) {
        var toggle_switch = $(this);
        $('.multiColumn').slideToggle("slow", function () {
            if ($(this).css('display') == 'none') {
                toggle_switch.addClass('togglebgimageshow').removeClass('togglebgimagehide')               
            } else {
                toggle_switch.addClass('togglebgimagehide').removeClass('togglebgimageshow')
            }
        });
        return false;

    });

    //var menybalk = function () {

    //   if (jQuery(".view-2015-produktioner").size();


    //}();
    
    jQuery('.omossMenu2').on('click', function () {

        jQuery('.artikelwrapper').toggle();

    });


   ////handlebars test START
   // var compiledTemplate = Handlebars.getTemplate('listviewtemplate');
   // var tmphtml = compiledTemplate({ testarvalue: 'detta funkar' });
   // console.log("start: " + tmphtml);
   //// handlebars test END 



    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-top').fadeIn();
        } else {
            $('.scroll-top').fadeOut();
        }
    });

    $('.scroll-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


    // scrollar ner från artikelmenyn till artikel ancor
    $('.omossContentBox2 .view-content a').on('click', function (e) {
        var href = $(e.currentTarget).attr('href');
        $("html, body").animate({
            scrollTop: $('a[name="' + href.substring(1, href.length) + '"]').offset().top
        }, 800);
        //alert("test");

    });
    

    removeListPagesPlussicon();
    

    //var kulturikatalogeninlogg = "<a href='#' class='lasMerOmOssLink' >";
    //kulturikatalogeninlogg += "<div class='small-12 medium-3 columns omossmenyblock'>Så här arbetar vi</div>";
    //kulturikatalogeninlogg += "<div class='small-12 medium-3 columns omossmenyblock'>Kontaktpersoner</div>";
    //kulturikatalogeninlogg += "<div class='small-12 medium-3 columns omossmenyblock'>Snabblänkar</div></a>";
    //kulturikatalogeninlogg += "<a href='http://kulturivast.se/kulturkatalogen-vast/logga-in-pa-kulturkatalogen-vast' class='lasMerOmOssLink'>";
    //kulturikatalogeninlogg += "<div class='small-12 medium-3 columns omossmenyblock kulturkatalogenloggainbutton'>Logga in</div></a>";

    //$('.section-kulturkatalogen-vast .omossmenycontainer').removeClass('medium-9').addClass('medium-12');
    //$('.section-kulturkatalogen-vast .omossmenycontainer').html(kulturikatalogeninlogg);
    /*
    //////////////////////////////////////////////////////////////////
     Första sidan slider
     andreas josefsson
    */

        $('.aj-carusel').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
              {
                  breakpoint: 1200,
                  settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: true,

                  }
              },
              {
                  breakpoint: 800,
                  settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                  }
              },
              {
                  breakpoint: 600,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                  }
              }
              // You can unslick at a given breakpoint now by adding:
              // settings: "unslick"
              // instead of a settings object
            ]
        });
      
        $('.startcarusel').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000
            
        });

      

    /*
    /////////////////////////////////////////////////////////////////////////////////
    */

    /*!
     * jQuery Sticky Footer 1.1
     * Corey Snyder
     * http://tangerineindustries.com
     *
     * Released under the MIT license
     *
     * Copyright 2013 Corey Snyder.
     *
     * Date: Thu Jan 22 2013 13:34:00 GMT-0630 (Eastern Daylight Time)
     * Modification for jquery 1.9+ Tue May 7 2013
     * Modification for non-jquery, removed all, now classic JS Wed Jun 12 2013
     */

    window.onload = function () {
        stickyFooter();

        //you can either uncomment and allow the setInterval to auto correct the footer
        //or call stickyFooter() if you have major DOM changes
        //setInterval(checkForDOMChange, 1000);
    };

    //check for changes to the DOM
    function checkForDOMChange() {
        stickyFooter();
    }

    //check for resize event if not IE 9 or greater
    window.onresize = function () {
        stickyFooter();
        $('#kivisotope').isotope("layout");
    }

    //lets get the marginTop for the <footer>
    function getCSS(element, property) {

        var elem = document.getElementsByTagName(element)[0];
        var css = null;

        if (elem.currentStyle) {
            css = elem.currentStyle[property];

        } else if (window.getComputedStyle) {
            css = document.defaultView.getComputedStyle(elem, null).
            getPropertyValue(property);
        }

        return css;

    }

    function stickyFooter() {

        if (document.getElementsByTagName("footer")[0].getAttribute("style") != null) {
            document.getElementsByTagName("footer")[0].removeAttribute("style");
        }

        if (window.innerHeight != document.body.offsetHeight) {
            var offset = window.innerHeight - document.body.offsetHeight;
            var current = getCSS("footer", "margin-top");

            if (isNaN(current) == true) {
                document.getElementsByTagName("footer")[0].setAttribute("style", "margin-top:2rem;");
                current = 0;
            } else {
                current = parseInt(current);
            }

            if (current + offset > parseInt(getCSS("footer", "margin-top"))) {
                document.getElementsByTagName("footer")[0].setAttribute("style", "margin-top:" + (current + offset) + "px;");
            }
        }
    }

    /*
    ! end sticky footer
    */
    //HELPER FOR LABEL PLACEHOLDER

    $('.view-press-gallery #edit-title').attr("placeholder", decodeURI("Fritexts%C3%B6k"));
    $('.view-2015-dokument #edit-title').attr("placeholder", decodeURI("Fritexts%C3%B6k"));
    $('.view-2015-staff #edit-combine').attr("placeholder", decodeURI("Fritexts%C3%B6k"));
    
});


//////första sidan slider

////jQuery(function ($) {
////    $(".anim-slider").animateSlider(
////         {
////             autoplay: true,   //starts the autoplay 
////             interval: 5000,   //time between slides if autoplay is true
////             animations:           //specify the animations for each element of the slide
////             {
////                 0:   //Slide No1
////                 {
////                     "h1":
////                     {
////                         show: "bounceIn",
////                         hide: "flipOutX",
////                         delayShow: "delay1s"

////                     },
////                     "h2":
////                     {
////                         show: "rotateIn",
////                         hide: "rotateOut",
////                         delayShow: "delay2s"
////                     }
////                 },
////                 1:   //Slide No2
////                 {
////                     ".slidetest":   //tagName or id or class name of the element  
////                    {
////                        show: "fadeIn",   //class to add when the element appears
////                        hide: "fadeOut",  //class to add when the element disappears
////                        delayShow: "delay1s"   //class to add to delay show effect
////                    },
////                     "h1":
////                     {
////                         show: "fadeIn,",
////                         hide: "bounceOut",
////                         delayShow: "delay2s"

////                     },
////                     "h2":
////                     {
////                         show: "rotateIn",
////                         hide: "rotateOut",
////                         delayShow: "delay2s"
////                     }
////                 },
////                 2:   //Slide No2
////                 {
////                     ".slidetest":   //tagName or id or class name of the element  
////                     {
////                         show: "fadeIn",   //class to add when the element appears
////                         hide: "fadeOut",  //class to add when the element disappears
////                         delayShow: "delay1s"   //class to add to delay show effect
////                     }

////                 }
////             }
////         }
////     );

////}); //// jquery end
