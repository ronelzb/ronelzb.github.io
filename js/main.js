$(function() {
    /**
     * Hide bootstrap navbar when scrolling
     */
    let $navbar = $('.navbar');
    var navBarVisible = true;
    var prevScrollpos = $(window).scrollTop();
    if (prevScrollpos > 0 && !$('.navbar').hasClass("custom-background")) {
        $('.navbar').addClass("custom-background");
    }

    $(window).scroll(function () {
        let currScrollpos = $(this).scrollTop();
        
        if (currScrollpos > prevScrollpos) {
            //scrolling down
            if (navBarVisible) {
                navBarVisible = false;
                $navbar.slideUp({
                    complete: function() {
                        if (!$('.navbar').hasClass("custom-background")) {
                            $('.navbar').addClass("custom-background");
                        }
                    }
                });
            }
            
        } else { //(prevScrollpos > currScrollpos)
            //scrolling up
            if (!navBarVisible) {
                navBarVisible = true;
                $navbar.slideDown();
            }
            if (currScrollpos == 0 && $('.navbar').hasClass("custom-background")) {
                $('.navbar').removeClass("custom-background");
            }
        }

        prevScrollpos = currScrollpos;
    });

    /**
     * Insert Bootstrap table styling
     */
    $("table").addClass("table table-bordered table-hover table-display-block");
});  
