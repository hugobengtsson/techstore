import { addQuantity } from './common.js'



let initSite = () => {
    addQuantity()
    
}

function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart"))

    if(cart){

        




    }else{
        console.log("varukorgen är tom")
    }



}




window.addEventListener("load", initSite)