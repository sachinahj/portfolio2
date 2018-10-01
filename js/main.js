/* Table of Contents
==================================================
# Navigation Height
# Counter
# Progress Bar
# EasyPieChart
# MagnificPopup
# onePageNav
# Sticky Nav
# Mobile Toggle Control

==================================================
*/

// -------------------------------------------------------------
//Mobile Toggle Control
// -------------------------------------------------------------

(function() {
    var navMain = $(".navbar-collapse");
    $(".navbar-collapse a").on("click", function() {
        navMain.collapse('hide');
    });
});

// -------------------------------------------------------------
// Progress Bar
// -------------------------------------------------------------

(function() {
    $('.progress-content').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'), function() {
                $(this).css('width', $(this).attr('aria-valuenow') + '%');
            });
            $(this).unbind('inview');
        }
    });
    $('.rating-bar').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'), function() {
                $(this).css('width', $(this).attr('aria-valuenow') + '%');
            });
            $(this).unbind('inview');
        }
    });
}());


// -------------------------------------------------------------
// EasyPieChart
// -------------------------------------------------------------

(function() {
    $('.language-skill').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $('.chart').easyPieChart({
                easing: 'easeOut',
                delay: 3000,
                scaleColor: false,
                animate: 2000,
                onStep: function(from, to, percent) {
                    this.el.children[0].innerHTML = Math.round(percent);
                }
            });
        }
    });
}());

// -------------------------------------------------------------
// Navigation Scroll
// -------------------------------------------------------------

(function() {
    $(window).scroll(function(event) {
        Scroll();
    });

    $('#mainmenu li a').click(function() {
        if ($(".navbar").width() == $(window).width()) {
            var offset = $(".navbar-header").height();
        } else {
            var offset = 0;
        }
        $('html, body').animate({ scrollTop: $(this.hash).offset().top - offset }, 1000);
        return false;
    });

    // User define function
    function Scroll() {
        var contentTop = [];
        var winTop = $(window).scrollTop();
        var rangeTop = 200;
        $('#mainmenu').find('.scroll a').each(function() {
            var sectionId = $(this).attr('href');
            contentTop.push({
                sectionId: sectionId,
                offset: $(sectionId).offset().top,
            });
        });
        var currentSectionId = contentTop[0].sectionId;
        $.each(contentTop, function(i) {
            if (winTop > contentTop[i].offset - rangeTop) {
                currentSectionId = $('#mainmenu li.scroll')
                    .removeClass('current')
                    .eq(i)
                    .addClass('current')
                    .find('a')
                    .attr('href');
            }
        });
        gtag('event', 'view', {
            event_category: 'section',
            event_label: currentSectionId,
        });
    };
}());

// -------------------------------------------------------------
// Link Tracking
// -------------------------------------------------------------

(function() {
    $('a[data-track]').click(function(e) {
        e.preventDefault();
        var url = this.href;
        var label = this.dataset.track;
        var redirect = function () { document.location = url; }
        gtag('event', 'click', {
            event_category: 'outbound',
            event_label: label,
            event_callback: redirect,
        });
        setTimeout(redirect, 1000);
    });
}());
