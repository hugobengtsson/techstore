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

// checks if the user is logged in, gets updated with initSite on load
export function loggedIn(){

    
    if(localStorage.getItem("loggedIn")){

        let loggedInKey = JSON.parse(localStorage.getItem("loggedIn"))

        if(loggedInKey.loggedIn == true){
    
            let loggOutButton = document.createElement("p")
            loggOutButton.classList.add("loggOutButton")
            loggOutButton.innerText = "Logga ut"
            document.getElementsByClassName("loginNavContainer")[0].append(loggOutButton)
    
            document.getElementsByClassName("loginSymbol")[0].style.color = "green"
        }



    }

}

function openLogInDiv(){


    if(localStorage.getItem("loggedIn")){

        let loggedInKey = JSON.parse(localStorage.getItem("loggedIn"))
        console.log(loggedInKey.loggedIn)
        if(loggedInKey.loggedIn == true){

        }
        else{

            document.getElementsByClassName("loginContainer")[0].style.display = "flex"

        }
    }
    else{

        document.getElementsByClassName("loginContainer")[0].style.display = "flex"

    }

    /* document.getElementsByClassName("loginContainer")[0].addEventListener("click", function(event){
            
        alert(event.target.className)
        //event.stopPropagation();   // W3C model
        
        if(event.target.className = "loginContainer flexContainer alignItems justifyContent"){
            document.getElementsByClassName("loginContainer")[0].style.display = "none"
        } 

    }) */

}

function closeLogInDiv(){

    document.getElementsByClassName("loginContainer")[0].style.display = "none"

}

// for registering accounts through the log in div
export function registerAccount(event){

    // prevents the site to reload on submitt of the form
    event.preventDefault()

    let createUsername = document.getElementById("createUsername").value
    let createPassword = document.getElementById("createPassword").value

    let accountKey = JSON.parse(localStorage.getItem("accounts"))

    let createAccount = []

    if(accountKey){

        createAccount = accountKey

        let foundUsername = accountKey.findIndex(account => account.username == createUsername)

        if(foundUsername >= 0){

            let existingUsername = document.createElement("p")
            existingUsername.innerText = "Användarnamnet är upptaget"

            document.getElementsByClassName("usernameExists")[0].innerText = ""
            document.getElementsByClassName("usernameExists")[0].append(existingUsername)

        }
        else{

            createAccount.push({username: createUsername, password: createPassword})
            localStorage.setItem("accounts", JSON.stringify(createAccount))
            localStorage.setItem("loggedIn", JSON.stringify({loggedIn: true, username: createUsername}))
            location.reload()

        }
    }
    else{

        createAccount.push({username: createUsername, password: createPassword})
        localStorage.setItem("accounts", JSON.stringify(createAccount))
        localStorage.setItem("loggedIn", JSON.stringify({loggedIn: true, username: createUsername}))
        location.reload()
    }
}

// logs users in through the log in div
function logIn(event){

    // prevents the site to reload on submitt of the form
    event.preventDefault()

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    let accountKey = JSON.parse(localStorage.getItem("accounts"))

    if(accountKey){

        let foundUser = accountKey.findIndex(account => account.username == username)

        if(foundUser >= 0){

            if(accountKey[foundUser].password == password){

                localStorage.setItem("loggedIn", JSON.stringify({loggedIn: true, username: username}))
                location.reload()

            }
            else{

                let existingUsername = document.createElement("p")
                existingUsername.innerText = "Fel användarnamn eller lösenord"
    
                document.getElementsByClassName("usernameExists")[0].innerText = ""
                document.getElementsByClassName("usernameExists")[0].append(existingUsername)                }

            }
    }
    else{
        let existingUsername = document.createElement("p")
        existingUsername.innerText = "Fel användarnamn eller lösenord"

        document.getElementsByClassName("usernameExists")[0].innerText = ""
        document.getElementsByClassName("usernameExists")[0].append(existingUsername)
    }
}

// logs out the user on click from eventlistener
function logOut(){

    localStorage.setItem("loggedIn", JSON.stringify({loggedIn: false, username: ""}))

    location.reload()

}


export function eventListeners() {

    document.getElementsByClassName("login")[0].addEventListener("submit", function(event){
        
        logIn(event)
    
    })

    document.getElementsByClassName("createAcount")[0].addEventListener("submit", function(event){

        registerAccount(event)

    })

    if(document.getElementsByClassName("loggOutButton")[0]){

        document.getElementsByClassName("loggOutButton")[0].addEventListener("click", function(){
    
            logOut()
    
        })

    }

    document.getElementsByClassName("loginSymbol")[0].addEventListener("click", function(){

        openLogInDiv()

    })

    document.getElementsByClassName("closeIcon")[0].addEventListener("click", function(){

        closeLogInDiv()

    })



}