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

$(function() {
    var navMain = $(".navbar-collapse");
    $(".navbar-collapse a").on("click", function() {
        navMain.collapse('hide');
    });
});

// -------------------------------------------------------------
// Progress Bar
// -------------------------------------------------------------

$(function() {
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

$(function() {
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

$(function() {
    $(window).scroll(function(event) {
        $('.navbar-collapse').collapse('hide');
        Scroll();
    });

    $('#mainmenu li a.nav-item').click(function() {
        if ($(".navbar").width() == $(window).width()) {
            var offset = $(".navbar-header").height();
        } else {
            var offset = 0;
        }
        $('html, body').animate({ scrollTop: $(this.hash).offset().top - offset }, 1000);
        return false;
    });

    // User define function
    var currentSectionId = null;
    function Scroll() {
        var sections = [];
        var winTop = $(window).scrollTop();
        var rangeTop = 200;
        $('#mainmenu').find('.scroll a').each(function() {
            var sectionId = $(this).attr('href');
            sections.push({
                id: sectionId,
                offset: $(sectionId).offset().top,
            });
        });
        var newSectionId = sections[0].id;
        $.each(sections, function(i) {
            if (winTop > sections[i].offset - rangeTop) {
                newSectionId = $('#mainmenu li.scroll')
                    .removeClass('current')
                    .eq(i)
                    .addClass('current')
                    .find('a')
                    .attr('href');
            }
        });
        if (currentSectionId != newSectionId) {
            gtag('event', 'view', {
                event_category: 'section',
                event_label: newSectionId.replace("#", ""),
            });
            currentSectionId = newSectionId
        }
    };
}());

// -------------------------------------------------------------
// Link Tracking
// -------------------------------------------------------------

$(function() {

    var isAdBlockEnabled = (function AdBlockEnabled() {
        var ad = document.createElement('ins');
        ad.className = 'AdSense';
        ad.style.display = 'block';
        ad.style.position = 'absolute';
        ad.style.top = '-1px';
        ad.style.height = '1px';
        document.body.appendChild(ad);
        isAdBlockEnabled = !ad.clientHeight;
        document.body.removeChild(ad);
        return isAdBlockEnabled;
    })();

    $('a[data-track]').click(function(e) {
        console.log("e", e);
        e.preventDefault();
        var self = this;
        var _redirect = true
        var redirect = function () {
            console.log("_redirect", _redirect);
            if (!_redirect) {
                return;
            }
            if (self.target === '_blank') {
                window.open(self.href);
            } else {
                document.location = self.href;
            }
            _redirect = false
        }
        gtag('event', 'click', {
            event_category: 'outbound',
            event_label: this.dataset.track,
            event_callback: redirect,
        });
        setTimeout(redirect, 1000);
    });
}());
