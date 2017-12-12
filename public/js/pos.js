let item = document.getElementsByClassName("item");
let orderList = document.getElementById("orderList");
let currentOrder = [];

let pushToOrder = (id, name) => {
    currentOrder.push(id);
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(name));
    orderList.appendChild(li);
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
