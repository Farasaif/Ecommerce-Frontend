// POST Request Handler (submit form data)
document.getElementById('postForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from submitting the default way

    // Get form data
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    const data = {
        name: productName,
        price: productPrice
    };

    // POST request to a server
    fetch('http://yourserver.com/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Send the data as a JSON string
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product added:', data);
        alert('Product added successfully!');
        // Optionally reset the form
        document.getElementById('postForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding product.');
    });
});

// GET Request Handler (fetch product list)
document.getElementById('getProductsBtn').addEventListener('click', function () {
    fetch('http://yourserver.com/products')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';  // Clear any existing list items

        // Loop through the product data and display it
        data.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - $${product.price}`;
            productList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error fetching products.');
    });
});
