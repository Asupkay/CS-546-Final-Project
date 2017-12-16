let loginButton = document.getElementById('loginButton');
let usernameField = document.getElementById('usernameField');
let passwordField = document.getElementById('passwordField');

function loginRequest() {
    sendLoginData(usernameField.value, passwordField.value, (res) => {
      response = JSON.parse(res.response);

      sendRoleCheckData(response.user.Role, (rolecheckRes) => {
        window.location = rolecheckRes.response;
      })
    });
};

let sendRoleCheckData = (role, callback) => {
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this);
      }
    };

    xhttp.open("POST", "/rolecheck", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("{\"role\": \"" + role + "\"}");
}

let sendLoginData = (username, password, callback) => {
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this);
      }
    };

    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("{\"username\": \"" + username + "\", \"password\": \"" + password + "\"}");
}

if (loginButton){
  loginButton.addEventListener('click', loginRequest, false);
};
