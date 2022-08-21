const lgBtn= document.getElementById("lgBtn");
lgBtn.addEventListener("click",function(event){
    event.preventDefault();
    validarInicio();
})

function validarInicio(){
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    if (!email || !password){
        emptyLogin();
        myStorage.setItem("logged","true");
    }else{
    window.location.href="index.html"};
}

function emptyLogin(){
    // alert("Rellene los campos");
    const loginInput=document.getElementsByClassName("form-floating");
    for (let element of loginInput){
        if(element.getElementsByTagName("input")[0].value){
            element.getElementsByTagName("input")[0].classList.remove("empty");
            element.getElementsByTagName("p")[0].innerHTML="";
        }else{
            element.getElementsByTagName("input")[0].classList.add("empty");
            element.getElementsByTagName("p")[0].innerHTML="Ingresa tu "+ element.getElementsByTagName("label")[0].innerHTML;
        }
    }
}

loginPage="true";
document.addEventListener("DOMContentLoaded",function(){
  if (!myStorage.getItem("logged") && loginPage!="true"){
    window.location.href="login.html";
  }
})