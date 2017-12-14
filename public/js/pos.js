let item = document.getElementsByClassName("item");
let party = document.getElementsByClassName("party");
let orderList = document.getElementById("orderList");
let submitButton = document.getElementById("submitOrder");
let partyTableHTML = document.getElementById("partyTableNumber");
let partyServerHTML = document.getElementById("partyServerName");
let tableNumberInput = document.getElementById("tableNumberInput");
let currentOrder = [];
let partyId = "New";
let username = partyServerHTML.innerHTML;

let pushToOrder = (id, name) => {
    currentOrder.push(id);
    let li = document.createElement("li");
    li.addEventListener('click', () => {deleteItem(li)}, false);
    li.appendChild(document.createTextNode(name));
    orderList.appendChild(li);
}

let sendOrder = () => {
    
    if(currentOrder.length > 0) {
        let tableNumber;
        let serverName = partyServerHTML.innerHTML;
        if(partyTableHTML.innerHTML != ""){
            tableNumber = parseInt(partyTableHTML.innerHTML);
        } else {
            tableNumber = parseInt(tableNumberInput.value);
        }

        if(tableNumber && typeof tableNumber == "number") { 
            let order = {
                partyId: partyId,
                tableNumber: tableNumber,
                serverName: serverName,
                itemIds: currentOrder
            }

            console.log(order);

            while(orderList.hasChildNodes()) {
                orderList.removeChild(orderList.lastChild);
            }
            currentOrder = [];

            sendData(order, (res) => {
                console.log(document.documentElement);
                window.location = res.response;
            });

            tableNumberInput.value = "";
        } else {
            console.log("Not a number");
        }
    }
}

let sendData = (order, callback) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            callback(this);
        }
    };
    xhttp.open("POST", "/pos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(order));
}

let deleteItem = (listItem) => {
    var nodes = Array.prototype.slice.call(orderList.children);
    let index =  nodes.indexOf(listItem);
    orderList.removeChild(listItem);
    currentOrder.splice(index, 1);
}


let changePartySelected = (id, partyTblNumber, partyServer) => {
    if(id == partyId) {
        partyId = "New";
        partyTableHTML.innerHTML = "";
        partyServerHTML.innerHTML = username;
        tableNumberInput.setAttribute("class", "d-inline");
    } else {
        partyId = id;
        partyTableHTML.innerHTML = partyTblNumber;
        partyServerHTML.innerHTML = partyServer;
        tableNumberInput.setAttribute("class", "d-none");
    }

}

if(party) {
    for(let i = 0; i < party.length; i++) {
        let id = party[i].id;
        let partyTableNumber = party[i].getElementsByClassName("number")[0].innerHTML;
        let partyServer = party[i].getElementsByClassName("name")[0].innerHTML;
        party[i].addEventListener('click', () => {changePartySelected(id, partyTableNumber, partyServer)}, false);
    }
}

if(item) {
    for(let i = 0; i < item.length; i++) {
        let id = item[i].id;
        let name = item[i].innerHTML;
        item[i].addEventListener('click', () => {pushToOrder(id, name)}, false);
    } 
}

if(submitButton){
    submitButton.addEventListener('click', sendOrder, false); 
}
