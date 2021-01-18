$(function() {
    /**
     * Hide bootstrap navbar when scrolling
     */
    let $navbar = $('.navbar');
    let data = $navbar.data();
    let scrolling = false, scrolledPast = false;

    function switchStart(forceChange) {
        if (!forceChange && !scrolledPast) return;
        scrolledPast = false;

        if (window.innerWidth >= 768 || !$("#header-collapsible-navbar").is(":visible")) {
            $navbar.removeClass(data.intocolor).addClass(data.startcolor)
        }
        
        $navbar.removeClass(data.intosize).addClass(data.startsize);
    }

    function switchInto(forceChange) {
        if (!forceChange && scrolledPast) return;
        scrolledPast = true;
        
        $navbar.removeClass(data.startcolor).addClass(data.intocolor);
        $navbar.removeClass(data.startsize).addClass(data.intosize);
      };

    function checkScrollPosition($currScrollpos, forceChange) {
        ($currScrollpos > 100) ? switchInto(forceChange) : switchStart(forceChange);
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
        if(!$navbar.hasClass(data.intocolor)) {
            $navbar.removeClass(data.startcolor).addClass(data.intocolor);
        }
        
        if ($navbar.hasClass(data.startsize)) {
            $navbar.removeClass(data.startsize).addClass(data.openmenustartsize);
        } else {
            $navbar.removeClass(data.intosize).addClass(data.openmenuintosize);
        }

        $("body").addClass("menu-open");
    });

    $("#header-collapsible-navbar").on("hide.bs.collapse", () => {
        ($(window).scrollTop() > 100)
            ? $navbar.removeClass(data.startcolor).addClass(data.intocolor) 
            : $navbar.removeClass(data.intocolor).addClass(data.startcolor);
        
        if ($navbar.hasClass(data.openmenustartsize)) {
            $navbar.removeClass(data.openmenustartsize).addClass(data.startsize);
        } else {
            $navbar.removeClass(data.openmenuintosize).addClass(data.intosize);
        }

        $("body").removeClass("menu-open");
    });

    /**
     * Insert Bootstrap table styling
     */
    $("table").addClass("table table-bordered table-hover table-display-block");
    
    $(window).resize(() => {
        if (window.innerWidth < 768) {
            if ($("#header-collapsible-navbar").is(":visible")) {
                if(!$navbar.hasClass(data.intocolor)) $navbar.removeClass(data.startcolor).addClass(data.intocolor);

                if ($navbar.hasClass(data.startsize)) {
                    $navbar.removeClass(data.startsize).addClass(data.openmenustartsize);
                } else {
                    $navbar.removeClass(data.intosize).addClass(data.openmenuintosize);
                }
            }
        } else {
            checkScrollPosition($(window).scrollTop(), true);

            if ($navbar.hasClass(data.openmenustartsize)) {
                $navbar.removeClass(data.openmenustartsize).addClass(data.startsize);
            } else if ($navbar.hasClass(data.openmenuintosize)) {
                $navbar.removeClass(data.openmenuintosize).addClass(data.intosize);
            }
        }
    });
});  
