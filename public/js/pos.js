let item = document.getElementsByClassName("item");
let orderList = document.getElementById("orderList");
let submitButton = document.getElementById("submitOrder");
let currentOrder = [];

let pushToOrder = (id, name) => {
    currentOrder.push(id);
    let li = document.createElement("li");
    li.addEventListener('click', () => {deleteItem(li)}, false);
    li.appendChild(document.createTextNode(name));
    orderList.appendChild(li);
}

let sendOrder = () => {
    
}

let deleteItem = (listItem) => {
    var nodes = Array.prototype.slice.call(orderList.children);
    let index =  nodes.indexOf(listItem);
    orderList.removeChild(listItem);
    currentOrder.splice(index, 1);
    console.log(currentOrder);
}

if(item) {
    for(let i = 0; i < item.length; i++) {
        let id = item[i].getElementsByClassName("id")[0].innerHTML;
        console.log(id);
        let name = item[i].getElementsByClassName("name")[0].innerHTML;
        console.log(name);
        item[i].addEventListener('click', () => {pushToOrder(id, name)}, false);
    } 
}

submitButton.addEventListener('click', sendOrder, false); 
