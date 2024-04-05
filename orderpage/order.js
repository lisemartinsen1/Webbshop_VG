

$(document).ready(function () {
    addProducts();
});

async function addProducts() {
    const productDisplay = $('#productDisplay');
    let idList = localStorage.getItem('idList');
    idOccurrences = JSON.parse(idList);

    let priceInfoList = [];
    let fetchPromises = [];

    for (let key in idOccurrences) {
        let amount = idOccurrences[key];

        let fetchPromise = fetch(`https://fakestoreapi.com/products/${key}`)
            .then(response => response.json())
            .then(data => {

                const id = data.id;
                const img = data.image;
                const title = data.title;
                const price = data.price;

                const cardHTML = createProduct(id, img, title, price, amount);
                productDisplay.append(cardHTML);

                let newItem = {
                    id: id,
                    price: price, 
                    quantity: amount
                }
                priceInfoList.push(newItem);
            })
            .catch(error => console.error("Error fetching product to cart:", error));
        fetchPromises.push(fetchPromise);
    }

    await Promise.all(fetchPromises)
        .then(() => {
            localStorage.setItem('priceInfoList', JSON.stringify(priceInfoList));
            updateTotalPriceElement();
        });
}

function createProduct(id, image, title, price, amount) {
    return `
    <div class="row d-flex align-items-center product-row" id="rowProduct${id}">
    <div class="col-3" id="product${id}">
        <img src="${image}" alt="product image" class="img-fluid order-image-size mb-3">
    </div>
    <div class="col-3">
        <h4>${title}</h4>
    </div>
    <div class="col-3">
        <h5 id="totalPricePerProductType">$${price * amount}</h5>       
    </div>
    <div class="col-3 amount-control d-flex align-items-center">
        <button class="btn decr-incr-btn" onclick="decreaseProductCount(${id}, this, ${price})">
            <img src="../orderpage/minus.png" alt="minus sign">
        </button>
        <p id="productCount" class="m-0">${amount}</p>
        <button class="btn decr-incr-btn" onclick="increaseProductCount(${id}, this, ${price})">
            <img src="../orderpage/plus.png" alt="plus sign">
        </button>
    </div>   
    </div>  
`;
}

//Called on when clicking the minus sign
function decreaseProductCount(id, button, priceForOne) {
    let countElement = button.nextElementSibling;
    let count = parseFloat(countElement.textContent);
    if (count > 1) {
        count--;
        countElement.textContent = count;
    }
    updatePriceElement(id, count, priceForOne);
    decreaseIdFromList(id, button);
    updateTotalPriceElement();
}

//Called on when clicking the plus sign
function increaseProductCount(id, button, priceForOne) {
    let countElement = button.previousElementSibling;
    let count = parseFloat(countElement.textContent);
    count++;
    countElement.textContent = count;

    updatePriceElement(id, count, priceForOne);
    increaseIdInList(id);
    updateTotalPriceElement();
}

//Updates total price element for specific product when its amount is changed.
function updatePriceElement(id, count, priceForOne) {
    let row = document.getElementById(`rowProduct${id}`);
    let priceElement = row.querySelector('#totalPricePerProductType');

    let price = parseFloat(priceForOne);
    price = price * count;
    priceElement.textContent = `$${price}`;

    updatePriceList(id, count);
}

//Updates list that holds information about the price and amount for the products in the shopping cart. 
function updatePriceList(id, count) {
    let priceInfoList = JSON.parse(localStorage.getItem('priceInfoList'));

    for (let i = 0; i < priceInfoList.length; i++) {
        if (priceInfoList[i].id === id) {
            priceInfoList[i].quantity = count;
            break;
        }
    }
    localStorage.setItem('priceInfoList', JSON.stringify(priceInfoList));
}

//Updates idList and removes product-card and updates priceInfoList if necessary (when product is deleted from cart) 
function decreaseIdFromList(id, button) {

    let idList = localStorage.getItem('idList');
    let idOccurrences = {};

    if (idList) {
        idOccurrences = JSON.parse(idList);
    }

    // Reduce value for specific id-key by one
    if (idOccurrences[id] > 1) {
        idOccurrences[id]--;
    } else {
        const confirmation = confirm("Vill du ta bort produkten från varukorgen?");
        
        if (confirmation) {
        // If equal to one, remove product from html and priceInfoList.  
        delete idOccurrences[id];

        //Filter out old product and update priceInfoList
        let priceInfoList = JSON.parse(localStorage.getItem('priceInfoList'));
        priceInfoList = priceInfoList.filter(item => item.id !== id);
        localStorage.setItem('priceInfoList', JSON.stringify(priceInfoList));

        //Remove from HTML
        let productRow = button.closest('.row');
        productRow.remove();
        }
    }
    localStorage.setItem('idList', JSON.stringify(idOccurrences));
}

//Updates idList 
function increaseIdInList(id) {
    let idList = localStorage.getItem('idList');
    let idOccurrences = {};

    if (idList) {
        idOccurrences = JSON.parse(idList);
    }
    idOccurrences[id]++;
    localStorage.setItem('idList', JSON.stringify(idOccurrences));
}

function emptyCart() {
    localStorage.removeItem('idList');
    document.getElementById('productDisplay').innerHTML = '';

    localStorage.removeItem('priceInfoList');
    document.getElementById('totalPrice').textContent = 'Totalpris: $0';
}

function updateTotalPriceElement() {
    let priceInfoList = JSON.parse(localStorage.getItem('priceInfoList'));
    let totalPrice = 0;
    priceInfoList.forEach(data => {
        let quantity = data.quantity;
        let priceForOne = data.price
        let total = quantity * priceForOne;
        totalPrice += total;
    });

    let roundedTotal = totalPrice.toFixed(2);
    document.getElementById('totalPrice').textContent = `Totalpris: $${roundedTotal}`;

    localStorage.setItem('totalPrice', roundedTotal);
}

