$(document).ready(function () {
  $(".details").click(function () {
    let producttdetails = $($(this)).attr("value");
    window.location.href = "/product/product_details?namesp=" + producttdetails;
  });
});

$(".searchprice").click(function () {
  let minprice = $("#minprice").val();
  let maxprice = $("#maxprice").val();
  let idCatagories = $("#idcatagories").html();
  // console.log(minprice);
  // console.log(maxprice);
  // console.log(idCatagories);
  $.ajax({
    url: `/product/filter?catagory=${idCatagories}&min=${minprice}&max=${maxprice}`,
    type: "GET",
  })
    .then((data) => {
      window.location.href = `/product/filter?catagory=${idCatagories}&min=${minprice}&max=${maxprice}`;
    })
    .catch((err) => {
      console.log(err);
    });
});
