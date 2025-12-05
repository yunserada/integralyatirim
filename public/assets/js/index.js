$(window).on('load', () => {
  $('body').removeClass('preload');
});

var mq = window.matchMedia("(max-width: 1280px)");
if (mq.matches) {
  $('.product-nav-in').appendTo('.mobile-filter-content');
}

$('.about-page, .certificates-page, .contact-page, .product-details, .dealers, .categories-page, .product-page').parent().prev('.header').addClass('header-after');

$(document).on("click","[data-target]",function(){
  var data = $(this).data("target");
  $(data).fadeIn();
  if ($(data).children('.mobile-filter-content')) {
    $(data).children('.mobile-filter-content').css('left', '0');
  }
  if ($(data).children('.mobile-nav-content')) {
    $(data).children('.mobile-nav-content').css('right', '0');
  }
});
$(document).click(function(e) {
  var target = e.target;
  if (!$(target).is('.modal-content, .modal-content *, .export-detail-box-content .input button, .being-cdealer-btn')) {
    $(".see-dealer").fadeOut();
    $(".being-dealer").fadeOut();
    $(".being-cdealer").fadeOut();
  }
});

$(document).keyup(function(e) {
  if (e.keyCode === 27) {
    $(".see-dealer").fadeOut();
    $(".being-dealer").fadeOut();
    $(".being-cdealer").fadeOut();
  }
});
$('.mobile-filter-close').click(function() {
  $('.product-filter').fadeOut();
  $('.mobile-filter-content').css('left', '-999px');
});

$('.mobile-nav-head button').click(function() {
  $('.mobile-nav').fadeOut();
  $('.mobile-nav-content').css('right', '-999px');
});

// Show more/less

var mq = window.matchMedia("(max-width: 640px)");
if (mq.matches) {
  function showLess(size, className) {
    var showChar = size;
    var ellipsestext = "...";
    $(className).each(function() {
      var content = $(this).html();
      if (content.length > showChar) {
        var c = content.substr(0, showChar);
        var html =
          '<div class="readmore-text" style="display:block">' +
          c +
          '<span class="moreellipses">' +
          "</span></div>";
        $(this).html(html);
      }
    });
  }

  showLess(414, ".latext");
  showLess(414, ".corporate-top .less-about .head-left p");
}

$(window).on('load', () => {
  $('body').removeClass('preload');
});

const mainSlideThumb = new Swiper(".mm", {
  slidesPerView: 3,
  spaceBetween: 20,
  watchSlidesVisibility: true,
  watchSlidesProgress: true
});

const mainSlide = new Swiper(".main-slide", {
  effect: "fade",
  autoplay: {
    delay: 5000
  },
  thumbs: {
    swiper: mainSlideThumb
  }
});

const allbrands = new Swiper(".allbrands .swiper-container", {
  slidesPerView: 7,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: ".allbrands-next",
    prevEl: ".allbrands-prev",
  },
  disableOnInteraction: true,
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
    1280: {
      slidesPerView: 7,
    },
  },
});

// AOS.init();

$('[data-fancybox="gallery"]').fancybox();

$('[data-fancybox="iframe"]').fancybox({
    iframe : {
        css : {
            width : '600px',
            height:'900px'
        }
    }
});
$('.tab-nav ul li').click(function() {
  const tabId = $(this).attr('data-number');
  $('.tab-nav ul li').removeClass('tab-active');
  $('.tab-content').removeClass('tab-active');

  $(this).addClass('tab-active');
  $(`#${tabId}`).addClass('tab-active');
});

$(document).scroll(function() {
  if ($(this).scrollTop() > 30) {
    $('.header').addClass('header-after');
  } else {
    $('.header').removeClass('header-after');
  }
});

$('.export-detail-box-content .input button').click(function(e) {
  var target = $(this).data('target');
  $(target).fadeIn();

  e.preventDefault();
});

$('.modal-close').click(function() {
  $(this).parent().parent().fadeOut();
});

$(document).click(function(e) {
  var target = e.target;
  if (!$(target).is('.modal-content, .modal-content *, .export-detail-box-content .input button')) {
    $(".see-dealer").fadeOut();
    $(".being-dealer").fadeOut();
  }
});

$(document).keyup(function(e) {
  if (e.keyCode === 27) {
    $(".see-dealer").fadeOut();
    $(".being-dealer").fadeOut();
  }
});

$('.mobile-nav-icon').click(function() {
  $('.mobile-nav').fadeIn();
  $('.mobile-nav-content').css('right', '0')
});

$('.mobile-nav-head button').click(function() {
  $('.mobile-nav-content').css('right', '-999px')
  $('.mobile-nav').fadeOut();
});


$('.mobile-nav-nav-link-button button').click(function() {
  var display = $(this).closest('li').children('.mobile-nav-drop').is(':visible') ? 1 : 0;

  if (display) {
    $(this).css('transform', 'rotate(0deg)')
    $(this).closest('li').children(".mobile-nav-drop").slideUp();
  } else {
    $(this).closest('li').children(".mobile-nav-drop").slideDown();
    $(this).css('transform', 'rotate(180deg)')
  }
})


// Companies for home
jQuery(function () {
  var $els = $('div[class^=companies-area]'),
      i = 0,
      len = $els.length;

  $els.slice(1).hide();
  setInterval(function () {
      $els.eq(i).fadeOut(function () {
          i = (i + 1) % len
          $els.eq(i).fadeIn();
      })
  }, 6000)
})

var mq = matchMedia("(min-width: 768px)");

if (mq.matches) {
  sal();
} else {
  $("[data-sal|=slide]").css({
    "transform": "translateY(0)",
    "opacity": "1"
  });
}

var lastScrollTop = 0;
var header = document.querySelector('.header');

window.addEventListener('scroll', function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    header.style.top = "-108px";
  } else {
    header.style.top = "0";
  }
  lastScrollTop = scrollTop;
})