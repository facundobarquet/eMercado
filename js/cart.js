let cartItems = [];

function showCosts() {
    let productsCosts = document.getElementsByClassName("productCost");
    //Subtotal
    let subTotal = 0;
    for (const product of productsCosts) {
        let currency = product.innerHTML.split(" ")[0];
        if (currency == "UYU") {
            subTotal += parseFloat(product.innerHTML.split(" ")[1]) / 40;
        } else {
            subTotal += parseFloat(product.innerHTML.split(" ")[1]);
        }
    }
    document.getElementById("subTotal").innerHTML = "USD " + subTotal.toFixed(2)
    //Costo de envio
    let shipping = document.getElementsByName("shipping-radio")
    let shippingCost = 0;
    for (const element of shipping) {
        if (element.checked) {
            shippingCost = (element.value) * subTotal
        }
    }
    document.getElementById("costoDeEnvio").innerHTML = "USD " + shippingCost.toFixed(2)
    //Total
    let total = shippingCost + subTotal;
    document.getElementById("total").innerHTML = "USD " + total.toFixed(2)
}


function subTotal(id) {
    const priceTag = document.getElementById("unitCost" + id).innerHTML.split(" ");
    const currency = priceTag[0];
    const cost = priceTag[1];
    const count = document.getElementById("count" + id).value;
    const subTotal = count * cost;
    document.getElementById("subtotal" + id).innerHTML = currency + " " + subTotal;
    //Mostrar costos cuando se cambia la cantidad
    showCosts();
}


function deleteBtn(id) {
    let currentCart = cartItems;
    let index = currentCart.findIndex(product => product.id == id);
    currentCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(currentCart));
    cartItems = currentCart;
    showCartItems(cartItems);
}

function showDeleteBtn(id) {
    let deleteBtn = document.getElementById("delete" + id);
    deleteBtn.hidden = false;
}

function hideDeleteBtn(id) {
    let deleteBtn = document.getElementById("delete" + id);
    deleteBtn.hidden = true;
}

function showCartItems(cartItems) {
    ;
    let htmlContentToAppend = "";
    if (cartItems.length == 0) {
        document.getElementById("empty-cart-alert").hidden = false;
        document.getElementById("cart-div").hidden = true;
    }
    else {
        for (let item of cartItems) {
            htmlContentToAppend += `
            <tr class="p-5" onmouseenter="showDeleteBtn(${item.id})" onmouseleave="hideDeleteBtn(${item.id})">
                <td class="col-3"><img src="${item.image}" alt="" class="w-50 rounded-end"></td>
                <td class="col-3">${item.name}</td>
                <td class="col-2" id="unitCost${item.id}">${item.currency} ${item.unitCost}</td>
                <td class="col-1"><div class="d-flex justify-content-center"><input type="number" class="form-control toValidateCartList" style="width:77px" value="${item.count}" id="count${item.id}" oninput="subTotal(${item.id})" min="1"></div></td>
                <td class="col-2 fw-bold productCost" id="subtotal${item.id}">${item.currency} ${item.count * item.unitCost}</td>
                <td class="text-danger mx-auto col-1" style="width:40px" role="button" onclick="deleteBtn(${item.id})"><i class="fas fa-trash" id="delete${item.id}" hidden></i></td>
            </tr>
            `
        }
        document.getElementById("cart-table").innerHTML = htmlContentToAppend;
        //Mostrar costos cuando carga la página y cuando se borra un elemento
        showCosts();
    }
}

function changePayMethod(method) {
    document.getElementById("payMethodButton").classList.remove("is-invalid");
    document.getElementById("payModalFeedbackText").hidden = true;
    let inputs = document.getElementsByClassName("modalInput");
    for (const element of inputs) {
        element.disabled = true;
        element.required = false;
        element.classList.remove("is-invalid");
        element.classList.remove("is-valid");
        element.classList.remove("toValidatePayMethod");
        element.value = "";
    }
    let thisMethodInputs = document.getElementsByClassName(method);
    for (const element of thisMethodInputs) {
        element.disabled = false;
        element.required = true;
        element.classList.add("toValidatePayMethod");
    }
    document.getElementById("payMethodText").innerHTML = document.getElementById(method + "Label").innerHTML;
}


function validateCartList() {
    let inputsToValidate = document.getElementsByClassName("toValidateCartList");
    let validInputs = 0;
    for (const element of inputsToValidate) {
        if (!element.checkValidity()) {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
        } else {
            element.classList.remove("is-invalid");
            validInputs += 1;
        }
    }
    if (validInputs < inputsToValidate.length) {
        document.getElementById("cartListInvalidFeedback").hidden = false;
        window.location.href = "#cartListTitle";
        return ("")
    } else {
        document.getElementById("cartListInvalidFeedback").hidden = true;
        return ("ok")
    }
}

function validateAdress() {
    let inputsToValidate = document.getElementsByClassName("toValidateAdress");
    let validInputs = 0;
    for (const element of inputsToValidate) {
        if (!element.checkValidity()) {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
        } else {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
            validInputs += 1;
        }
    }
    if (validInputs < inputsToValidate.length) {
        window.location.href = "#shippingAdressTitle";
        return ("")
    } else {
        return ("ok")
    }
}

function validatePayMethod() {
    let inputsToValidate = document.getElementsByClassName("toValidatePayMethod");
    validInputs = 0;
    for (const element of inputsToValidate) {
        if (!element.checkValidity()) {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
        } else {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
            validInputs += 1;
        }
    }
    if (validInputs == inputsToValidate.length) {
        document.getElementById("payMethodButton").classList.remove("link-danger");
    } else {
        document.getElementById("payMethodButton").classList.add("link-danger");
    }
    if (document.getElementById("payMethodText").innerHTML == "No se ha seleccionado") {
        document.getElementById("payMethodButton").classList.add("is-invalid", "link-danger");
        document.getElementById("payModalFeedbackText").hidden = false;
    }
    if ((validInputs == inputsToValidate.length) && document.getElementById("payMethodText").innerHTML != "No se ha seleccionado") {
        return ("ok")
    } else {
        window.location.href = "#payMethodText";
        return ("")
    }
}


function validateOnInput() {
    let cartListInputs = document.getElementsByClassName("toValidateCartList");
    for (const element of cartListInputs) {
        element.setAttribute("onchange", "validateCartList()")
    }
    let adressInputs = document.getElementsByClassName("toValidateAdress");
    for (const element of adressInputs) {
        element.setAttribute("oninput", "validateAdress()")
    }
    let payMethodInputs = document.getElementsByClassName("toValidatePayMethod");
    for (const element of payMethodInputs) {
        element.setAttribute("oninput", "validatePayMethod()")
    }
}


document.getElementById("buyButton").addEventListener("click", function (e) {
    e.preventDefault();
    let payMethod = validatePayMethod();
    let adress = validateAdress();
    let cartList = validateCartList();
    if (cartList == "ok" && adress == "ok" && payMethod == "ok") {
        document.getElementById("successAlert").hidden = false;
    } else {
        validateOnInput();
    }
})

document.addEventListener("DOMContentLoaded", async function (e) {
    cartItems = JSON.parse(localStorage.getItem("cart"));
    showCartItems(cartItems);
}
)