export function addQuantity(){

    let cart = JSON.parse(localStorage.getItem("cart"))

    let quantity = 0
    if(cart) {

        cart.forEach((product) => {

        quantity = quantity + Number(product.quantity)

        })
    } else {

    }
    document.getElementById("addToCartNumber").innerText = quantity;
}