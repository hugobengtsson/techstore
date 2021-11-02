// Importing functions from common.js
import { addQuantity } from './common.js'
import { eventListeners } from './common.js'
import { loggedIn } from './common.js'

// Runs all the functions to load the site
let initSite = () => {
    loadCart()
    addQuantity()
    loggedIn()
    eventListeners()
}

// Runs the function for rendering the cart
function loadCart(){

    // Variable for easier access to image src
    let imgSrc = "/assets/"

    // Variable for cart in localStorage
    let cart = JSON.parse(localStorage.getItem("cart"))

    // Variable for the element we will append the looped items to
    let cartContainer = document.getElementsByClassName("product-cart-container")[0]
    cartContainer.innerHTML = ''

    // Variable to append the total price to
    let cartTotalPriceContainer = document.getElementsByClassName("cart-total-price")[0]
    
    // Variable to append the purchase button to
    let cartPurchaseButton = document.getElementsByClassName('cart-purchase-button')[0]
    cartPurchaseButton.innerHTML = ''

    // If cart in localStorage exists
    if(cart){

    // Adding symbol to the purchase button
    let cartPurchaseIcon = document.createElement('i')
    cartPurchaseIcon.classList.add('fas', 'fa-check')

    // Adding test to the purchase button
    let cartPurchaseText = document.createElement('p')
    cartPurchaseText.innerText = 'Slutför ditt köp'
    
    // Eventlistener for a click on the purchase button
    cartPurchaseButton.addEventListener('click', function() {
        cartPurchase();
    })

    // Appending the icon and text to the purchase button
    cartPurchaseButton.append(cartPurchaseIcon, cartPurchaseText)

        // Looping out the products in the cart
        cart.forEach((product) => {

            // Adding a container for the product
            let productItems = document.createElement('div')
            productItems.classList.add('product-cart-item')

            // Rendering title to the product
            let productTitle = document.createElement('h1')
            productTitle.innerText = product.product.title

            // Rendering image to the product
            let productImage = document.createElement('img')
            productImage.src = imgSrc + product.product.image

            // Rendering price to the product
            let productPrice = document.createElement('p')
            productPrice.innerText = product.product.price + ' kr'

            // Rendering a container for the quantity buttons and text
            let quantityContainer = document.createElement('div')
            quantityContainer.classList.add('quantity-contianer')

            // Rendering quantity button and eventListener to listen for click
            let productMinusQuantity = document.createElement('i')
            productMinusQuantity.classList.add('fas', 'fa-minus')
            if(product.quantity == 1){
                productMinusQuantity.style.color = "lightgrey"
            }
            else{
                productMinusQuantity.addEventListener('click', function(){

                    let action = "-"

                    changeQuantity(product, action, productMinusQuantity)

                })
            }

            // Rendering quantity to the product
            let productQuantity = document.createElement('p')
            productQuantity.innerText = product.quantity 

            // Rendering quantity button and eventListener to listen for click
            let productPlusQuantity = document.createElement('i')
            productPlusQuantity.classList.add('fas', 'fa-plus')
            productPlusQuantity.addEventListener('click', function(){

                let action = "+"

                changeQuantity(product, action)

            })

            // Rendering button container for removing product
            let productButtonContainer = document.createElement('div')
            productButtonContainer.classList.add('cart-button-container')

            // Rendering remove icon to the button
            let productButtonIcon = document.createElement('i')
            productButtonIcon.classList.add('far', 'fa-trash-alt')

            // Rendering text to the button
            let productButtonText = document.createElement('p')
            productButtonText.innerText = 'Ta bort'

            // Eventlistener for remove product from cart
            productButtonContainer.addEventListener('click', function() {

                removeCartItem(product)

            })

            // Appending the rendered elements to the parent elements
            productButtonContainer.append(productButtonIcon,productButtonText)
            quantityContainer.append( productMinusQuantity, productQuantity, productPlusQuantity)
            productItems.append( productImage, productTitle, productPrice, quantityContainer, productButtonContainer)
            cartContainer.append(productItems)

            // Function to add total price of the cart
            addTotalPrice()
            
        })

    }
    else{
            // If the cart does not exist

            // Rendering element for empty cart
            let cartIsEmptyContainer = document.createElement('div')
            cartIsEmptyContainer.classList.add('product-cart-container')

            // Rendering text
            let cartIsEmptyText = document.createElement('h1')
            cartIsEmptyText.classList.add("emptyCartText")
            cartIsEmptyText.innerText = 'Varukorgen är tom'

            // Resetting the container for total price
            cartTotalPriceContainer.innerText = ''

            // Resetting the purchase button
            cartPurchaseButton = ''

            // Appending the rendered elements to the parent elements
            cartIsEmptyContainer.append(cartIsEmptyText)
            cartContainer.append(cartIsEmptyContainer)
    }

    // Variable for the container to render previous orders
    let previousOrdersContainer = document.getElementsByClassName("previous-orders-container")[0]
    previousOrdersContainer.innerHTML = ""

    // Variable for checking if a user is logged in
    let loggedInKey = JSON.parse(localStorage.getItem("loggedIn"))


    // Checks if key in localStorage exists
    if(loggedInKey){

        // Checks if the user is logged in
        if(loggedInKey.loggedIn == true){

            // Variable for the username logged in
            let user = loggedInKey.username

            // Variable for all accounts in localStorage
            let accounts = JSON.parse(localStorage.getItem("accounts"))

            // Checking what index the logged in user account is
            let foundIndex = accounts.findIndex(account => account.username == user)

            // Variable for the previous orders for the account logged in
            let previousOrders = accounts[foundIndex].previousOrders

            // Checks if the list for previous orders exists
            if (previousOrders){

                // Displaying the "previousOrders" block if there are any previous orders to display
                document.getElementsByClassName("previousOrders")[0].style.display = "block"

                // Looping out the previous orders
                previousOrders.forEach((orders) =>{

                    // Rendering out container for the products or items in the order
                    let previousOrdersItemConatiner = document.createElement('div')
                    previousOrdersItemConatiner.classList.add('previous-orders-item-conatiner')

                    // Looping out the products or items from localStorage for every order
                    orders.forEach((orderItems)=> {

                        // Rendering a container for the product
                        let previousOrdersItems = document.createElement('div')
                        previousOrdersItems.classList.add('previous-orders-items')

                        // Rendering title
                        let previousOrdersTitle = document.createElement('h1')
                        previousOrdersTitle.innerText = orderItems.product.title

                        // Rendering image
                        let previousOrdersImage = document.createElement('img')
                        previousOrdersImage.src = imgSrc + orderItems.product.image

                        // Rendering price
                        let previousOrdersPrice = document.createElement('p')
                        previousOrdersPrice.innerText = orderItems.product.price + ' kr'

                        // Rendering quantity
                        let previousOrdersProductQuantity = document.createElement('p')
                        previousOrdersProductQuantity.innerText = orderItems.quantity + ' st'

                        // Appending the rendered elements to the parent elements
                        previousOrdersContainer.append(previousOrdersItemConatiner)
                        previousOrdersItemConatiner.append(previousOrdersItems)
                        previousOrdersItems.append(previousOrdersImage, previousOrdersTitle, previousOrdersPrice, previousOrdersProductQuantity)   
                    })
                })
            }
        }
    }
}

