$(function() {
    /**
     * jquery.tagcloud.js
     */
    // only load tagcloud.js in tag.html
    if($('#tag_cloud').length !== 0){
        async('{{ "/js/jquery.tagcloud.js" | prepend: site.baseurl }}',function(){
            $.fn.tagcloud.defaults = {
                color: {start: '#bbbbee', end: '#0085a1'},
            };
            $('#tag_cloud a').tagcloud();
        });
    }

    /**
     * Hide bootstrap navbar when scrolling
     */
    let $navbar = $('.navbar');
    var prevScrollpos = $(window).scrollTop();
    $(window).scroll(function () {
        let currScrollpos = $(this).scrollTop();
        
        if ($navbar.is(":visible") && currScrollpos > prevScrollpos) {
            $navbar.slideUp();
        } else if ($navbar.is(":hidden") && prevScrollpos > currScrollpos) {
            $navbar.slideDown();
        }

        prevScrollpos = currScrollpos;
    });
});  
