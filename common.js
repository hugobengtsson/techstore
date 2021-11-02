// Function to add quantity to the quantity number in the nav bar
export function addQuantity(){

    // Variable for cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart"))

    // Variable for quantity counter
    let quantity = 0

    // If cart exists in localStorage
    if(cart) {

        // Looping all the cart items
        cart.forEach((product) => {

        // Adding quantity togeather with every run of the loop
        quantity = quantity + Number(product.quantity)

        })
    } 

    // Setting the cart number to quantity
    document.getElementById("addToCartNumber").innerText = quantity;

}

// Checks if the user is logged in, gets updated with initSite on load
export function loggedIn(){

    // Checks if the loggedIn key exists in localStorage
    if(localStorage.getItem("loggedIn")){

        // Variable for loggedIn key from localStorage
        let loggedInKey = JSON.parse(localStorage.getItem("loggedIn"))

        // Checks if loggedin is is true
        if(loggedInKey.loggedIn == true){

            // Renders a log out button
            let loggOutButton = document.createElement("p")
            loggOutButton.classList.add("loggOutButton")
            loggOutButton.innerText = "Logga ut"
            document.getElementsByClassName("loginNavContainer")[0].append(loggOutButton)

            // Changes the account icon to green
            document.getElementsByClassName("loginSymbol")[0].style.color = "green"
        }
    }
}

// Function for opening the log in element
function openLogInDiv(){

    // Checks if loggedIn exists in localStorage
    if(localStorage.getItem("loggedIn")){

        // Variable for loggedIn key from localStorage
        let loggedInKey = JSON.parse(localStorage.getItem("loggedIn"))
        
        // Checks if loggedin is is true
        if(loggedInKey.loggedIn == true){

        }
        else{

            // If the user is not logged in you are able to open the element to log in
            document.getElementsByClassName("loginContainer")[0].style.display = "flex"

        }
    }
    else{
    // If loggedIn does not exist in localStorage you are able to log in
        document.getElementsByClassName("loginContainer")[0].style.display = "flex"

    }
}

// Function to close the log in element
function closeLogInDiv(){

    // If the close button is clicked, display = "none"
    document.getElementsByClassName("loginContainer")[0].style.display = "none"

}

// Function for registering accounts through the log in div
export function registerAccount(event){

    // Prevents the default event from the log in form
    event.preventDefault()

    // Variables for inputed username and password
    let createUsername = document.getElementById("createUsername").value
    let createPassword = document.getElementById("createPassword").value

    // Variable for accounts in local storage
    let accountKey = JSON.parse(localStorage.getItem("accounts"))

    // Variable for create acount
    let createAccount = []

    // Checks if the account key exists in localStorage
    if(accountKey){

        // Setting createAccount to the accounts in the accountKey from localStorage
        createAccount = accountKey

        // Checks if the created username matches with any of the existing
        let foundUsername = accountKey.findIndex(account => account.username == createUsername)

        // Checks if there was a match between the input username and any of the registed usernames
        if(foundUsername >= 0){

            // Creates text for telling the user that the username exists
            let existingUsername = document.createElement("p")
            existingUsername.innerText = "Användarnamnet är upptaget"

            // Resets the box for text and appends existingUsername
            document.getElementsByClassName("usernameExists")[1].innerText = ""
            document.getElementsByClassName("usernameExists")[1].append(existingUsername)

        }
        // If the username is not matched
        else{

            // Adding created username and password to list as an object
            createAccount.push({username: createUsername, password: createPassword})

            // Setting accounts to localStorage
            localStorage.setItem("accounts", JSON.stringify(createAccount))

            // Setting localStorage loggedIn to true
            localStorage.setItem("loggedIn", JSON.stringify({loggedIn: true, username: createUsername}))

            // Reloading the site
            location.reload()

        }
    }
    // If the account key in localStorage does not exist
    else{

        // Adding created username and password to list as an object
        createAccount.push({username: createUsername, password: createPassword})

        // Setting accounts to localStorage
        localStorage.setItem("accounts", JSON.stringify(createAccount))

        // Setting localStorage loggedIn to true
        localStorage.setItem("loggedIn", JSON.stringify({loggedIn: true, username: createUsername}))

        // Reloading the site
        location.reload()
    }
}

// Function for logging in through the log in div and form
function logIn(event){

    // Prevents the default event from the log in form
    event.preventDefault()

    // Variables for inputed username and password
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    // Variable for accounts in local storage
    let accountKey = JSON.parse(localStorage.getItem("accounts"))

    // Checks if the account key exists in localStorage
    if(accountKey){

        // Checks if the created username matches with any of the existing
        let foundUser = accountKey.findIndex(account => account.username == username)

        // Checks if there is a match
        if(foundUser >= 0){

            // If the username is matching we check the password
            if(accountKey[foundUser].password == password){

                // Setting localStorage loggedIn to true
                localStorage.setItem("loggedIn", JSON.stringify({loggedIn: true, username: username}))

                // Reloading the site
                location.reload()

            }
            // If the password do not match
            else{

                // Creates text for telling the user that the username or password is incorrect
                let existingUsername = document.createElement("p")
                existingUsername.innerText = "Fel användarnamn eller lösenord"

                // Resets the box for text and appends existingUsername
                document.getElementsByClassName("usernameExists")[0].innerText = ""
                document.getElementsByClassName("usernameExists")[0].append(existingUsername)                
            }
        }
        // If the username does not match with the ones in localStorage
        else{

            // Creates text for telling the user that the username or password is incorrect
            let existingUsername = document.createElement("p")
            existingUsername.innerText = "Fel användarnamn eller lösenord"

            // Resets the box for text and appends existingUsername
            document.getElementsByClassName("usernameExists")[0].innerText = ""
            document.getElementsByClassName("usernameExists")[0].append(existingUsername) 
        }
    }
    else{

        // Creates text for telling the user that the username or password is incorrect
        let existingUsername = document.createElement("p")
        existingUsername.innerText = "Fel användarnamn eller lösenord"

        // Resets the box for text and appends existingUsername
        document.getElementsByClassName("usernameExists")[0].innerText = ""
        document.getElementsByClassName("usernameExists")[0].append(existingUsername)
    }
}

// Function for logging out
function logOut(){

    // Sets loggedIn to false
    localStorage.setItem("loggedIn", JSON.stringify({loggedIn: false, username: ""}))

    // Reloading the site
    location.reload()

}

// Function for all the eventListeners
export function eventListeners() {

    // Eventlistener for submitting the logIn form
    document.getElementsByClassName("login")[0].addEventListener("submit", function(event){
        
        logIn(event)
    
    })

    // Eventlistener for sumbitting the createAcount form
    document.getElementsByClassName("createAcount")[0].addEventListener("submit", function(event){

        registerAccount(event)

    })

    // If the logout button exists, eventlistener runs the function for logging out
    if(document.getElementsByClassName("loggOutButton")[0]){

        document.getElementsByClassName("loggOutButton")[0].addEventListener("click", function(){
    
            logOut()
    
        })

    }

    // Eventlistener for the account icon to run the function to open the log in div
    document.getElementsByClassName("loginSymbol")[0].addEventListener("click", function(){

        openLogInDiv()

    })

    // Eventlistener for the close icon in the log in div
    document.getElementsByClassName("closeIcon")[0].addEventListener("click", function(){

        closeLogInDiv()

    })

}