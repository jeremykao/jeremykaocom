/**
 * Main JS file for Casper behaviours
 */
var GLOBALS = {
  minWidth: 768,
};

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        function casperFullImg() {
            $("img").each( function() {
                var contentWidth = $(".post-content").outerWidth(); // Width of the content
                var imageWidth = $(this)[0].naturalWidth; // Original image resolution

                if (imageWidth >= contentWidth) {
                    $(this).addClass('full-img');
                } else {
                    $(this).removeClass('full-img');
                }
            });
        };

        casperFullImg();
        $(window).smartresize(casperFullImg);

    });

}(jQuery));

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


var prevScroll = 0;
if ($(window).width() < GLOBALS.minWidth){
  $(window).scroll(_.throttle(onScrollAction, 100));
}

function onScrollAction(){
  var scrollPos = $(window).scrollTop(),
      hitBottom = $(window).scrollTop() + $(window).height() >= $(document).height();
  if (scrollPos < prevScroll - 10 || scrollPos === 0 || hitBottom){
    $('nav').removeClass('covered').addClass('uncovered');
  }
  else{
    $('nav').removeClass('uncovered').addClass('covered');
  }
  prevScroll = scrollPos;
}

$(".scrollUp").on('click', function(){
  $('body').animate({ scrollTop: 0 }, 500);
});