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
var iduser = 100;

let token = getCookie("user");
function getUser() {
  return $.ajax({
    url: "/checkLogin",
    type: "POST",
  });
}
async function checkCookie() {
  try {
    let data = await getUser();
    console.log(28, data);
    if (data.status == 200 && data.data === "user") {
      let logout = `
            <li onclick = 'logout()'>
                <a>
                    <i class="mdi mdi-logout"></i>Logout
                </a>
            </li>
            `;
      $(".dropdown-menu-right").html("");
      $(".dropdown-menu-right").append(logout);
      iduser = data.id;
      console.log(iduser);
    } else {
      alert("token k hợp lệ");
    }
  } catch (error) {
    console.log(error);
  }
}

if (token) {
  checkCookie();
}

function logout() {
  $.ajax({
    url: "/logout",
    type: "POST",
  })
    .then((data) => {
      console.log(data);
      if ((data.status = 200)) {
        delete_cookie("user");
        window.location.href = "/";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

let id;
getUser().then((data) => (id = data.id));

async function checkidcart() {
  try {
    console.log(75, id);
    const searchidcart = $.ajax({
      url: `/user/` + id,
      type: "GET",
    });
    return searchidcart;
  } catch (error) {
    console.log(error);
  }
}

$("#carticon").click(async function () {
  try {
    let idcart = await checkidcart();
    window.location.href = `/user/cart?cartId=${idcart}`;
  } catch (error) {
    console.log(error);
  }
});

function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
