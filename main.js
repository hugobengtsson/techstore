import { addQuantity } from './common.js'

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

let initSite = () => {
    loadProducts();
    addQuantity()
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {

    // Check your console to see that the products are stored in the listOfProducts varible.
    let imgSrc = "/assets/"
    let productContainer = document.getElementsByClassName("data-product-container")[0];


    listOfProducts.forEach((product) => {


    //Creating Conatiner
    // Bör tas bort vid version 2.0..
        let container = document.createElement('div')
        container.classList.add('product-container')
        productContainer.append(container)

    //creating product-items inside my container
        let productItems = document.createElement('div')
        productItems.classList.add('product-item')
        container.append(productItems)

    //creating h1 inside productItems that is the title in the product
        let productTitle = document.createElement('h1')
        productTitle.innerText = product.title
        productItems.append(productTitle)
        
    //creating description inside productItems that is the description in the product
        let productDescription = document.createElement('h2')
        productDescription.innerText = product.description
        productItems.append(productDescription)

    //creating img inside productItems that is the imgSrc + image (name of the image) in the product
        let productImage = document.createElement('img')
        productImage.src = imgSrc + product.image
        productItems.append(productImage)

    //creating p inside productItems that is the price in the product
        let productPrice = document.createElement('p')
        productPrice.innerText = product.price + ' kr'
        productItems.append(productPrice)

    //creating Button inside productItems that is the button for the product
        let productButtonContainer = document.createElement('div')
        productButtonContainer.classList.add('product-button-container')
        
        let productButtonIcon = document.createElement('i')
        productButtonIcon.classList.add('fas','fa-cart-arrow-down')
        
        let productButtonText = document.createElement('p')
        productButtonText.classList.add('product-button-text')
        productButtonText.innerHTML = "Lägg till i kundvagnen"

        productButtonContainer.addEventListener('click', function() {
            addToCart(product)
            addQuantity()
        })
        
        
        productItems.append(productButtonContainer)
        productButtonContainer.append(productButtonIcon,productButtonText)
        

    });

    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    
    // TODO: Remove the console.log and these comments when you've read them.
}




function addToCart(product){

    let cartKey = localStorage.getItem("cart")
    let cart = []

    if(cartKey) {
        cart = JSON.parse(cartKey)
    }
    let foundIndex = cart.findIndex(cartItem => cartItem.product.title == product.title)

    if(foundIndex >= 0) {
        Number(cart[foundIndex].quantity++)
    } else {
        cart.push({product: product, quantity: 1})
    }

    localStorage.setItem("cart", JSON.stringify(cart))

}

window.addEventListener("load", initSite)