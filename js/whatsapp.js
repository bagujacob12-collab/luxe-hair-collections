const WHATSAPP_NUMBER = "2349164220790";

function sendOrderToWhatsApp() {
    if (cart.length === 0) {
        return;
    }

    const itemLines = cart.map((item, index) => {
        return `${index + 1}. ${item.name} (${item.length}") 
        . Quantity: ${item.quantity} 
        . Price: ${formatPrice(item.price * item.quantity)}`;
    }).join("\n\n");

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const message = `NEW ORDER INQUIRY\n\n${itemLines}\n\nTOTAL AMOUNT: ${formatPrice(total)}
    \n\nPlease confirm availability and delivery details.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

    const checkoutButton = document.querySelector("#checkout-btn");
    checkoutButton.addEventListener("click", sendOrderToWhatsApp);
