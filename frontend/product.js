
const prices = [
    {size: "Small", price: 9.99 },
    {size: "Medium", price: 12.99},
    {size: "Large", price: 15.99},
    {size: "Xtra Large", price: 22.99}
];
let selectElement = document.getElementById('wreathSizes');
console.log('this is the select element', selectElement);
prices.forEach(priceObj => {
    let option = document.createElement('option');
    option.textContent = `${priceObj.size.toUpperCase()} - $${priceObj.price.toFixed(2)}`;
    option.value = priceObj.price;
    selectElement.appendChild(option);
});


window.onload = function() {
    let selectedvalue= document.getElementById("wreathSizes").value ;
document.getElementById("price").innerHTML="$" + selectedvalue;
};

let totalPrice = 0;
function calculateCost(cost) {
    document.getElementById("price").innerHTML="$"+cost;
}

function addToCart() {
    updateTotalPrice();
    alert("item Added to Cart " + totalPrice);
}

function updateTotalPrice(){
    let price = document.getElementById("price").innerHTML;
    console.log('the price is', price);
    let numericPrice = parseFloat(price.substring(1));
    totalPrice = totalPrice + numericPrice; 
    console.log("updated Total Price:" + totalPrice);
}

function getPriceBySize(size) {
    for(let i = 0; i < prices.length; i++){
        if(prices[i].name == size) {
            return prices[i].price;

    }
}
return null;
}
let priceForS = getPriceBySize("Small");
console.log(priceForS);
let priceForM = getPriceBySize("Medium");
console.log(priceForM);
let priceForL = getPriceBySize("Large");
console.log(priceForL);
let  priceForXL = getPriceBySize("Xtra Large");
console.log(priceForXL);



let cartCountElement = document.getElementById('cart-count');
let addToCartButton = document.querySelector('.add-to-cart');
let cartItemCount = 0;
function updateCartCount() {
    cartCountElement.textContent = cartItemCount;
}

