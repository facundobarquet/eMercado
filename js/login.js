let fetchedCartArticles=[];

const lgBtn= document.getElementById("lgBtn");
lgBtn.addEventListener("click",function(event){
    event.preventDefault();
    validarInicio();
})

function validarInicio(){
    const profileData={ 
        email:document.getElementById("email").value,
        password:document.getElementById("password").value,
        name:"",
        name2:"",
        surname:"",
        surname2:"",
        contactNumber:"",
        profilePic:"img/img_perfil.png"
    }
    if (!profileData.email || !profileData.password){
        emptyLogin();
    }else{
        myStorage.setItem("logged","true");
        myStorage.setItem("profileData",JSON.stringify(profileData));
        myStorage.setItem("cart",JSON.stringify(fetchedCartArticles))
        window.location.href="index.html"};
}

function emptyLogin(){
    const loginInput=document.getElementsByClassName("form-floating");
    for (let element of loginInput){
        if(element.getElementsByTagName("input")[0].value){
            element.getElementsByTagName("input")[0].classList.remove("is-invalid");
            element.getElementsByTagName("input")[0].classList.add("is-valid");
        }else{
            element.getElementsByTagName("input")[0].classList.add("is-invalid");
            element.getElementsByTagName("input")[0].classList.remove("is-valid");
        }
    }
}

document.addEventListener("DOMContentLoaded",async function(e){
    let URL=CART_INFO_URL+"25801"+EXT_TYPE;
    const resultObj= await getJSONData(URL);
        if (resultObj.status === "ok")
        {
            fetchedCartArticles=resultObj.data.articles;
        }})