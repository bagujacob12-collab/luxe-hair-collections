
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