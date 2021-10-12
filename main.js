var listOfProducts;

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
}


function initSite() {
    loadProducts();
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    // Check your console to see that the products are stored in the listOfProducts varible.
    console.log(listOfProducts);
    
    

    var imgSrc = "/assets/"


    let main = document.getElementsByTagName("main")[0];

    listOfProducts.forEach((product) => {


        let productContainer = document.createElement("div")
        productContainer.classList.add("productContainer")

        let title = product.title
        let titleText = document.createElement("h2")
        titleText.classList.add("titleText")
        titleText.innerText = title


        let description =  product.description
        let descriptionText = document.createElement("p")
        descriptionText.classList.add("descriptionText")
        descriptionText.innerText = description


        let image = product.image
        let productImage = document.createElement("img")
        productImage.src= imgSrc + image
        productImage.classList.add("productImgage")


        let price = product.price
        let productPrice = document.createElement("p")
        productPrice.classList.add("productPrice")
        productPrice.innerText = price + " kr"

        let addToCartButton = document.createElement("button")
        addToCartButton.classList.add("addToCartButton")
        addToCartButton.innerHTML = "Lägg till i kundvagnen"



        productContainer.append(titleText, descriptionText, productImage, productPrice, addToCartButton)
        main.append(productContainer)


    });
    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    
    // TODO: Remove the console.log and these comments when you've read them.
}