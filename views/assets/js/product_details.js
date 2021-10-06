$(document).ready(async function () {
  // phai click moi r chứ
  //  đang trong onclick ma
});

let id;
getUser().then((data) => (id = data.id));
// $(".productprice").click(async function () {
//   let codesanpham = $(this).siblings().eq(0).children().html();
//   let tensanpham = $(this).siblings().eq(0).children().eq(1).html();
//   let colersanpham = $("#colorselect").val();
//   let sizesanpham = $("#sizeselect").val();
//   await $ajax({
//     url: `/user/productid?namesp=${codesanpham}`,
//     type: "GET",
//     data: {
//       productCode: codesanpham,
//       productName: tensanpham,
//       color: colersanpham,
//       size: sizesanpham,
//     },
//   });

//   await $ajax({
//     url: `/user/carid`,
//     type: "GET",
//     data: {
//       userid: id,
//     },
//   });
// });
let codesanpham = $("#codesanpham").html();
let tensanpham = $("#tensanpham").html();
let colorsanpham = $("#colorselect").val();
let sizesanpham = $("#sizeselect").val();
async function checkidproduct() {
  try {
    const searchidpro = await $.ajax({
      url: `/user/productid?namesp=${codesanpham}&productCode=${codesanpham}&productName=${tensanpham}&color=${colorsanpham}&size=${sizesanpham}`,
      type: "GET",
    });
    return searchidpro;
  } catch (error) {
    console.log(error);
  }
}

async function checkidcart() {
  try {
    console.log(56, id);
    const searchidcart = $.ajax({
      url: `/user/` + id,
      type: "GET",
    });
    return searchidcart;
  } catch (error) {
    console.log(error);
  }
}

$(".productprice").click(async function () {
  try {
    let idcart = await checkidcart();
    let idproduct = await checkidproduct();
    console.log(idcart);
    console.log(idproduct);
  } catch (error) {
    console.log(error);
  }
});
