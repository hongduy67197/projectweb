$(".login").on("click", function () {
  let username = $("#email").val();
  let password = $("#password").val();
  // console.log(username,password)
  $.ajax({
    url: "/login",
    type: "POST",
    data: { username, password },
  })
    .then(function (data) {
      console.log(data);
      if (data.status == 200 && data.data.role === "admin") {
        setCookie("user", data.data.token, 30);
        window.location.href = "/product/product";
      } else if (data.status === 200) {
        setCookie("user", data.data.token, 30);
        window.location.href = "/";
      } else {
        alert(data.mess);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

let token = getCookie("user");
if (token) {
  $.ajax({
    url: "/checkLogin",
    type: "POST",
  })
    .then((data) => {
      // console.log(42,data)
      if (data.status == 200 && data.data === "user") {
        window.location.href = "/";
      } else if (data.status == 200 && data.data === "admin") {
        window.location.href = "/product/product";
      } else {
        alert("token k hợp lệ");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// logout
//   function logout(){
//       $.ajax({
//         url:'/logout',
//         type:'POST'
//       })
//       .then((data)=>{
//         delete_cookie('user');
//         window.location.href='/';
//       })
//       .catch((err)=>{
//         console.log(err);
//       })
//   }

//   function delete_cookie(name) {
//     document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//}
