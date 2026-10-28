/* const shopProducts = document.querySelector("#shop-grid");
if (shopProducts) {
  products.forEach(product => {
    shopProducts.append(createProductCard(product));
  });  
} */

  // ===== SHOP PAGE =====

// Page elements (never replaced, so const)
const shopGrid = document.querySelector("#shop-grid");
const resultCount = document.querySelector("#result-count");
const shopEmpty = document.querySelector("#shop-empty");
const searchInput = document.querySelector("#shop-search");

const priceMin = document.querySelector("#price-min");
const priceMax = document.querySelector("#price-max");
const lengthBoxes = document.querySelectorAll("#length-options input");     // all the length checkboxes
const textureBoxes = document.querySelectorAll("#texture-options input");   // all the texture checkboxes
const inStockBox = document.querySelector("#in-stock-only");
const likedBox = document.querySelector("#liked-only");

const filterPanel = document.querySelector("#filter-panel");
const filterOverlay = document.querySelector("#filter-overlay");
const openFiltersButton = document.querySelector("#open-filters");
const closeFiltersButton = document.querySelector("#close-filters");
const applyFiltersButton = document.querySelector("#apply-filters");
const clearFiltersButton = document.querySelector("#clear-filters");
const emptyClearButton = document.querySelector("#empty-clear");

const loadMoreButton = document.querySelector("#load-more");
const activeFilters = document.querySelector("#active-filters");

const PAGE_SIZE = 8;              // how many products show at a time
let visibleCount = PAGE_SIZE;     // how many are showing right now

// All the choices the visitor has made, in ONE object.
// More fields (category, sort...) get added here later.
const shopState = {
  search: "",
  category: "All",
  sort: "featured",
  minPrice: null,        // null means "no minimum"
  maxPrice: null,
  lengths: [],           // chosen lengths, e.g. [18, 20]
  textures: [],          // chosen textures, e.g. ["Body Wave"]
  inStockOnly: false,
  likedOnly: false
};


// Clears the grid and redraws it from the data

// keepCount is true only when "Load more" calls it
function renderShop(keepCount) {
  // any other change (search, chip, filter) starts again from 8
  if (!keepCount) {
    visibleCount = PAGE_SIZE;
  }

  const list = getVisibleProducts();            // everything that matches
  const shown = list.slice(0, visibleCount);    // only the first 8, 16, 24...

  shopGrid.innerHTML = "";
  shown.forEach(product => {
    shopGrid.append(createProductCard(product));
  });

  resultCount.textContent = `Showing ${shown.length} of ${list.length} products`;
  shopEmpty.hidden = list.length > 0;

  // hide the button when everything is already showing
  loadMoreButton.hidden = shown.length >= list.length;

  renderActiveFilters();
}

loadMoreButton.addEventListener("click", function () {
  visibleCount += PAGE_SIZE;
  renderShop(true);    // true = keep the count, don't reset it
});

// Runs on EVERY letter typed or deleted
searchInput.addEventListener("input", () => {
  shopState.search = searchInput.value.trim();   // trim() removes spaces at the ends
  renderShop();                                   // redraw with the new search
});


