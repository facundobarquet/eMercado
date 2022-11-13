const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

let myStorage = window.localStorage;
// Localstorage con DOM, para el inicio de sesion
let actualPage = window.location.pathname.split("/").slice(-1);
document.addEventListener("DOMContentLoaded", function () {
  if (!myStorage.getItem("logged") && actualPage != "login.html") {
    window.location.href = "login.html";
  }
})

function logOut() {
  myStorage.clear();
}

//Añade mail a la barra de navegacion
document.addEventListener("DOMContentLoaded", function () {
  if(myStorage.getItem("profileData")){
    email = JSON.parse(myStorage.getItem("profileData")).email;
  }
  let navSpace = document.getElementsByClassName("nav-item")[3]
  if (navSpace) {
    navSpace.innerHTML = `
  <div class="dropdown">
  <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    ${email}
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li onclick="logOut()"><a class="dropdown-item" href="login.html">Cerrar sesión</a></li>
  </ul>
</div>
  `}
})