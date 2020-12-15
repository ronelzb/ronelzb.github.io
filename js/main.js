$(function() {
    /**
     * Hide bootstrap navbar when scrolling
     */
    let $navbar = $('.navbar');
    var prevScrollpos = 0;

    if($(window).scrollTop() < 100) {
        $navbar.show();
    }

    $(window).scroll(function () {
        let currScrollpos = $(this).scrollTop();

        if (currScrollpos > prevScrollpos) {
            $navbar.slideUp({
                complete: function() {
                    if (!$(this).hasClass("custom-background")) {
                        $(this).addClass("custom-background");
                    }
                }
            });
        } else if (currScrollpos < prevScrollpos) {
            if (currScrollpos < 100 && $navbar.hasClass("custom-background")) {
                $navbar.removeClass("custom-background");
            }
            
            $navbar.slideDown({
                start: function() {
                    $(this).css({ display: "flex" });
                }
            });
        }

        prevScrollpos = currScrollpos;
    });

    /**
     * Insert Bootstrap table styling
     */
    $("table").addClass("table table-bordered table-hover table-display-block");
});  
