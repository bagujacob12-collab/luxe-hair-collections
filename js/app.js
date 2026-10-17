// ========================================
// MOBILE NAVIGATION
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


// ========================================
// DARK MODE TOGGLE
// ========================================

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeIcon.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
});



// ========================================
// FEATURED PRODUCTS
// ========================================

const featuredProducts = document.querySelector("#featured-products");

products.forEach(function (product) {

    const card = document.createElement("article");
    card.classList.add("product-card");
    card.dataset.productId = product.id;

    card.addEventListener("click", () => {
        openProductDetails(Number(card.dataset.productId));
    });


    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("product-image");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;

    imageWrapper.append(image);

    const heartButton = document.createElement("button");
    heartButton.classList.add("like-btn");
    heartButton.textContent = "♡";
    heartButton.dataset.productId = product.id;
    imageWrapper.append(heartButton);

    heartButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click from bubbling up to the card
        heartButton.classList.toggle("liked");
        heartButton.textContent = heartButton.classList.contains("liked") ? "❤" : "♡";
    });

    const content = document.createElement("div");
    content.classList.add("product-content");

    const category = document.createElement("span");
    category.classList.add("product-category");
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const button = document.createElement("button");
    button.classList.add("product-button");
    button.textContent = "Add to Cart";
    button.dataset.productId = product.id;
    button.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click from bubbling up to the card
        openProductDetails(Number(button.dataset.productId));
    }); 

    const price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent = formatPrice(product.price);
   
    
    content.append(category, name, price, button);

    card.append(imageWrapper, content);

    featuredProducts.append(card);
});



// Now the buttons exist

const productButtons = document.querySelectorAll(".product-button");
const productDetails = document.querySelector("#product-details");
const productDetailsBody = document.querySelector(".product-details-body");
let selectedLength = null;

function openProductDetails(productId){
    selectedLength = null;
    const selectedProduct = products.find(product => product.id === productId);


    productDetailsBody.innerHTML = `
        <div class="product-details-image">
            <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
        </div>

        <div class="product-details-info">        
            <p>${selectedProduct.category}</p>

            <h2>${selectedProduct.name}</h2>

            <p class="price">${formatPrice(selectedProduct.price)}</p>

            <p>${selectedProduct.description}</p>

            <h3>Available Lengths</h3>

            <div class="length-options">
                ${selectedProduct.lengths.map(length => `
                    <button type="button" data-length="${length}">${length}</button>
                `).join("")}
            </div>

            <p>${selectedProduct.inStock ? "In Stock" : "Out of Stock"}</p>
            <button type="button" class="add-to-cart-btn">Add to Cart</button>
        </div>
        `;

        const addToCartButton = productDetailsBody.querySelector(".add-to-cart-btn");
        addToCartButton.addEventListener("click", () => {
            if (selectedLength === null) {
                alert("Please select a length.");
                return;
            }
            // Add to cart logic here
            const item = {
                id : selectedProduct.id, 
                name: selectedProduct.name, 
                image: selectedProduct.image,
                length: selectedLength, 
                price: selectedProduct.price,
                quantity: 1
            };
            addToCart(item);

        });
        

        const lengthButtons = productDetailsBody.querySelectorAll(".length-options button");
        lengthButtons.forEach(lengthButton => {
            lengthButton.addEventListener("click", () => {
            lengthButtons.forEach(btn => btn.classList.remove("active"));
            lengthButton.classList.add("active");
            selectedLength = Number(lengthButton.dataset.length);
            });
        });

        productDetails.classList.add("active");
}



const closeDetails = document.querySelector(".close-details");

closeDetails.addEventListener("click", () => {
    productDetails.classList.remove("active");
});