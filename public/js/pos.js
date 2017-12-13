let item = document.getElementsByClassName("item");
let party = document.getElementsByClassName("party");
let orderList = document.getElementById("orderList");
let submitButton = document.getElementById("submitOrder");
let partyIdHTML = document.getElementById("partyId");
let tableNumberInput = document.getElementById("tableNumberInput");
let currentOrder = [];
let partyId = "New";

let pushToOrder = (id, name) => {
    currentOrder.push(id);
    let li = document.createElement("li");
    li.addEventListener('click', () => {deleteItem(li)}, false);
    li.appendChild(document.createTextNode(name));
    orderList.appendChild(li);
}

let sendOrder = () => {
    if(currentOrder.length > 0) {
        let order = {
            partyId: partyId,
            itemIds: currentOrder
        }

        while(orderList.hasChildNodes()) {
            orderList.removeChild(orderList.lastChild);
        }
        currentOrder = [];

        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/pos", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(order));
    }
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
        tableNumberInput.style.visibility = "visible"
    } else {
        partyId = id
        tableNumberInput.style.visibility = "hidden"
    }
    partyTableHTML.innerHTML = partyTblNumber;
    partyServerHTML.innerHTML = partyServer;
}

if(party) {
    for(let i = 0; i < party.length; i++) {
        let id = party[i].id;
        let partyTableNumber = party[i].getElementsByClassName("number")[0].innerHTML;
        let partyServer = party[i].getElementsByClassName("name")[0].innerHTML;
        console.log(partyTableNumber);
        console.log(partyServer);
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
