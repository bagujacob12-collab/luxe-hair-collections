//let cart = [];
let cart = JSON.parse(localStorage.getItem("luxeCart")) || [];

function saveCart() {
    localStorage.setItem("luxeCart", JSON.stringify(cart));
}


function addToCart(item){
    const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.length === item.length);
    if (existingItem) {
    existingItem.quantity += 1;
    }
    else{cart.push(item)}
    renderCart();
    bumpCartCount();
}

function removeOneFromCart(id, length) {
    const item = cart.find(cartItem => cartItem.id === id && cartItem.length === length);
    if (!item) return;

    item.quantity -= 1;
    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem !== item);
    }

    renderCart();
        
}

function bumpCartCount() {
    const cartCount = document.querySelector(".cart-count");
    if (!cartCount) return;
    cartCount.classList.add("bump");
    setTimeout(() => cartCount.classList.remove("bump"), 300);
}


//DRAW THE CART ITEMS

function renderCart() {
    saveCart();
    updateCartSummary()
    const cartItems = document.querySelector("#cart-items");

    cartItems.innerHTML = "";
    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("cart-empty");
        emptyMessage.textContent = "Your cart is empty"
        cartItems.append(emptyMessage);
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement("div"); 
        cartItem.classList.add("cart-item");

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const info = document.createElement("div");
        info.classList.add("cart-item-info");

        const name = document.createElement("h4");
        name.textContent = item.name;

        const details = document.createElement("p");
        details.textContent = `Size: ${item.length}`;

        const price = document.createElement("p");
        price.classList.add("cart-item-price");
        price.textContent = formatPrice(item.price * item.quantity);

        const minusButton = document.createElement("button");
        minusButton.classList.add("qty-btn");
        minusButton.textContent = "-";

        const plusButton = document.createElement("button");
        plusButton.classList.add("qty-btn");
        plusButton.textContent = "+";

        const quantityDisplay = document.createElement("span");
        quantityDisplay.textContent = item.quantity;

        const quantityControls = document.createElement("div");
        quantityControls.classList.add("quantity-controls");

        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(plusButton);
        
    
        plusButton.addEventListener("click", () => {
            item.quantity += 1;
            renderCart();
        });

        minusButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
                renderCart();
            }
        });

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-item");
        removeButton.innerHTML = `
        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-trash preview-icon\">
            <path d=\"M10 11v6"/><path d=\"M14 11v6"/>
            <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
            <path d=\"M3 6h18"/><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg> Remove`;

        removeButton.addEventListener("click", () => {
            cart = cart.filter(cartItem => !(cartItem.id === item.id && cartItem.length === item.length));
            renderCart();
        });

        const cartItemAction = document.createElement("div");
        cartItemAction.classList.add("cart-item-action");

        cartItemAction.append(removeButton, quantityControls);

        const cartItemMain = document.createElement("div");
        cartItemMain.classList.add("cart-item-main");

        cartItemMain.append(image, info);


        cartItem.appendChild(cartItemMain);
        //cartItem.appendChild(info); 
        info.appendChild(name);
        info.appendChild(details);
        info.appendChild(price);
        cartItem.appendChild(cartItemAction);
        cartItems.appendChild(cartItem);
    })
}

const cartDrawer = document.querySelector("#cart-drawer");
const cartOverlay = document.querySelector(".cart-overlay");
const closeCartButton = document.querySelector(".close-cart");
const cartButton = document.querySelector("#cart-button");

function openCart() {
    renderCart()
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
}

function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open")
}

cartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

function updateCartSummary() {
    const cartCount = document.querySelector(".cart-count");
    const cartSubtotal = document.querySelector("#cart-subtotal");
    const itemsCount = document.querySelector(".cart-items-count");
    const checkButton = document.querySelector("#checkout-btn");

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = totalQuantity;
    cartSubtotal.textContent = formatPrice(subtotal);
    itemsCount.textContent = totalQuantity;
    checkButton.disabled = totalQuantity === 0;

}























renderCart();