let loginButton = document.getElementById('loginButton');
let usernameField = document.getElementById('usernameField');
let passwordField = document.getElementById('passwordField');

function loginRequest() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("{\"username\": \"" + usernameField.value + "\", \"password\": \"" + passwordField.value + "\"}");
};

loginButton.addEventListener('click', loginRequest, false);
