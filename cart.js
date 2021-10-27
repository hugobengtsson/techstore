import { addQuantity } from './common.js'


let imgSrc = "/assets/"

let initSite = () => {
    addQuantity()
    loadCart()
}

function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart"))
    let cartContainer = document.getElementsByClassName("product-cart-container")[0]

    /// test for total price in cart
    let cartTotalPriceContainer = document.getElementsByClassName("cart-total-price")[0]
    
    
    if(cart){

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

            let productMinusQuantity = document.createElement('i')
            productMinusQuantity.classList.add('fas', 'fa-minus')

            let productQuantity = document.createElement('p')
            productQuantity.innerText = product.quantity 

            let productPlusQuantity = document.createElement('i')
            productPlusQuantity.classList.add('fas', 'fa-plus')

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
            productItems.append( /* productDescription, */ productImage, productTitle, productPrice, quantityContainer, productButtonContainer)
            cartContainer.append(productItems)
            
            addTotalPrice()
            
        })
    }else{
            console.log("varukorgen är tom")
            let cartIsEmptyContainer = document.createElement('div')
            cartIsEmptyContainer.classList.add('product-cart-container')

            let cartIsEmptyText = document.createElement('h1')
            cartIsEmptyText.innerText = 'Varukorgen är tom'



            cartIsEmptyContainer.append(cartIsEmptyText)
            cartContainer.append(cartIsEmptyContainer)
    }

}
//test används inte
function addTotalPrice(){

    let cart = JSON.parse(localStorage.getItem("cart"))

    let price = 0

    cart.forEach((product) => {

    price = price + (product.product.price * product.quantity)
    })
    
    document.getElementsByClassName("cart-total-price")[0].innerText = 'Total pris:' + price + ' kr'
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


    location.reload()
    //cartContainer.remove()
    // document.getElementsByClassName("product-cart-container").reload()

}


window.addEventListener("load", initSite)