function renderActiveFilters() {
  const tags = [];   // list of { label, remove }

  if (shopState.category !== "All") {
    tags.push({
      label: shopState.category,
      remove: function () { setCategory("All"); }
    });
  }

  if (shopState.search !== "") {
    tags.push({
      label: `"${shopState.search}"`,
      remove: function () {
        searchInput.value = "";
        shopState.search = "";
        renderShop();
      }
    });
  }

  if (shopState.minPrice !== null) {
    tags.push({
      label: `From ${formatPrice(shopState.minPrice)}`,
      remove: function () { priceMin.value = ""; onFilterChange(); }
    });
  }

  if (shopState.maxPrice !== null) {
    tags.push({
      label: `Up to ${formatPrice(shopState.maxPrice)}`,
      remove: function () { priceMax.value = ""; onFilterChange(); }
    });
  }

  shopState.lengths.forEach(length => {
    tags.push({
      label: `${length}"`,
      remove: function () {
        // find the box with this value, untick it
        lengthBoxes.forEach(box => {
          if (Number(box.value) === length) box.checked = false;
        });
        onFilterChange();
      }
    });
  });

  shopState.textures.forEach(texture => {
    tags.push({
      label: texture,
      remove: function () {
        textureBoxes.forEach(box => {
          if (box.value === texture) box.checked = false;
        });
        onFilterChange();
      }
    });
  });

  if (shopState.inStockOnly) {
    tags.push({
      label: "In stock",
      remove: function () { inStockBox.checked = false; onFilterChange(); }
    });
  }

  if (shopState.likedOnly) {
    tags.push({
      label: "Liked only",
      remove: function () { likedBox.checked = false; onFilterChange(); }
    });
  }

  // draw them
  activeFilters.innerHTML = "";

  tags.forEach(tag => {
    const chip = document.createElement("button");
    chip.classList.add("filter-tag");
    chip.textContent = `${tag.label} ×`;
    chip.addEventListener("click", tag.remove);   // clicking runs that tag's own remove function
    activeFilters.append(chip);
  });

  // "Clear all" only when there are 2 or more tags
  if (tags.length > 1) {
    const clearAll = document.createElement("button");
    clearAll.classList.add("filter-tag", "filter-tag-clear");
    clearAll.textContent = "Clear all";
    clearAll.addEventListener("click", clearAllFilters);
    activeFilters.append(clearAll);
  }
}


const chips = document.querySelectorAll(".chip");
function setCategory(category) {
  shopState.category = category;                 // remember the choice

  chips.forEach(chip => {
    // toggle with a second value: add "active" only on the chip that matches
    chip.classList.toggle("active", chip.dataset.category === category);
  });

  renderShop();                                  // redraw
}

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    setCategory(chip.dataset.category);
  });
});


// select the dropdown (top of the file, with the other selects)
const sortSelect = document.querySelector("#shop-sort");

function getVisibleProducts() {
  const text = shopState.search.toLowerCase();

  // filter makes a NEW array, so sorting it will not mess up products
  const list = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text) ||
      product.texture.toLowerCase().includes(text);

    const matchesCategory =
      shopState.category === "All" || product.category === shopState.category;

    // Price: skip a side if the box is empty (null)
    const matchesPrice =
      (shopState.minPrice === null || product.price >= shopState.minPrice) &&
      (shopState.maxPrice === null || product.price <= shopState.maxPrice);

    // Length: nothing ticked = no rule. Otherwise the product needs AT LEAST ONE ticked length.
    // some() asks: does any item in this list pass the test?
    const matchesLength =
      shopState.lengths.length === 0 ||
      product.lengths.some(length => shopState.lengths.includes(length));

    // Texture: nothing ticked = no rule, otherwise the texture must be one of the ticked ones
    const matchesTexture =
      shopState.textures.length === 0 || shopState.textures.includes(product.texture);

    // In stock: when ticked, only products with inStock true
    const matchesStock = !shopState.inStockOnly || product.inStock;

    // Liked: when ticked, only products whose id is in likedIds (the array from app.js)
    const matchesLiked = !shopState.likedOnly || likedIds.includes(product.id);

    return matchesSearch && matchesCategory && matchesPrice &&
          matchesLength && matchesTexture && matchesStock && matchesLiked;
  });

  // sort() compares two products at a time (a and b):
  //   negative result = a goes first, positive = b goes first
  if (shopState.sort === "price-low") {
    list.sort((a, b) => a.price - b.price);          // cheapest first
  } else if (shopState.sort === "price-high") {
    list.sort((a, b) => b.price - a.price);          // most expensive first
  } else if (shopState.sort === "newest") {
    list.sort((a, b) => b.id - a.id);                // highest id = newest
  } else if (shopState.sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));   // A to Z
  }
  // "featured" keeps the original order, so no sort at all

  return list;
}

