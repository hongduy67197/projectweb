$('.btn-primary').on('click',async()=>{
    let username = $('#username').val()
    let password = $('#password').val()
    let data = await $.ajax({
        url:'/register',
        data:{username,password},
        type:'POST'
    })
    // console.log(9,data);
})