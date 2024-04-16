$("#myTab a").on("click", function (e) {
  e.preventDefault();
  $(this).tab("show");
});

$(".sub-carousel1").owlCarousel({
  loop: true,
  margin: 0,
  nav: false,
  dots: true,
  autoplayHoverPause: true,
  autoplay: 5000,
  smartSpeed: 2000,
  // navText: [
  //   '<span class="fas fa-angle-left"></span>',
  //   '<span class="fas fa-angle-right"></span>',
  // ],
  responsive: {
    0: {
      items: 1,
      // nav: true,
      // dots: true,
    },
    575: {
      items: 2,
      // nav: true,
      // dots: true,
    },
    767: {
      items: 3,
      // nav: true,
      // dots: true,
    },
    991: {
      items: 3,
      // nav: true,
      // dots: false,
    },

    1199: {
      items: 4,
      // nav: true,
      // dots: false,
    },
    1399: {
      items: 5,
      // nav: true,
      // dots: false,
    },
  },
});
$(".sub-carousel2").owlCarousel({
  loop: true,
  margin: 0,
  nav: false,
  dots: true,
  autoplayHoverPause: true,
  autoplay: 5000,
  smartSpeed: 2000,
  // navText: [
  //   '<span class="fas fa-angle-left"></span>',
  //   '<span class="fas fa-angle-right"></span>',
  // ],
  responsive: {
    0: {
      items: 1,
    },
    426: {
      items: 1,
    },
    575: {
      items: 2,
    },
    767: {
      items: 2,
    },
    991: {
      items: 3,
    },

    1199: {
      items: 3,
    },
  },
});

$("#self-employed-tab").click(function () {
  $("#myTabContent").css({
    "border-top-right-radius": "initial",
    "border-top-left-radius": "inherit",
  });
});

$("#salaried-tab").click(function () {
  $("#myTabContent").css({
    "border-top-left-radius": "initial",
    "border-top-right-radius": "inherit",
  });
});
