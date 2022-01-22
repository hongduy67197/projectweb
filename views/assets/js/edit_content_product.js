$('.edit-product').click( function () {
    document.querySelector(".popup").style.display = "flex";
    let idProduct = $(this).attr(`idproduct`); 
    let idCatagoriesed = $(this).attr(`idCatagories`); 
    let productNamed = $(this).attr(`productName`); 
    let productCoded = $(this).attr(`productCode`); 
    let priced = $(this).attr(`price`); 
    let qualityed = $(this).attr(`quality`);
    let colored = $(this).attr(`color`); 
    let sized = $(this).attr(`size`); 

    $('#idCatagories-edit').val(idCatagoriesed)
    $('#productName-edit').val(productNamed)
    $('#productCode-edit').val(productCoded)
    $('#price-edit').val(priced)
    $('#quality-edit').val(qualityed)
    $('#color-edit').val(colored)
    $('#size-edit').val(sized)
    $(".submit").click( async function(){
        let idCatagories = document.getElementById("idCatagories-edit").value();
        let productName = document.getElementById("productName-edit").value();
        let productCode = document.getElementById("productCode-edit").value();
        let price = document.getElementById("price-edit").value();
        let quality = document.getElementById("quality-edit").value();
        let color = document.getElementById("color-edit").value();
        let size = document.getElementById("size-edit").value();
        try {
            let changeProinfo = await $.ajax({
                url:`/product/fix_product/${idProduct}`, 
                type:"PUT", 
                data:{
                    idCatagories: idCatagories,
                    productName: productName, 
                    productCode: productCode, 
                    price: price, 
                    quality: quality, 
                    color: color, 
                    size: size,
                }
            });
            window.location.reload();
        } catch (error) {
            console.log(error);            
        }

    })
});
$(".close-editproduct").click(function () {
    document.querySelector(".popup").style.display = "none";
});

