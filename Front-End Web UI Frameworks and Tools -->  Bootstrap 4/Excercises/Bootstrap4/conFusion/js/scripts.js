$(document).ready(function () {
  /* JQuery for tooltip */
  // $('[data-toggle="tooltip"]').tooltip();

  $("#mycarousel").carousel({ interval: 2000 });
  $("#carouselButton").click(function () {
    if ($("#carouselButton").children("span").hasClass("fa-pause")) {
      $("#mycarousel").carousel("pause");
      $("#carouselButton")
        .children("span")
        .removeClass("fa-pause")
        .addClass("fa-play");
    } else {
      $("#mycarousel").carousel("cycle");
      $("#carouselButton")
        .children("span")
        .removeClass("fa-play")
        .addClass("fa-pause");
    }
  });

  $("#reserveButton").click(function () {
    $("#reserveModal").modal({ show: true });
  });

  $("#loginButton").click(function () {
    $("#loginModal").modal({ show: true });
  });
});
