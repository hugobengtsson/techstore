import { addQuantity } from './common.js'

let imgSrc = "/assets/"

let initSite = () => {
    addQuantity()
    loadCart()
}

function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart"))
    let cartContainer = document.getElementsByClassName("data-cart-container")[0]



    if(cart){

        cart.forEach((product) => {

            // Bör tas bort vid version 2.0..
            let container = document.createElement('div')
            container.classList.add('product-container')

            let productItems = document.createElement('div')
            productItems.classList.add('product-item')

            let productTitle = document.createElement('h1')
            productTitle.innerText = product.product.title

            let productDescription = document.createElement('h2')
            productDescription.innerText = product.product.description

            let productImage = document.createElement('img')
            productImage.src = imgSrc + product.product.image

            let productPrice = document.createElement('p')
            productPrice.innerText = product.product.price + ' kr'

            let productQuantity = document.createElement('p')
            productQuantity.innerText = product.quantity + ' st'

            let productButtonContainer = document.createElement('div')
            productButtonContainer.classList.add('product-button-container')

            productItems.append(productTitle, productDescription, productImage, productPrice, productQuantity, productButtonContainer)
            container.append(productItems)
            cartContainer.append(container)

        })
    }else{
        console.log("varukorgen är tom")
    }

}




window.addEventListener("load", initSite)