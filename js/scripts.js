$( document ).ready(function() {
  // smooth scrolling for internal links from here: http://www.paulund.co.uk/smooth-scroll-to-internal-links-with-jquery
  $('a.smooth').on('click',function (e) {
      e.preventDefault();
      var target = this.hash,
      $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing', function () {
          if(target == "#landingpage"){
            history.pushState("", document.title, window.location.pathname + window.location.search); /* remove the hashtag */
          } else {
            window.location.hash = target;
          }
      });
  });
});
