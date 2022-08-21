const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let myStorage=window.localStorage;
// Localstorage con DOM, para el inicio de sesion
document.addEventListener("DOMContentLoaded",function(){
<<<<<<< HEAD
  if (!myStorage.getItem("logged") && (window.location.pathname!="/login.html"|| window.location.href!="https://facundobarquet.github.io/eMercado/login.html")){
=======
  if (!myStorage.getItem("logged") && (window.location.pathname!="/login.html"|| window.location.href!="https://facundobarquet.github.io/eMercado/index.html")){
>>>>>>> 3363a86dadfb9ec68fc288aaedcbaa354b2c50f2
    window.location.href="login.html";
  }
})
