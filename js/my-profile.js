const profileData=JSON.parse(localStorage.getItem("profileData"));
const nameInput=document.getElementById("profileName");
const name2Input=document.getElementById("profileName2");
const surnameInput=document.getElementById("profileSurname");
const surname2Input=document.getElementById("profileSurname2");
const contactInput=document.getElementById("profileContact");
const emailInput=document.getElementById("profileEmail");
const profilePic=document.getElementById("profilePic")

function validateInputs(){
    const inputsToValidate=document.getElementsByClassName("toValidate")
    let validInputs=0;
    for (const element of inputsToValidate) {
        if (!element.checkValidity()) {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
        } else {
            element.classList.remove("is-invalid");
            validInputs+=1;
        } 
    }
    if (validInputs<inputsToValidate.length){
        return("invalid")
    }else{
        return("ok")
    }
}

function changeProfilePic(){
    const selectedFile = document.getElementById('profileImgInput').files[0];
    if (selectedFile){
    //console.log(selectedFile);
    const reader= new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.addEventListener("loadend",function(){
        profilePic.setAttribute("src",reader.result);
        profileData.profilePic=reader.result;
        //Si no se setea dentro del evento, se ejecuta el comando antes de que termine de cargar la foto
        localStorage.setItem("profileData",JSON.stringify(profileData));
    })}
}

function showAlert(){
    let alertToAppend=`
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          Se han guardado los datos
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
    document.getElementById("successAlert").innerHTML=alertToAppend;
}

document.getElementById("saveChangesBtn").addEventListener("click",function(e){
    e.preventDefault();
    let state=validateInputs();
    if (state=="ok") {     
        profileData.name=nameInput.value;
        profileData.name2=name2Input.value;
        profileData.surname=surnameInput.value;
        profileData.surname2=surname2Input.value;
        profileData.contactNumber=contactInput.value;
        profileData.email=emailInput.value;
        changeProfilePic();
        localStorage.setItem("profileData",JSON.stringify(profileData));
        showAlert();
    }
})

document.addEventListener("DOMContentLoaded",function(){
    nameInput.value=profileData.name;
    name2Input.value=profileData.name2;
    surnameInput.value=profileData.surname;
    surname2Input.value=profileData.surname2;
    contactInput.value=profileData.contactNumber;
    emailInput.value=profileData.email;
    profilePic.setAttribute("src",profileData.profilePic);
})