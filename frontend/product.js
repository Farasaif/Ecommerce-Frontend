
let x = 30;

function clickedAddToCart() {
    alert("The product was added");
    x += 5;
    console.log("x: ", x);
    console.log("x: " + x);
    console.log(x);
    
}

let cost = 0;
function calculateCost(cost) {
   
   document.getElementById("price").innerHTML="$"+cost;
}

console.log(prices);
