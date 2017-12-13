let deleteOrderButtons = document.getElementsByClassName('deleteOrder');

function deleteOrder() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/queue", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("{\"orderId\": \"" + this.value + "\"}");
};

for (i = 0; i < deleteOrderButtons.length; i++){
    deleteOrderButtons[i].addEventListener('click', deleteOrder, false);
};