
jQuery(function ($) {

    //$('.kivisotope').imagesLoaded(function () {

    //    alert("loaded");
    //    $(this).isotope('reloadItems');
    //    $(this).isotope({
    //        itemSelector: '.item',
    //        //containerStyle: null,
    //        masonry: {
    //            // use element for option
    //            columnWidth: 250
    //        }
    //    });
    //    $(this).isotope('reloadItems');
    //});


        jQuery(document).ajaxComplete(function (event, request, settings) {
           
           
            //alert("complete");
            //setTimeout(function () {
                //jQuery('.kivisotope').isotope('destroy');
                $('.kivisotope').isotope('reloadItems');
                $('.kivisotope').isotope({
                    itemSelector: '.item',
                    //containerStyle: null,
                    masonry: {
                        // use element for option
                        columnWidth: 250
                    }
                });
                $('.kivisotope').isotope('reloadItems');
                //alert("tee");

            //}, 3500);
       
        });
        jQuery(document).ajaxStop(function (event, request, settings) {


            //alert("stop");
            setTimeout(function () {
            //jQuery('.kivisotope').isotope('destroy');
            $('.kivisotope').isotope('reloadItems');
            $('.kivisotope').isotope({
                itemSelector: '.item',
                //containerStyle: null,
                masonry: {
                    // use element for option
                    columnWidth: 250
                }
            });
            $('.kivisotope').isotope('reloadItems');
            $('.pager-load-more li').html(function () {

                if ($(this).html() == "&nbsp;") {

                    $(this).hide();
                }
            });

            }, 700);

        });
    });