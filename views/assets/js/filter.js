$(document).ready(function () {
  $(".details").click(function () {
    let producttdetails = $($(this)).attr("value");
    window.location.href = "/product/product_details?namesp=" + producttdetails;
  });
});
