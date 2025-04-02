// Global variables
let products = [];
let categories = [];
let cart = [];
let productId= 0;

// DOM Elements
const productList = document.getElementById('product-list');
const cartContainer = document.getElementById('cart-container');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Fetch Products from API
async function fetchProducts() {
    try {
        // Replace with your actual API endpoint
        const response = await fetch('http://3.136.18.203:8000');
        console.log("testing API",response);
        let unit = await response.json();
        console.log("unitABBHDGH", unit);
        
        const productsURL = unit.products; //'http://3.136.18.203:8000/products/'
        const productsResponse = await fetch(productsURL);
        console.log('test response of products', productsResponse);
        products = await productsResponse.json();
        console.log('I just threw in some products...',products);

        const categoriesURL = unit.categories;
        const categoriesResponse = await fetch(categoriesURL);
        console.log('checking response of categories', categoriesResponse);
        categories = await categoriesResponse.json();
        console.log('There will be some categories..',categories);

        products.forEach(product => {
            let categoryDummy = categories.find(category => category.category_id == product.category);
            console.log('im just testing stuff', categoryDummy);
            product.categoryName = categoryDummy.name;
        });

        console.log('all products with category hopefully...', products);

        displayProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
     //  Display Products
        function displayProducts() {
        productList.innerHTML = products.map(product => `
        <div class="product-card" id=${product.product_id}>
            <img src="${product.picture_url}" alt="${product.description}">
            <h3>${product.name}</h3>
            <h3>${product.categoryName}</h3>
            <p class="price">$${product.starting_at_price}</p>
            <button class="add-to-cart-btn" data-id="${product.product_id}">Add to Cart</button>
        </div>
    `).join('');

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}


    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });


// Add to Cart Function
function addToCart(event) {
    const productId = event.target.dataset.id;
    const product = products.find(p => p.id === parseInt(productId));
    
    // Check if product already in cart
    const existingCartItem = cart.find(item => item.id === product.id);
    
    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

// Update Cart
function updateCart() {
    // Update cart items display
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.title} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
    `).join('');

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Add remove item event listeners
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    // Show cart container
    cartContainer.classList.remove('hidden');
}

// Remove from Cart
function removeFromCart(event) {
    const productId = event.target.dataset.id;
    cart = cart.filter(item => item.id !== parseInt(productId));
    updateCart();
}

// Checkout
function checkout() {
    alert(`Checkout Total: $${cartTotal.textContent}`);
    cart = [];
    updateCart();
}



// Event Listeners
checkoutBtn.addEventListener('click', checkout);
document.addEventListener("click", function(event) {
    if (event.target.closest(".product-card")) {
        const url = "product.html?";
        productId = event.target.closest("div").id;
        console.log("productId",productId);
        window.location.href = url + "product_id=" + productId;
    }
});

// Initialize
fetchProducts();