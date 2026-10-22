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

let likedIds = JSON.parse(localStorage.getItem("luxeLikes")) || [];

function saveLikes() {
    localStorage.setItem("luxeLikes", JSON.stringify(likedIds));
}

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

    if (likedIds.includes(product.id)) {
        heartButton.classList.add("liked");
        heartButton.textContent = "❤";
    }

    heartButton.addEventListener("click", (event) => {
        event.stopPropagation();

        if (likedIds.includes(product.id)) {
            likedIds = likedIds.filter(id => id !== product.id);    
            heartButton.classList.remove("liked");
            heartButton.textContent = "♡";

        } else {
            likedIds.push(product.id);
            heartButton.classList.add("liked");
            heartButton.textContent = "❤";
        }

        saveLikes();
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
        openQuickAdd(Number(button.dataset.productId));
    
    }); 

    const price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent = formatPrice(product.price);
   
    
    content.append(category, name, price, button);

    card.append(imageWrapper, content);

    if (featuredProducts) {
        featuredProducts.append(card);
    }
});


// ===== QUICK ADD SHEET =====

// Page elements: selected once and never replaced, so const
const quickAdd = document.querySelector("#quick-add");
const quickOverlay = document.querySelector("#quick-overlay");
const quickBody = document.querySelector("#quick-add-body");
const quickClose = document.querySelector("#quick-close");

// How many of each length the customer picked: { 18: 2, 22: 1 }. It changes, so let
let quickQuantities = {};

function openQuickAdd(productId) {
  // Find the product that was clicked (const: made fresh on every call)
  const quickProduct = products.find(product => product.id === productId);

  // Start from zero every time the sheet opens
  quickQuantities = {};


  // map() turns each length into one row of HTML; join("") glues the rows into one string
  const rowsHTML = quickProduct.lengths.map(length => `
    <div class="quick-row">
      <div>
        <strong>${length}"</strong>
        <small>${formatPrice(quickProduct.price)}</small>
      </div>
      <div class="qty-controls">
        <button type="button" class="qty-btn" data-length="${length}" data-change="-1">−</button>
        <span class="qty-value" data-length="${length}">0</span>
        <button type="button" class="qty-btn" data-length="${length}" data-change="1">+</button>
      </div>
    </div>
  `).join("");

  // Fill the sheet: product header, the rows, a total line, and two buttons (disabled until something is picked)
  quickBody.innerHTML = `
    <div class="quick-product">
      <img src="${quickProduct.image}" alt="${quickProduct.name}">
      <h3>${quickProduct.name}</h3>
    </div>
    <div class="quick-rows">${rowsHTML}</div>
    <p class="quick-total"><span>Total</span><span class="quick-total-value">${formatPrice(0)}</span></p>
    <div class="quick-actions">
      <button type="button" class="quick-continue" disabled>Continue Shopping</button>
      <button type="button" class="quick-go-cart" disabled>Go to Cart</button>
    </div>
  `;

  // Select the new elements AFTER innerHTML (they did not exist before this line)
  const qtyButtons = quickBody.querySelectorAll(".qty-btn");
  const totalValue = quickBody.querySelector(".quick-total-value");
  const continueButton = quickBody.querySelector(".quick-continue");
  const goCartButton = quickBody.querySelector(".quick-go-cart");

  // A function inside a function: it can use quickProduct and the buttons above
  function refreshTotals() {
    // Object.values gives [2, 1]; reduce adds them up to get the total quantity
    const totalQuantity = Object.values(quickQuantities).reduce((sum, qty) => sum + qty, 0);

    // Show the money total
    totalValue.textContent = formatPrice(quickProduct.price * totalQuantity);

    // Buttons work only when at least one item is picked
    
    goCartButton.disabled = totalQuantity === 0;
  }
  continueButton.disabled = false;  // always enabled

  // − and + buttons: one loop handles all of them
  qtyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const length = button.dataset.length;           // which row (string)
      const change = Number(button.dataset.change);   // -1 or 1
      const before = quickQuantities[length] || 0;            // how many were there before (0 if empty)
      quickQuantities[length] = Math.max(0, before + change);
      const after = quickQuantities[length];             // how many are there now (0 if empty)

      if (after > before) {
        addToCart({
          id: quickProduct.id,
          name: quickProduct.name,
          price: quickProduct.price,
          image: quickProduct.image,
          length: Number(length),   // keys are strings, so convert back to a number
          quantity: 1
        });
        showToast(`Added ${quickProduct.name} (${length}") to cart`);
      } 
      else if (after < before) {
        removeOneFromCart(quickProduct.id, Number(length));
      }
      const rowButtons = quickBody.querySelectorAll(`.qty-btn[data-length="${length}"]`);
      rowButtons.forEach(rowButton => {
        if (after > 0) {
          rowButton.classList.add("active");
        } else {
          rowButton.classList.remove("active")
        }
      })
  

      quickBody.querySelector(`.qty-value[data-length="${length}"]`).textContent = quickQuantities[length];
      refreshTotals();
    })
  });

  // Continue Shopping: then close
  continueButton.addEventListener("click", () => {
    closeQuickAdd();
  });

  // Go to Cart: close, then open the cart drawer
  goCartButton.addEventListener("click", () => {
    /* addQuickSelectionToCart(quickProduct); */
    closeQuickAdd();
    openCart();
  });

  // Finally slide the sheet in
  quickAdd.classList.add("open");
  quickOverlay.classList.add("open");
}

// Sends every picked length to the cart
function addQuickSelectionToCart(product) {
  // Object.entries gives [["18", 2], ["22", 1]]; [length, quantity] unpacks each pair
  Object.entries(quickQuantities).forEach(([length, quantity]) => {
    if (quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        length: Number(length),   // keys are strings, so convert back to a number
        quantity: quantity
      });
    }
  });

  showToast(`${product.name} added to cart`);
}

function closeQuickAdd() {
  quickAdd.classList.remove("open");
  quickOverlay.classList.remove("open");
}

quickClose.addEventListener("click", closeQuickAdd);
quickOverlay.addEventListener("click", closeQuickAdd);

// Escape key closes it too
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeQuickAdd();
  }
});






// PRODUCTS DETAILS

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
                showToast("Please select a length first.");
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
            showToast(`${item.name} (${item.length}") added to cart`);

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



//YEAR SPAN
const yearSpan = document.querySelector("#year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;