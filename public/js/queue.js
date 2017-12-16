let deleteOrderButtons = document.getElementsByClassName('deleteOrder');

function deleteOrder() {
  sendQueueData(this.value, (res) => {
    window.location = res.response;
  });
};

let sendQueueData = (value, callback) => {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      callback(this);
    }
  };
  xhttp.open("POST", "/queue", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send("{\"orderId\": \"" + value + "\"}");
}

for (i = 0; i < deleteOrderButtons.length; i++){
    deleteOrderButtons[i].addEventListener('click', deleteOrder, false);
};
