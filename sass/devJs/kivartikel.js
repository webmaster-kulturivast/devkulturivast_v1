// kappsla START
(function () {
    jQuery(function ($) {// Jquery START

        $('.artikelMenu .lasMerOmOssLink').on('click', function (e) {
            var addOrRemove = $('.artikelMenu').hasClass("arrowhead");
            $('.artikelsubmenuContent').slideToggle("slow", function () {
              
                if (addOrRemove) {
                    $('.artikelMenu').removeClass("arrowhead");
                };
            });

            if (!addOrRemove) {
                $('.artikelMenu').addClass("arrowhead");
            }


            return false;
        });       
        

    });// Jquery END
})();// kappsla och exeute END
