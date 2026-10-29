
// ========================================
// LUXE HAIR COLLECTIONS
// UTILITY FUNCTIONS
// ========================================


// Format Nigerian currency
function formatPrice(amount) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(amount);
}








let toastTimer;

function showToast(message){
    const toast = document.querySelector("#toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2000);
}






// Which page are we on? "services.html", or "index.html" if the address has no file name
let currentPage = window.location.pathname.split("/").pop() || "index.html";

// The product page belongs under Shop in the menu
if (currentPage === "product.html") {
  currentPage = "shop.html";
}

// Mark the matching menu link (change "nav a" if your menu links sit in a different wrapper)
document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});


// Build the button
const backTop = document.createElement("button");
backTop.classList.add("back-top");
backTop.textContent = "↑";
backTop.setAttribute("aria-label", "Back to top");
document.body.append(backTop);

// Show it only after scrolling down 600px
window.addEventListener("scroll", function () {
  backTop.classList.toggle("show", window.scrollY > 600);
});

// Click: scroll smoothly to the top
backTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});