'use strict';

(function () {
    $(document).ready(function() {
        fillBars();
    });
    
    $(window).scroll(function() {
        fillBars();
    });
    
    function fillBars() {
        $(".progressanim").each(function() {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();
            
            if (pos < winTop + 750) {
                $(this).css('width', $(this).data('percent') + '%');
            }
        });
    }
})();