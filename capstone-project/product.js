const productInfoStuff = document.getElementById('productCard');

async function printProductInfo(){
    const currWebsiteUrl = window.location.href;
    console.log('is this teh website?', currWebsiteUrl);
    let productIdTest = currWebsiteUrl.slice(-1);
    console.log('did i get the id??', productIdTest);

    //http://3.136.18.203:8000/products/2/

    const response = await fetch('http://3.136.18.203:8000');
    console.log("testing API",response);
    let unit = await response.json();
    console.log("unitABBHDGH", unit);

    const productsURL = unit.products; //'http://3.136.18.203:8000/products/'
    const productsResponse = await fetch(productsURL);
    console.log('test response of products', productsResponse);
    products = await productsResponse.json();
    console.log('I just threw in some products...',products);

    let specificProduct = products.filter(p => p.product_id == productIdTest)[0];

    console.log('what ze product?', specificProduct);


    productInfoStuff.innerHTML = `
        <div class="product-card" id=${specificProduct.product_id}>
            <img src="${specificProduct.picture_url}" alt="${specificProduct.description}">
            <h3>${specificProduct.name}</h3>
            <h3>${specificProduct.categoryName}</h3>
            <p class="price">$${specificProduct.starting_at_price}</p>
            <button class="add-to-cart-btn" data-id="${specificProduct.product_id}">Add to Cart</button>
        </div>
        `;
    // print all the product information
}


printProductInfo();