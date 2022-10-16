function subTotal(id){
    const priceTag= document.getElementById("unitCost"+id).innerHTML.split(" ");
    //console.log(priceTag)
    const currency=priceTag[0];
    const cost=priceTag[1];
    const count= document.getElementById("count"+id).value;
    //console.log(count)
    const subTotal= count*cost;
    document.getElementById("subtotal"+id).innerHTML=currency+" "+subTotal;
    
}

function showCartItems(cartInfo){
    let htmlContentToAppend="";
    const cartUser= cartInfo.user;
    const cartItems= cartInfo.articles;
    if (cartItems.length==0){
        document.getElementById("empty-cart-alert").hidden=false;
        document.getElementById("cart-div").hidden=true;
    }
    else{
        for (let item of cartItems){
            htmlContentToAppend+=`
            <tr class="p-2">
                <td class="w-25"><img src="${item.image}" alt="" class="w-50 rounded-end"></td>
                <td>${item.name}</td>
                <td id="unitCost${item.id}">${item.currency} ${item.unitCost}</td>
                <td class="w-25"><div class=" d-flex justify-content-center"><input type="number" class="form-control w-50" value="${item.count}" id="count${item.id}" oninput="subTotal(${item.id})" min="1"></div></td>
                <td class=" fw-bold" id="subtotal${item.id}">${item.currency} ${item.count*item.unitCost}</td>
            </tr>
            `
        }
        document.getElementById("cart-table").innerHTML=htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded",async function(e){
    let URL=CART_INFO_URL+"25801"+EXT_TYPE;
    const resultObj= await getJSONData(URL);
        if (resultObj.status === "ok")
        {
            //console.log(resultObj);
            cartInfo=resultObj.data;
            console.log(cartInfo);
            showCartItems(cartInfo);
        }})