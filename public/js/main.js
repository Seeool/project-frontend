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

    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
    //
    // $(".categories__slider").owlCarousel({
    //     loop: true,
    //     margin: 0,
    //     items: 4,
    //     dots: false,
    //     nav: true,
    //     navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
    //     animateOut: 'fadeOut',
    //     animateIn: 'fadeIn',
    //     smartSpeed: 1200,
    //     autoHeight: false,
    //     autoplay: true,
    //     responsive: {
    //
    //         0: {
    //             items: 1,
    //         },
    //
    //         480: {
    //             items: 2,
    //         },
    //
    //         768: {
    //             items: 3,
    //         },
    //
    //         992: {
    //             items: 4,
    //         }
    //     }
    // });


    // $('.hero__categories__all').on('click', function () {
    //     $('.hero__categories ul').slideToggle(400);
    // });

    /*--------------------------
        Latest FeaturedProduct Slider
    ----------------------------*/
    // $(".latest-product__slider").owlCarousel({
    //     loop: false,
    //     margin: 0,
    //     items: 1,
    //     dots: false,
    //     nav: true,
    //     navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
    //     smartSpeed: 1200,
    //     autoHeight: false,
    //     autoplay: false
    // });

    /*-----------------------------
        FeaturedProduct Discount Slider
    -------------------------------*/
    // $(".product__discount__slider").owlCarousel({
    //     loop: false,
    //     margin: 0,
    //     items: 3,
    //     dots: true,
    //     smartSpeed: 1200,
    //     autoHeight: false,
    //     autoplay: true,
    //     responsive: {
    //
    //         320: {
    //             items: 1,
    //         },
    //
    //         480: {
    //             items: 2,
    //         },
    //
    //         768: {
    //             items: 2,
    //         },
    //
    //         992: {
    //             items: 3,
    //         }
    //     }
    // });

    /*---------------------------------
        FeaturedProduct Details Pic Slider
    ----------------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------
		Price Range Slider
	------------------------ */
    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('$' + ui.values[0]);
            maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*--------------------------
        Select
    ----------------------------*/
    // $("select").niceSelect();

    /*------------------
		Single FeaturedProduct
	--------------------*/
    $('.product__details__pic__slider img').on('click', function () {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__details__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__details__pic__item--large').attr({
                src: imgurl
            });
        }
    });



})(jQuery);