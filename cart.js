import { addQuantity } from './common.js'
import { eventListeners } from './common.js'
import { loggedIn } from './common.js'


let imgSrc = "/assets/"

let initSite = () => {
    loadCart()
    addQuantity()
    loggedIn()
    eventListeners()
}

function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart"))
    let cartContainer = document.getElementsByClassName("product-cart-container")[0]
    cartContainer.innerHTML = ''

    let cartTotalPriceContainer = document.getElementsByClassName("cart-total-price")[0]
    
    let cartPurchaseButton = document.getElementsByClassName('cart-purchase-button')[0]
    cartPurchaseButton.innerHTML = ''

    if(cart){
        
        

    let cartPurchaseIcon = document.createElement('i')
    cartPurchaseIcon.classList.add('fas', 'fa-check')

    let cartPurchaseText = document.createElement('p')
    cartPurchaseText.innerText = 'Slutför ditt köp'
    

    cartPurchaseButton.addEventListener('click', function() {
        cartPurchase();
    })

    cartPurchaseButton.append(cartPurchaseIcon, cartPurchaseText)

        // ändra product till cartItem för att få bättre logik i variablerna
        cart.forEach((product) => {


            //PRODUCT CART ITEM

            let productItems = document.createElement('div')
            productItems.classList.add('product-cart-item')

            let productTitle = document.createElement('h1')
            productTitle.innerText = product.product.title

            let productImage = document.createElement('img')
            productImage.src = imgSrc + product.product.image

            let productPrice = document.createElement('p')
            productPrice.innerText = product.product.price + ' kr'

            let quantityContainer = document.createElement('div')
            quantityContainer.classList.add('quantity-contianer')

            let productPlusQuantity = document.createElement('i')
            productPlusQuantity.classList.add('fas', 'fa-plus')
            productPlusQuantity.addEventListener('click', function(){

                let action = "+"

                changeQuantity(product, action)

            })

            let productQuantity = document.createElement('p')
            productQuantity.innerText = product.quantity 

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

            let productButtonContainer = document.createElement('div')
            productButtonContainer.classList.add('cart-button-container')

            let productButtonIcon = document.createElement('i')
            productButtonIcon.classList.add('far', 'fa-trash-alt')

            let productButtonText = document.createElement('p')
            productButtonText.innerText = 'Ta bort'

            productButtonContainer.addEventListener('click', function() {

                removeCartItem(product)

            })
            
            productButtonContainer.append(productButtonIcon,productButtonText)
            quantityContainer.append( productMinusQuantity, productQuantity, productPlusQuantity)
            productItems.append( productImage, productTitle, productPrice, quantityContainer, productButtonContainer)
            cartContainer.append(productItems)
            
            addTotalPrice()
            
        })

    }else{
            
            let cartIsEmptyContainer = document.createElement('div')
            cartIsEmptyContainer.classList.add('product-cart-container')

            let cartIsEmptyText = document.createElement('h1')
            cartIsEmptyText.innerText = 'Varukorgen är tom'

            cartTotalPriceContainer.innerText = ''

            cartPurchaseButton = ''
            
            cartIsEmptyContainer.append(cartIsEmptyText)
            cartContainer.append(cartIsEmptyContainer)
    }
    
    
    let previousOrdersContainer = document.getElementsByClassName("previous-orders-container")[0]
    previousOrdersContainer.innerHTML = ""
    let loggedInKey = JSON.parse(localStorage.getItem("loggedIn"))
    // om loggedin = true
    if(loggedInKey){

        if(loggedInKey.loggedIn == true){

            let user = loggedInKey.username

            let accounts = JSON.parse(localStorage.getItem("accounts"))
            console.log(accounts)

            let foundIndex = accounts.findIndex(account => account.username == user)

            let previousOrders = accounts[foundIndex].previousOrders
            
            if (previousOrders){
            previousOrders.forEach((orders) =>{
                 let previousOrdersItemConatiner = document.createElement('div')
                 previousOrdersItemConatiner.classList.add('previous-orders-item-conatiner')  
                orders.forEach((orderItems)=> {
                      
                    let previousOrdersItems = document.createElement('div')
                    previousOrdersItems.classList.add('previous-orders-items')
                
                    let previousOrdersTitle = document.createElement('h1')
                    previousOrdersTitle.innerText = orderItems.product.title
                
                    let previousOrdersImage = document.createElement('img')
                    previousOrdersImage.src = imgSrc + orderItems.product.image
                
                    let previousOrdersPrice = document.createElement('p')
                    previousOrdersPrice.innerText = orderItems.product.price + ' kr'
                
                    let previousOrdersQuantityContainer = document.createElement('div')
                    previousOrdersQuantityContainer.classList.add('previous-orders-quantity-contianer')
                
                    let previousOrdersProductQuantity = document.createElement('p')
                    previousOrdersProductQuantity.innerText = orderItems.quantity + ' st'

                    previousOrdersContainer.append(previousOrdersItemConatiner)
                    previousOrdersItemConatiner.append(previousOrdersItems)
                    previousOrdersItems.append(previousOrdersImage, previousOrdersTitle, previousOrdersPrice, previousOrdersQuantityContainer)
                    previousOrdersQuantityContainer.append(previousOrdersProductQuantity)
                    
               })
            })}
        }   
    }



}

function addTotalPrice(){

    let cart = JSON.parse(localStorage.getItem("cart"))

    let price = 0

    cart.forEach((product) => {

    price = price + (product.product.price * product.quantity)
    
    })
    
    document.getElementsByClassName("cart-total-price")[0].innerText = 'Total pris:' + price + ' kr'
}

function changeQuantity(product, action, productMinusQuantity){

    let cart = JSON.parse(localStorage.getItem("cart"))

    let foundIndex = cart.findIndex(cartItem => cartItem.product.title == product.product.title)

    if(action=="+"){
        cart[foundIndex].quantity++
    }
    else{
        if(cart[foundIndex].quantity == 1){
            
        }
        else{
            cart[foundIndex].quantity = cart[foundIndex].quantity - 1
        }
    }
    console.log(cart)
    localStorage.setItem("cart", JSON.stringify(cart))
    addTotalPrice()
    addQuantity()
    loadCart()
}

function removeCartItem(product) {

    let cart = JSON.parse(localStorage.getItem("cart"))

    let foundIndex = cart.findIndex(cartItem => cartItem.product.title == product.product.title)

    cart.splice([foundIndex], 1)

    if(cart.length <= 0){
        localStorage.removeItem("cart")
    }
    else{
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    loadCart()
    addQuantity()
}

function cartPurchase(){

    let loggedInKey = JSON.parse(localStorage.getItem("loggedIn"))
    // om loggedin = true
    if(loggedInKey){

        if(loggedInKey.loggedIn == true){

            let user = loggedInKey.username

            let accounts = JSON.parse(localStorage.getItem("accounts"))

            let cart = JSON.parse(localStorage.getItem("cart"))

            let foundIndex = accounts.findIndex(account => account.username == user)

            let previousOrders = accounts[foundIndex].previousOrders

            if(previousOrders){

                previousOrders.push(cart)

                accounts[foundIndex].previousOrders = previousOrders

                localStorage.setItem("accounts", JSON.stringify(accounts))

            }else{

                accounts[foundIndex].previousOrders = [cart]

                localStorage.setItem("accounts", JSON.stringify(accounts))

            }

        }

    }


    localStorage.removeItem("cart")
    addQuantity()
    loadCart()
}


window.addEventListener("load", initSite)