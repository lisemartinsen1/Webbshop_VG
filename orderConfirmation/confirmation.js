

$(document).ready(function () {
    addProducts();
    setEmail();
    getTotalPrice();
    setShippingAddressElement();
});

function addProducts() {
    const productDisplay = $('#productDisplay');

    let idList = localStorage.getItem('idList');
    idOccurrences = JSON.parse(idList);

    for (let key in idOccurrences) {
    
        let amount = idOccurrences[key];

        fetch(`https://fakestoreapi.com/products/${key}`)
            .then(response => response.json())
            .then(data => {

                const id = data.id;
                const img = data.image;
                const title = data.title;
                const price = data.price;

                const cardHTML = createProduct(id, img, title, price, amount);
                productDisplay.append(cardHTML);

            })
            .catch(error => console.error("Error fetching product to cart:", error));

    }
}

function createProduct(id, image, title, price, amount) {
    return `
    <div class="row d-flex align-items-center" id="productRow">
    <div class="col-3" id="product${id}">
        <img src="${image}" alt="product image" class="img-fluid order-image-size mb-3">
    </div>
    <div class="col-3">
        <h4>${title}</h4>
    </div>
    <div class="col-3">
        <h5>$${price}</h5>       
    </div>
    <div class="col-3 amount-control d-flex align-items-center">
        <p id="productCount" class="m-0">Antal: ${amount}</p>
    </div>   
    </div>  
`;
}

function getTotalPrice() {
    let totalPrice = localStorage.getItem('totalPrice');
    document.getElementById('totalPrice').textContent = `Totalbelopp: $${totalPrice}`;
}

function setEmail() {
    const email = localStorage.getItem('email');
    const sendTo = document.getElementById('send');
    sendTo.textContent = `En bekräftelse kommer att skickas till: ${email}`;
}

function setShippingAddressElement() {
    let address = localStorage.getItem('address');
    let postalCode = localStorage.getItem('postalCode');
    let city = localStorage.getItem('city');
    document.getElementById('shippingAddress').textContent =`Paketet kommer skickas till ${address}, ${postalCode}, ${city}`;

}

function reset() {
    localStorage.removeItem('idList');
    localStorage.removeItem('priceInfoList');
}