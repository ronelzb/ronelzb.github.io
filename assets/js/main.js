$(function() {
    /**
     * Hide bootstrap navbar when scrolling
     */
    let $navbar = $('.navbar');
    var navVisible = false;
    var prevScrollpos = 0;
    let delta = 5;

    if($(window).scrollTop() < 100) {
        $navbar.show();
        navVisible = true;
    }

    $(window).scroll(function () {
        let currScrollpos = $(this).scrollTop();

        if (Math.abs(prevScrollpos - currScrollpos) <= delta)
            return;

        if (currScrollpos > prevScrollpos && navVisible) {
            navVisible = false;

            // Scroll down
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
            
            if (!navVisible) {
                navVisible = true;
                
                //Scroll up
                $navbar.slideDown({
                    start: function() {
                        $(this).css({ display: "flex" });
                    }
                });
            }
        }

        prevScrollpos = currScrollpos;
    });

    /**
     * Insert Bootstrap table styling
     */
    $("table").addClass("table table-bordered table-hover table-display-block");

    /**
     * About imgs init
     *//*
    if ($("#header-big-imgs").length > 0) {
        let $pageHeader = $(".page-header");
        let $bigImgs = $("#header-big-imgs");
        let nImgs = parseInt($bigImgs.attr("data-num-img"));

        var getImgInfo = function() {
            var d = $.Deferred();
            let randNum = Math.floor((Math.random() * nImgs) + 1);
            let src = $bigImgs.attr("data-img-src-" + randNum);
            let desc = $bigImgs.attr("data-img-desc-" + randNum);
            
            let img = new Image();
            img.src = src;
            img.onload = function() {
                var result = {
                    src: this.src,
                    desc: desc
                }
                d.resolve(result);
            }

            return d;
        }
    
        var setImg = function(imgInfo) {
            $pageHeader.css({ 
                "background-image": 'url(' + imgInfo.src + ')' 
            });
            
            if (imgInfo.desc) {
                $(".img-desc").text(imgInfo.desc).show();
            } else {
                $(".img-desc").hide();
            }
        }

        // jQuery image crossfade
        var getNextImg = function() {
            getImgInfo().done(function(imgInfo) {
                setTimeout(function() {
                    var $img = $("<div></div>").addClass("big-img-transition").css({
                        "background-image": 'url(' + imgInfo.src + ')'
                    });
                    $pageHeader.prepend($img);
                    
                    $img.fadeTo(1000, 1, function() {
                        setImg(imgInfo);
                        setTimeout(function() { $img.remove(); }, 150); // avoids background-image change flickering
                        getNextImg();
                    });
                }, 6000);
            });
        }

        // set an initial image
        getImgInfo().done(function(imgInfo) {
            setImg(imgInfo);
        });

        // If there are multiple images, cycle through them
        if (nImgs > 1) {
            getNextImg();
        }
    }*/

    
});  
