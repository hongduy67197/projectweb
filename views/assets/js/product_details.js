$(document).ready(async function () {
  // phai click moi r chứ
  //  đang trong onclick ma
});

// let iduser;
// getUser().then((data) => (iduser = data.id));
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
async function checkidproduct(
  codesanpham,
  tensanpham,
  sizesanpham,
  colorsanpham
) {
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
async function checkidcarts() {
  try {
    console.log(56, iduser);
    const searchidcart = $.ajax({
      url: `/user/` + iduser,
      type: "GET",
    });
    return searchidcart;
  } catch (error) {
    console.log(error);
  }
}
let pair;
// let pickcolor = document.querySelector(".color-choose");
// pickcolor.addEventListener("change", function () {
//   const colordata = new FormData(this);
//   for (pair of colordata.entries()) {
//     console.log(pair[1]);
//   }
//   return pair;
// });

let pickcolor = document.querySelector(".color-choose");
pickcolor.addEventListener("change", async function () {
  const colordata = new FormData(this);
  for (pair of colordata.entries()) {
    console.log(pair[1]);
  }
  let colorselect = pair[1];
  console.log(79, colorselect);
  console.log(codesanpham);
  let sizeColor = await $.ajax({
    url: `/product/product_details_color?namesp=${codesanpham}`,
    type:"POST", 
    data: {
      color : colorselect,
    }
  });
  $('.size-color-quality').html(sizeColor);
  
});

$(".productprice").click(async function () {
  try {
    // let colorsanpham = $("#colorselect").val();
    let colorsanpham = pair[1];
    let sizesanpham = $("#sizeselect").val();
    let idcarts = await checkidcarts();
    let idproduct = await checkidproduct(
      codesanpham,
      tensanpham,
      sizesanpham,
      colorsanpham
    );
    let soluongmua = $(".soluongmua").val();
    console.log(65, colorsanpham);
    console.log(66, sizesanpham);
    // console.log(iduser);
    console.log(78, idproduct);
    console.log(soluongmua);
    await $.ajax({
      url: `/user/cartupdate?cartId=${idcarts}`,
      type: "PUT",
      data: {
        idproductes: idproduct[0]._id,
        quantity: soluongmua,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
