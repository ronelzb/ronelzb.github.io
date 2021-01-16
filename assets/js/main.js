$(function() {
    /**
     * Hide bootstrap navbar when scrolling
     */
    let $navbar = $('.navbar');
    let data = $navbar.data();
    let scrolling = false, scrolledPast = false;

    function switchStart() {
        if (!scrolledPast) return;
        scrolledPast = false;
        
        $navbar.addClass(data.startcolor);
        $navbar.addClass(data.startsize);
        $navbar.removeClass(data.intocolor);
        $navbar.removeClass(data.intosize);
    }

    function switchInto(forceChange) {
        if (!forceChange && scrolledPast) return;
        scrolledPast = true;
        
        $navbar.removeClass(data.startcolor);
        $navbar.removeClass(data.startsize);
        $navbar.addClass(data.intocolor);
        $navbar.addClass(data.intosize);
      };

    function checkScrollPosition($currScrollpos) {
        ($currScrollpos > 100) ? switchInto() : switchStart();
    }

    $(window).scroll(() => {
        if (!scrolling) {
            scrolling = true;

            checkScrollPosition($(this).scrollTop());

            setTimeout(() => {
                scrolling = false;
            }, 100);
        }
    });

    checkScrollPosition($(window).scrollTop());

    $("#header-collapsible-navbar").on("show.bs.collapse", () => {
        if (!$navbar.hasClass("navbar-light bg-light")) {
            switchInto(true);
        }
    });

    $("#header-collapsible-navbar").on("hide.bs.collapse", () => {
        checkScrollPosition($(window).scrollTop());
    });

    /**
     * Insert Bootstrap table styling
     */
    $("table").addClass("table table-bordered table-hover table-display-block");
    
    $(window).resize(() => {
        if (window.innerWidth < 768) {
            console.log($("#header-collapsible-navbar").is(":visible"));
            if ($("#header-collapsible-navbar").is(":visible") && !$navbar.hasClass("navbar-light bg-light")) {
                switchInto(true);
            }
        } else {
            checkScrollPosition($(window).scrollTop());
        }
    });
});  
