// 1. Read the id from the link: product.html?id=7
const params = new URLSearchParams(window.location.search);   // the part after the ?
const productId = Number(params.get("id"));                   // "7" (text) becomes 7 (number)

// 2. Find the matching product (undefined if none matches)
const product = products.find(item => item.id === productId);

// 3. Grab the elements
const pdMissing = document.querySelector("#pd-missing");
const pd = document.querySelector("#pd");
const pdImage = document.querySelector("#pd-image");
const pdBadge = document.querySelector("#pd-badge");
const pdName = document.querySelector("#pd-name");
const pdPrice = document.querySelector("#pd-price");
const pdStock = document.querySelector("#pd-stock");
const pdMeta = document.querySelector("#pd-meta");
const pdDesc = document.querySelector("#pd-desc");
const pdCrumb = document.querySelector("#pd-crumb");
const pdLengths = document.querySelector("#pd-lengths");
const pdQty = document.querySelector("#pd-qty");
const pdTotal = document.querySelector("#pd-total");
const pdAdd = document.querySelector("#pd-add");
const pdWhatsapp = document.querySelector("#pd-whatsapp");
const pdRelated = document.querySelector("#pd-related");

// 4. Only run if this page really has the product section (so other pages never break)
if (pd) {

  if (!product) {
    // no product found: show the "not found" message and stop
    pdMissing.hidden = false;
  } else {
    pd.hidden = false;

    // 5. The choices the visitor makes live here (render-from-state again)
    const pdState = {
      length: product.lengths[0],   // first length is chosen by default
      quantity: 1
    };

    // 6. Fill the fixed parts once
    document.title = `${product.name} | Luxe Hair Collections`;   // browser tab title
    pdImage.src = product.image;
    pdImage.alt = product.name;
    pdName.textContent = product.name;
    pdCrumb.textContent = product.name;
    pdPrice.textContent = formatPrice(product.price);
    pdMeta.textContent = `${product.category} · ${product.texture}`;
    pdDesc.textContent = product.description;

    // badge only if the product has one
    if (product.badge) {
      pdBadge.hidden = false;
      pdBadge.textContent = product.badge;
      pdBadge.classList.add("badge-" + product.badge.toLowerCase());
    }

    // stock message, and disable buying when sold out
    if (product.inStock) {
      pdStock.textContent = "In stock";
      pdStock.classList.add("in");
    } else {
      pdStock.textContent = "Sold out";
      pdStock.classList.add("out");
      pdAdd.disabled = true;
    }

    // 7. Parts that change with the choices
    function updateWhatsapp() {
      const message =
        `Hello, I want to order:\n${product.name}\nLength: ${pdState.length}"\nQuantity: ${pdState.quantity}\nTotal: ${formatPrice(product.price * pdState.quantity)}`;
      // encodeURIComponent makes the text safe inside a link
      pdWhatsapp.href = `https://wa.me/2349164220790?text=${encodeURIComponent(message)}`;
    }

    function renderChoices() {
      pdQty.textContent = pdState.quantity;
      pdTotal.textContent = `Total: ${formatPrice(product.price * pdState.quantity)}`;

      // highlight the chosen length pill
      pdLengths.querySelectorAll("button").forEach(pill => {
        pill.classList.toggle("active", Number(pill.dataset.length) === pdState.length);
      });

      updateWhatsapp();
    }

    // 8. One pill per length
    product.lengths.forEach(length => {
      const pill = document.createElement("button");
      pill.classList.add("pd-pill");
      pill.dataset.length = length;
      pill.textContent = `${length}"`;
      pill.addEventListener("click", () => {
        pdState.length = length;
        renderChoices();
      });
      pdLengths.append(pill);
    });

    // 9. Quantity buttons (never below 1)
    document.querySelector("#pd-plus").addEventListener("click", () => {
      pdState.quantity += 1;
      renderChoices();
    });

    document.querySelector("#pd-minus").addEventListener("click", () => {
      if (pdState.quantity > 1) {
        pdState.quantity -= 1;
        renderChoices();
      }
    });

    // 10. Add to cart (use the SAME object shape as your quick add)
    pdAdd.addEventListener("click", () => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        length: pdState.length,
        quantity: pdState.quantity
      });
      showToast("Added to cart");
      bumpCartCount();
    });

    // 11. Related products: same category, not this one, first 4
    products
      .filter(item => item.category === product.category && item.id !== product.id)
      .slice(0, 4)
      .forEach(item => {
        pdRelated.append(createProductCard(item));
      });

    renderChoices();   // first draw
  }
}