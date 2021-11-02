// Importing functions from common.js
import { addQuantity } from './common.js'
import { eventListeners } from './common.js'
import { loggedIn } from './common.js'



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

// Runs all the functions to load the site
let initSite = () => {
    loadProducts()
    addQuantity()
    loggedIn()
    eventListeners()
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {

    // Variable for easier access to image src
    let imgSrc = "/assets/"

    // Container for rendering products
    let productContainer = document.getElementsByClassName("data-product-container")[0];


    // Looping out products from the JSON-file
    listOfProducts.forEach((product) => {


        // Creating Conatiner
        let container = document.createElement('div')
        container.classList.add('product-container')
        productContainer.append(container)

        // Creating product-items inside the container
        let productItems = document.createElement('div')
        productItems.classList.add('product-item')
        container.append(productItems)

        // Creating H1 inside productItems that is the title in the product
        let productTitle = document.createElement('h1')
        productTitle.innerText = product.title
        productItems.append(productTitle)
        
        // Creating description inside productItems that is the description in the product
        let productDescription = document.createElement('h2')
        productDescription.innerText = product.description
        productItems.append(productDescription)

        // Creating img inside productItems that is the imgSrc + image (name of the image) in the product
        let productImage = document.createElement('img')
        productImage.src = imgSrc + product.image
        productItems.append(productImage)

        // Creating p inside productItems that is the price in the product
        let productPrice = document.createElement('p')
        productPrice.innerText = product.price + ' kr'
        productItems.append(productPrice)

        // Creating button inside productItems that is the button for the product
        let productButtonContainer = document.createElement('div')
        productButtonContainer.classList.add('product-button-container')
        
        // Creating cart-icon
        let productButtonIcon = document.createElement('i')
        productButtonIcon.classList.add('fas','fa-cart-arrow-down')
        
        // Creating button-text
        let productButtonText = document.createElement('p')
        productButtonText.classList.add('product-button-text')
        productButtonText.innerHTML = "Lägg till i kundvagnen"

        // EventListener for onClick to the add to cart button, also runs addQuantity to update the quantity next to the cart icon in the navbar 
        productButtonContainer.addEventListener('click', function() {
            addToCart(product)
            addQuantity()
        })
        
        productButtonContainer.append(productButtonIcon,productButtonText)
        productItems.append(productButtonContainer)
        

    });

}



// Function to add products to the cart
function addToCart(product){

    let cartKey = localStorage.getItem("cart")
    let cart = []

    // Checks if the key for cart exists in localStorage
    if(cartKey) {
        // If the key exists it is parsed from localStorage and added to the cart variable
        cart = JSON.parse(cartKey)
    }

    // Checks if the product added to the cart already exists in cart
    let foundIndex = cart.findIndex(cartItem => cartItem.product.title == product.title)

    // Checks if the product was found in the findIndex above
    if(foundIndex >= 0) {
        // If the product was found we add quantity to the product
        Number(cart[foundIndex].quantity++)
    } else {
        // If the product did not already exist in cart, we add the product to cart and add quantity
        cart.push({product: product, quantity: 1})
    }

    // Setting cart in localStorage. 
    localStorage.setItem("cart", JSON.stringify(cart))

}

// Eventlistener to run the site when it is loaded
window.addEventListener("load", initSite)