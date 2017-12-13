let item = document.getElementsByClassName("item");
let party = document.getElementsByClassName("party");
let orderList = document.getElementById("orderList");
let submitButton = document.getElementById("submitOrder");
let partyIdHTML = document.getElementById("partyId");
let currentOrder = [];
let partyID = "new";

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
            partyID: partyID,
            itemIds: currentOrder
        }

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


let changePartySelected = (id) => {
    if(id == partyID) {
        partyID = "new";
    } else {
        partyID = id
    }
    console.log(partyID);
    partyIdHTML.innerHTML = partyID;
}

if(party) {
    for(let i = 0; i < party.length; i++) {
        let id = party[i].getElementsByClassName("id")[0].innerHTML;
        party[i].addEventListener('click', () => {changePartySelected(id)}, false);
    }
}

if(item) {
    for(let i = 0; i < item.length; i++) {
        let id = item[i].getElementsByClassName("id")[0].innerHTML;
        let name = item[i].getElementsByClassName("name")[0].innerHTML;
        item[i].addEventListener('click', () => {pushToOrder(id, name)}, false);
    } 
}

submitButton.addEventListener('click', sendOrder, false); 
