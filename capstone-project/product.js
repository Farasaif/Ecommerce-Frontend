const productInfoStuff = document.getElementById('productCard');

async function printProductInfo(){
    const currWebsiteUrl = window.location.href;
    console.log('is this teh website?', currWebsiteUrl);
    let productIdTest = currWebsiteUrl.slice(-1);
    console.log('checking id...', productIdTest);

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

    let specificProduct = products.filter(p => p.product_id == productIdTest)[0];

    console.log('what ze product?', specificProduct);

    if(productIdTest == '='){
        productInfoStuff.innerHTML = `
        <div class="product-card">
            product not found
        </div>
        `;
    }

    

    productInfoStuff.innerHTML = `
        <div class="product-card" id=${specificProduct.product_id}>
            <img src="${specificProduct.picture_url}" alt="${specificProduct.description}">
            <h3>${specificProduct.name}</h3>
            <h3>${specificProduct.categoryName}</h3>
            <p class="price">$${specificProduct.starting_at_price}</p>
            
            <select name="varieties" id="varieties">
            </select>
            <button class="add-to-cart-btn" data-id="${specificProduct.product_id}">Add to Cart</button>
        </div>
        `;
    // print all the product information

    let varieties = specificProduct.varieties;
    let selectElement = document.getElementById('varieties');
    console.log('this is the select element', selectElement);
    varieties.forEach(variety => {
        let option = document.createElement('option');
        option.textContent = `${variety.name} - $${variety.price}`;
        option.value = variety.name;
        selectElement.appendChild(option);
    });
}


printProductInfo();