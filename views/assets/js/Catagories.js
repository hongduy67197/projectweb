$(document).ready(function () {
  $(".classify").click(function () {
    let producttId = $($(this).children()[0]).attr("value");
    window.location.href = "/product/filter?catagory=" + producttId;
    // $.ajax({
    //   url: `/catagory?productId=${producttId}`,
    //   type: "GET",
    // })
    //   .then((data) => {
    //     window.location.href = `/catagory?productId=${producttId}`;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });
});
// let catoriId = localstorage.getItem("id");
// console.log(catoriId);
