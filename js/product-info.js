let thisProductInfo={};

function purchaseButtons(){
  let currentCart= JSON.parse(localStorage.getItem("cart"));
  let buttons='';
  if (!currentCart.find(product => product.id == thisProductInfo.id)){
    buttons=`
    <div class="col-2">
      <button class="btn btn-success">Comprar ahora</button>
    </div>
    <div class="col-3">
      <button class="btn btn-outline-success" onclick="btnAddToCart()">Agregar al carrito</button>
    </div>`
  }else{
    buttons=`
    <div class="col-3">
    <button class="btn btn-outline-success disabled w-100 fw-bold">Producto en el carrito<i class="fas fa-check fa-pull-right p-1"></i></i></button>
    </div>
    <div class="col-2">
      <a class="btn btn-success" href="cart.html">Ver carrito</a>
    </div>`
  }
  return buttons
}

function btnAddToCart(){
  let currentCart= JSON.parse(localStorage.getItem("cart"));
  if (currentCart.find(product => product.id == thisProductInfo.id)){
    //alert("El producto ya está en el carrito")
  }else{
    let infoToAdd={
      count:1,
      currency:thisProductInfo.currency,
      id:thisProductInfo.id,
      image:thisProductInfo.images[0],
      name:thisProductInfo.name,
      unitCost:thisProductInfo.cost}
    currentCart.push(infoToAdd);
    //alert("El producto fue agregado al carrito")
    
  }
    //console.log(infoToAdd);
    localStorage.setItem("cart",JSON.stringify(currentCart));
    showProductInfo(thisProductInfo);
}


function showProductImages(imgArray){
  let images=`
  <div class="carousel-item active"> 
  <img src="${imgArray[0]}" class="d-block w-100" alt="">
  </div>`;
  imgArray.splice(0,1);
  console.log(imgArray)
  for (let image of imgArray){
    images+=`
    <div class="carousel-item"> 
    <img src="${image}" class="d-block w-100" alt="">
    </div>`
  }
  return images
}


function showProductInfo(productInfo){
    let htmlContentToAppend = "";
    htmlContentToAppend=`
    <div class="mx-4 p-4">
    <div class="row align-content-center">
      <div class="col-7">
        <h3>${productInfo.name}</h3>
      </div>
      ${purchaseButtons()}
    </div>
    <hr>
    <div class="d-flex flex-lg-row align-items-center justify-content-between w-100">
      <div class=" div-productinfo">
      <div class="p-2" >
        <strong>Precio</strong>
        <p>${productInfo.currency} ${productInfo.cost} </p>
      </div>
      <div class="p-2" >
        <strong>Descripción</strong>
        <p>${productInfo.description}</p>
      </div>
      <div class="p-2" >
        <strong>Categoría</strong>
        <p>${productInfo.category}</p>
      </div>
      <div class="p-2" >
        <strong>Cantidad de vendidos</strong>
        <p>${productInfo.soldCount}</p>
      </div>
    </div>

    <div class="p-2 px-3 w-50" >
      <div id="carouselImgs" class="carousel slide align-middle" data-bs-ride="carousel">
        <div class="carousel-inner">
        ${showProductImages(productInfo.images)}
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselImgs" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselImgs" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      </div>
    `
    document.getElementById("prod-info-container").innerHTML=htmlContentToAppend;

    let htmlContentToAppend2="";
    for (let product of productInfo.relatedProducts){
      htmlContentToAppend2+=`
      <div class="card mb-4 shadow-sm custom-card cursor-active w-25 mx-lg-3 mt-3" onclick="setProdID(${product.id})">
      <img class="bd-placeholder-img card-img-top" src="${product.image}" alt="">
        <h5 class="m-3 text-center">${product.name}</h5>
        </div>
      </div>
      `
    }
    document.getElementById("rel-products").innerHTML=htmlContentToAppend2;
}

function stars(score){
  let estrella = ``
  for (let i=0; i<5; i++){
      if(i<score){
          estrella += `<i class="fa fa-star checked"></i>`
      } else {
          estrella += `<i class="fa fa-star star"></i>`
      }
  } return estrella;
}

function showProductComments(productComments){
    let htmlContentToAppend = "";
    document.getElementById("prod-comments").innerHTML=htmlContentToAppend; 
    for (let comment of productComments){
        htmlContentToAppend=`
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1 w-100">
                            <div class="d-flex w-100 justify-content-between">
                                <p><strong>${comment.user}</strong> <span class="text-muted">${comment.dateTime}</span></p>
                            <div>
                            ${stars(comment.score)}                       
                            </div>
                            </div>
                            <p>${comment.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("prod-comments").innerHTML+=htmlContentToAppend;
}}


document.addEventListener("DOMContentLoaded",async function(e){
    let URL=PRODUCT_INFO_URL+myStorage.getItem("prodID")+EXT_TYPE;
    let COMMENT_URL=PRODUCT_INFO_COMMENTS_URL+myStorage.getItem("prodID")+EXT_TYPE;
    const resultObj= await getJSONData(URL);
        if (resultObj.status === "ok")
        {
            //console.log(resultObj);
            thisProductInfo=resultObj.data;
            showProductInfo(thisProductInfo);
        }

     const resultComm= await getJSONData(COMMENT_URL);
        if (resultComm.status === "ok")
        {
            //console.log(resultComm);
            const productComments=resultComm.data;
            //console.log(productComments);
            showProductComments(productComments);
        }

        //Agregar comentarios
        document.getElementById("submitComm").addEventListener("click", function(e){
            e.preventDefault();
            let date= new Date();
            date=date.toISOString();
            dateArr=date.split("T");
            date=dateArr[0]+" "+dateArr[1].split(".")[0];
            //console.log(date);
            const text=document.getElementById("comment").value;
            const score=document.getElementById("starScore").value;
            const user= myStorage.getItem("email").split("@")[0];
            //console.log(score)
            let newComment= {dateTime:date, description:text, product:resultObj.data.id, score:score, user:user};
            //console.log(newComment);
            resultComm.data.push(newComment);
            //console.log(resultComm.data)
            showProductComments(resultComm.data);
        })
      })