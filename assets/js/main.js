$(function() {
    /**
     * Hide bootstrap navbar when scrolling
     */
    /*let $navbar = $('.navbar');
    var navVisible = false, slideComplete = true;
    var prevScrollpos = 0;
    let delta = 5;

    if($(window).scrollTop() < 100) {
        $navbar.show();
        navVisible = true;
    }

    $(window).scroll(function () {
        let $currScrollpos = $(this).scrollTop();
        let $scrollBottom = $currScrollpos + $("body").height();
        let $documentHeight = $(".wrapper").height() + $("footer").height();

        // first 3 conditions for mobile devices
        if ($currScrollpos < 0 || $scrollBottom > $documentHeight || !slideComplete 
            || Math.abs(prevScrollpos - $currScrollpos) <= delta)
            return;

        if ($currScrollpos > prevScrollpos && navVisible) {
            navVisible = false;
            slideComplete = false;

            // Scroll down
            $navbar.slideUp({
                complete: function() {
                    slideComplete = true;
                }
            });
        } else if ($currScrollpos < prevScrollpos) {
            if ($currScrollpos < 100 && $navbar.hasClass("custom-background")) {
                $navbar.removeClass("custom-background");
            } else if ($currScrollpos >= 100 && !$navbar.hasClass("custom-background")) {
                $navbar.addClass("custom-background");
            }
            
            if (!navVisible) {
                navVisible = true;
                slideComplete = false;
                
                //Scroll up
                $navbar.slideDown({
                    start: function() {
                        $(this).css({ display: "flex" });
                    },
                    complete: function() {
                        slideComplete = true;
                    }
                });
            }
        }

        prevScrollpos = $currScrollpos;
    });*/

    /**
     * Insert Bootstrap table styling
     */
    $("table").addClass("table table-bordered table-hover table-display-block");
    
});  
