/*  ---------------------------------------------------
    Template Name: Ogani
    Description:  Ogani eCommerce  HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Gallery filter
    --------------------*/
    $('.featured__controls li').on('click', function () {
        $('.featured__controls li').removeClass('active');
        $(this).addClass('active');
    });
    if ($('.featured__filter').length > 0) {
        var containerEl = document.querySelector('.featured__filter');
        var mixer = mixitup(containerEl);
    }

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });


})(jQuery);