// Function for adding total price of the cart
function addTotalPrice(){

    // Variable for cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart"))

    // Variable for price
    let price = 0

    // Looping out all the products in the cart
    cart.forEach((product) => {

    // Adding the price of the product to the price variable
    price = price + (product.product.price * product.quantity)

    })

    // Rendering out the total price
    document.getElementsByClassName("cart-total-price")[0].innerText = 'Total pris:' + price + ' kr'
}

// Function for changing the quantity of the products in the cart
function changeQuantity(product, action, productMinusQuantity){

    // Variable for cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart"))

    // Finds the index on the product we want to change quantity to
    let foundIndex = cart.findIndex(cartItem => cartItem.product.title == product.product.title)

    // If the action from the button is + we add 1 to quantity
    if(action=="+"){
        cart[foundIndex].quantity++
    }
    // If the action is not + it can only be - and then we first check if quantity is 1 if it is we want to leave it at 1, if it is more than one we subtract one
    else{
        if(cart[foundIndex].quantity == 1){
            
        }
        else{
            cart[foundIndex].quantity = cart[foundIndex].quantity - 1
        }
    }

    // Setting cart with the updated quantity to localStorage and running the functions related to changing quantity
    localStorage.setItem("cart", JSON.stringify(cart))
    addTotalPrice()
    addQuantity()
    loadCart()
}

// Function to remove one product / cartItem from cart
function removeCartItem(product) {

    // Variable for cart in localStorage
    let cart = JSON.parse(localStorage.getItem("cart"))

    // Checks what index the cart item has in localStorage
    let foundIndex = cart.findIndex(cartItem => cartItem.product.title == product.product.title)

    // Removes the found index from the list
    cart.splice([foundIndex], 1)

    // If cart has no more items it removes the whole cart or else we set localStorage to cart without the removed item again.
    if(cart.length <= 0){
        localStorage.removeItem("cart")
    }
    else{
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    // Functions to reload the cart and change the quantity
    loadCart()
    addQuantity()
}

// Function for purchase button
function cartPurchase(){

    // Variable for localStorage loggedIn
    let loggedInKey = JSON.parse(localStorage.getItem("loggedIn"))
    
    // Checks if the loggedIn-key exists
    if(loggedInKey){

        // Checks if the user is logged in
        if(loggedInKey.loggedIn == true){

            // Variable for the username of the logged in user
            let user = loggedInKey.username

            // Variable for all the accounts saved to localStorage
            let accounts = JSON.parse(localStorage.getItem("accounts"))

            // Variable for the cart from localStorage
            let cart = JSON.parse(localStorage.getItem("cart"))

            // Checks what index the logged in user has in the account-list
            let foundIndex = accounts.findIndex(account => account.username == user)

            // Variable for the previous orders in localStorage
            let previousOrders = accounts[foundIndex].previousOrders

            // If previousOrders exist
            if(previousOrders){

                // Adding the order that was bought to previousOrders
                previousOrders.push(cart)

                // Adding previous orders to accounts
                accounts[foundIndex].previousOrders = previousOrders

                // Setting accounts list to localStorage with the previous order(s)
                localStorage.setItem("accounts", JSON.stringify(accounts))

            }
            // If previous orders do not exist in localStorage
            else{

                // Creating a new list and adding a new list item with the cart items
                accounts[foundIndex].previousOrders = [cart]

                // Setting accounts list to localStorage with the new order
                localStorage.setItem("accounts", JSON.stringify(accounts))

            }

        }

    }

    // Removing cart from localStorage
    localStorage.removeItem("cart")

    // Functions to reload the cart and change the quantity
    addQuantity()
    loadCart()
}

// Eventlistener to run the site when it is loaded
window.addEventListener("load", initSite)