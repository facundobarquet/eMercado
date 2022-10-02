function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"}

function showProductInfo(productInfo){
    let htmlContentToAppend = "";
    htmlContentToAppend=`
    <div class="mx-4 p-4">
    <h3>${productInfo.name}</h3>
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
          <div class="carousel-item active"> 
            <img src="${productInfo.images[0]}" class="d-block w-100" alt="">
          </div>
          <div class="carousel-item">
            <img src="${productInfo.images[1]}" class="d-block w-100" alt="">
          </div>
          <div class="carousel-item">
            <img src="${productInfo.images[2]}" class="d-block w-100" alt="">
          </div>
          <div class="carousel-item">
            <img src="${productInfo.images[3]}" class="d-block w-100" alt="">
          </div>
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
    // <div class="d-flex justify-content-between mt-4">
    // <img src="${productInfo.images[0]}" alt="" class="w-25 mx-2">
    // <img src="${productInfo.images[1]}" alt="" class="w-25 mx-2">
    // <img src="${productInfo.images[2]}" alt="" class="w-25 mx-2">
    // <img src="${productInfo.images[3]}" alt="" class="w-25 mx-2">
    // </div>

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


function showProductComments(productComments){
    let htmlContentToAppend = "";
    let htmlStars="";
    document.getElementById("prod-comments").innerHTML=htmlContentToAppend; 
    for (n in productComments){
        htmlContentToAppend=`
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1 w-100">
                            <div class="d-flex w-100 justify-content-between">
                                <p><strong>${productComments[n].user}</strong> <span class="text-muted">${productComments[n].dateTime}</span></p>
                            <div id="stars${n}">                       
                            </div>
                            </div>
                            <p>${productComments[n].description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("prod-comments").innerHTML+=htmlContentToAppend;   
        
        let starId="stars"+n;
        for (let i = 0; i < productComments[n].score; i++){
            htmlStars=`
            <span class="fa fa-star checked star"></span>
            `
            document.getElementById(starId).innerHTML+=htmlStars;
        }

        for (let i = productComments[n].score; i <5; i++){
            htmlStars=`
            <span class="fa fa-star star"></span>
            `
            document.getElementById(starId).innerHTML+=htmlStars;
        }
    }
}

document.addEventListener("DOMContentLoaded",async function(e){
    let URL=PRODUCT_INFO_URL+myStorage.getItem("prodID")+EXT_TYPE;
    let COMMENT_URL=PRODUCT_INFO_COMMENTS_URL+myStorage.getItem("prodID")+EXT_TYPE;
    const resultObj= await getJSONData(URL);
        if (resultObj.status === "ok")
        {
            //console.log(resultObj);
            const productInfo=resultObj.data;
            console.log(productInfo);
            showProductInfo(productInfo);
        }

     const resultComm= await getJSONData(COMMENT_URL);
        if (resultComm.status === "ok")
        {
            //console.log(resultComm);
            const productComments=resultComm.data;
            //console.log(productComments);
            showProductComments(productComments);
        }

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