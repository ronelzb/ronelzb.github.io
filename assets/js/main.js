$(function() {
    let scrolling = false;

    $(window).scroll(() => {
        if (!scrolling) {
            scrolling = true;

            navbarToggle.checkScrollPosition();

            setTimeout(() => {
                scrolling = false;
            }, 100);
        }
    });
    
    $(window).resize(() => {
        if (window.innerWidth < 768) {
            if ($("#header-collapsible-navbar").is(":visible")) {
                navbarToggle.showCollapseStyles();
            }
        } else {
            navbarToggle.hideCollapseStyles();
        }
    });

    navbarToggle.onInit();

    /**
     * Insert Bootstrap table styling
     */
    $("table").addClass("table table-bordered table-hover table-display-block");
});  

var navbarToggle = navbarToggle || (() => {
    /**
     * Hide bootstrap navbar when scrolling
     */
    let $window = $(window);
    let $navbar = $('.navbar');
    let data = $navbar.data();
    let scrolledPast = false;

    function _onInit() {
        $("#header-collapsible-navbar").on("show.bs.collapse", () => {
            _showCollapseStyles();
    
            $("body").addClass("menu-open");
        });

        $("#header-collapsible-navbar").on("hide.bs.collapse", () => {
            _hideCollapseStyles();
    
            $("body").removeClass("menu-open");
        });

        _checkScrollPosition($window.scrollTop());
    }

    /**
     * Switch navigator back to start state
     * @param {boolean} forceChange 
     */
    function _switchStart(forceChange) {
        if (forceChange || scrolledPast) {
            scrolledPast = false;

            // browser resized >= md
            if (window.innerWidth >= 768 || !$("#header-collapsible-navbar").is(":visible")) {
                $navbar.removeClass(data.intocolor).addClass(data.startcolor)
            }
            
            $navbar.removeClass(data.intosize).addClass(data.startsize);
        }
    }

    /**
     * Switch navigator into new state
     * @param {boolean} forceChange 
     */
    function _switchInto(forceChange) {
        if (forceChange || !scrolledPast) {
            scrolledPast = true;
        
            // new state will always set into new color and size
            $navbar.removeClass(data.startcolor).addClass(data.intocolor);
            $navbar.removeClass(data.startsize).addClass(data.intosize);
        }
    }

    /**
     * Check scroll position the set the current state
     * @param {number} $currScrollpos 
     * @param {boolean} forceChange 
     */
    function _checkScrollPosition(forceChange) {
        ($window.scrollTop() > 100) ? _switchInto(forceChange) : _switchStart(forceChange);
    }

    /**
     * When on mobile or resizing < md
     * Check styles to show collapsible navbar content
     */
    function _showCollapseStyles() {
        if(!$navbar.hasClass(data.intocolor)) {
            $navbar.removeClass(data.startcolor).addClass(data.intocolor);
        }
        
        if ($navbar.hasClass(data.startsize)) {
            $navbar.removeClass(data.startsize).addClass(data.openmenustartsize);
        } else {
            $navbar.removeClass(data.intosize).addClass(data.openmenuintosize);
        }
    }

    /**
     * When on mobile or resizing >= md
     * Check styles to hide collapsible navbar content
     */
    function _hideCollapseStyles() {
        ($window.scrollTop() > 100)
            ? $navbar.removeClass(data.startcolor).addClass(data.intocolor) 
            : $navbar.removeClass(data.intocolor).addClass(data.startcolor);
        
        if ($navbar.hasClass(data.openmenustartsize)) {
            $navbar.removeClass(data.openmenustartsize).addClass(data.startsize);
        } else {
            $navbar.removeClass(data.openmenuintosize).addClass(data.intosize);
        }
    }

    return {
        checkScrollPosition: _checkScrollPosition,
        showCollapseStyles: _showCollapseStyles,
        hideCollapseStyles: _hideCollapseStyles,
        onInit: _onInit
    }
})();