// when the dropdown changes
sortSelect.addEventListener("change", () => {
  shopState.sort = sortSelect.value;     // the value="..." of the chosen option
  renderShop();
});

// Copies what is typed and ticked in the panel into shopState
function readFilters() {
  // Price: empty box = null, otherwise a number
  if (priceMin.value === "") {
    shopState.minPrice = null;
  } else {
    shopState.minPrice = Number(priceMin.value);
  }

  if (priceMax.value === "") {
    shopState.maxPrice = null;
  } else {
    shopState.maxPrice = Number(priceMax.value);
  }

  // Lengths: start with an empty list, then add every ticked box
  shopState.lengths = [];
  lengthBoxes.forEach(box => {
    if (box.checked) {
      shopState.lengths.push(Number(box.value));   // value is text, so convert
    }
  });

  // Textures: same idea, but they stay as text
  shopState.textures = [];
  textureBoxes.forEach(box => {
    if (box.checked) {
      shopState.textures.push(box.value);
    }
  });

  // Single checkboxes: checked is true or false
  shopState.inStockOnly = inStockBox.checked;
  shopState.likedOnly = likedBox.checked;
}

// Runs whenever anything in the panel changes
function onFilterChange() {
  readFilters();
  renderShop();
}

priceMin.addEventListener("input", onFilterChange);
priceMax.addEventListener("input", onFilterChange);
lengthBoxes.forEach(box => box.addEventListener("change", onFilterChange));
textureBoxes.forEach(box => box.addEventListener("change", onFilterChange));
inStockBox.addEventListener("change", onFilterChange);
likedBox.addEventListener("change", onFilterChange);


function clearAllFilters() {
  // reset what the visitor sees
  priceMin.value = "";
  priceMax.value = "";
  searchInput.value = "";
  inStockBox.checked = false;
  likedBox.checked = false;
  lengthBoxes.forEach(box => { box.checked = false; });
  textureBoxes.forEach(box => { box.checked = false; });

  // reset the data
  shopState.search = "";
  readFilters();            // reads the now empty panel into shopState
  setCategory("All");       // resets the chip, and redraws the shop
}

clearFiltersButton.addEventListener("click", clearAllFilters);
emptyClearButton.addEventListener("click", clearAllFilters);

function openFilters() {
  filterPanel.classList.add("open");
  filterOverlay.classList.add("open");
}

function closeFilters() {
  filterPanel.classList.remove("open");
  filterOverlay.classList.remove("open");
}

openFiltersButton.addEventListener("click", openFilters);
closeFiltersButton.addEventListener("click", closeFilters);
filterOverlay.addEventListener("click", closeFilters);
applyFiltersButton.addEventListener("click", closeFilters);   // filters already apply live, so this just closes

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFilters();
  }
});


// Read the part after the ? in the address bar
const params = new URLSearchParams(window.location.search);
const urlCategory = params.get("category");     // "Wigs", or null if there is none

let validCategory = false;

// Only accept a category that really exists as a chip
chips.forEach(chip => {
  if (chip.dataset.category === urlCategory) {
    validCategory = true;
  }
});

if (validCategory) {
  setCategory(urlCategory);     // sets the chip, the state and draws
} else {
  renderShop();                 // normal first draw
}



// Visualizer links look like shop.html?length=18&texture=Body%20Wave
const linkParams = new URLSearchParams(window.location.search);
const linkLength = Number(linkParams.get("length"));   // 0 if missing
const linkTexture = linkParams.get("texture");         // null if missing

if (linkLength || linkTexture) {
  // tick the matching boxes in the filter panel
  lengthBoxes.forEach(box => {
    if (Number(box.value) === linkLength) box.checked = true;
  });
  textureBoxes.forEach(box => {
    if (box.value === linkTexture) box.checked = true;
  });
  onFilterChange();   // read the boxes and redraw the shop (your existing function)
}