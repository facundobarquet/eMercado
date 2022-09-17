const ORDER_ASC_BY_PRICE = "Price+";
const ORDER_DESC_BY_PRICE = "price-";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}


function showProductsList(){

    document.getElementById("prod-lead").innerHTML="Verás aquí todos los productos de la categoría "+ prodName;
    //console.log(currentProductsArray);
    let htmlContentToAppend = "";
    if (currentProductsArray.length != 0){
        for(let i = 0; i < currentProductsArray.length; i++){
            let product = currentProductsArray[i];

            if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
                ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

                htmlContentToAppend += `
                <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>`+ product.name +` - `+ product.currency +` `+ product.cost +`</h4> 
                            <p> `+ product.description +`</p>
                            </div>
                            <small class="text-muted">` + product.soldCount  + ` vendidos</small> 
                        </div>

                    </div>
                </div>
            </div>
            `
            }

            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        }
    }else{
        document.getElementById("prod-list-container").innerHTML =
        `<p class="lead mt-5 font-weight-bold"> No se han encontrado productos que coincidan con la búsqueda... </p>`
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}

function searchFilter(search){
    //console.log(search);
    let newArray=originalArray.filter(function(element){
        //console.log(element.name.toLowerCase())
        return (element.name.toLowerCase().includes(search.toLowerCase()) || element.description.toLowerCase().includes(search.toLowerCase()))
    })
    //console.log(newArray);
    currentProductsArray=newArray;
}


document.addEventListener("DOMContentLoaded", function(e){
    let URL=PRODUCTS_URL+myStorage.getItem("catID")+EXT_TYPE;
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            originalArray = resultObj.data.products;
            currentProductsArray=originalArray;
            prodName=resultObj.data.catName;
            //console.log(productsArray);
            showProductsList();
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });

    //Buscador
    document.getElementById("searchBar").addEventListener("keyup",function(){
        const search=document.getElementById("searchBar").value;
        searchFilter(search);
        showProductsList();
    })
    
});
