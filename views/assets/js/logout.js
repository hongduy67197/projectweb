function logout() {
    $.ajax({
      url:'/logout',
      type:'POST'
  }).then(data=>{
      console.log(data)
      if(data.status = 200){
          delete_cookie('user');
          window.location.href='/';
      }
  })
  .catch(err=>{
      console.log(err)
  })  }

  function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

 