// The number and the list of services (add or edit objects here, nothing else changes)
const serviceWhatsApp = "2349164220790";

const services = [
  { group: "hair", name: "Wigs", shop: "Wigs",
    text: "Ready-to-wear wigs in different styles and lengths, picked to suit different looks and occasions." },
  { group: "hair", name: "Hair Bundles", shop: "Bundles",
    text: "Bundles in different lengths and textures, from straight to curly." },
  { group: "hair", name: "Closures", shop: "Closures",
    text: "Closures that complete your installation and blend with your chosen hairstyle." },
  { group: "hair", name: "Frontals", shop: "Frontals",
    text: "Frontals for anyone who wants a natural hairline and versatile styling." },

  { group: "care", name: "Wig Revamping",
    text: "We refresh and restore your existing wig so it looks new again.",
    ask: "Hello, I would like to revamp my wig." },
  { group: "care", name: "Hair Consultation",
    text: "Tell us your style, length and budget, and we help you choose the right hair.",
    ask: "Hello, I need help choosing the right hair." },
  { group: "care", name: "WhatsApp Ordering",
    text: "Ask about a product, confirm it is available, get the price and place your order, all in one chat.",
    ask: "Hello, I would like to place an order." },
  { group: "care", name: "Delivery",
    text: "Delivery within Abuja and to other locations across Nigeria, from 8am to 6pm. The fee depends on your location.",
    ask: "Hello, I would like to ask about delivery to my location." }
];

// Builds ONE row from ONE service object, and returns it
function createServiceItem(service) {
  const item = document.createElement("div");
  item.classList.add("service-item");

  // the clickable title
  const head = document.createElement("button");
  head.classList.add("service-head");
  head.textContent = service.name;
  head.setAttribute("aria-expanded", "false");   // tells screen readers it is closed

  // the part that opens (the extra wrapper lets the open animation work)
  const body = document.createElement("div");
  body.classList.add("service-body");
  const inner = document.createElement("div");
  inner.classList.add("service-body-inner");

  const text = document.createElement("p");
  text.textContent = service.text;

  const actions = document.createElement("div");
  actions.classList.add("service-actions");

  // product services get a shop link, e.g. shop.html?category=Wigs
  if (service.shop) {
    const shopLink = document.createElement("a");
    shopLink.classList.add("service-link");
    shopLink.href = `shop.html?category=${service.shop}`;
    shopLink.textContent = `Browse ${service.name.toLowerCase()}`;
    actions.append(shopLink);
  }

  // every service gets a WhatsApp link with the message already written
  const message = service.ask || `Hello, I would like to ask about ${service.name}.`;
  const askLink = document.createElement("a");
  askLink.classList.add("service-link", "solid");
  askLink.href = `https://wa.me/${serviceWhatsApp}?text=${encodeURIComponent(message)}`;
  askLink.target = "_blank";
  askLink.rel = "noopener";
  askLink.textContent = "Ask on WhatsApp";
  actions.append(askLink);

  inner.append(text, actions);
  body.append(inner);
  item.append(head, body);

  // click the title: open or close this row
  head.addEventListener("click", function () {
    const isOpen = item.classList.toggle("open");   // toggle returns true if it just added "open"
    head.setAttribute("aria-expanded", isOpen);
  });

  return item;
}


// Put each service into its own list
services.forEach(service => {
  const list = document.querySelector(`#${service.group}-list`);
  if (list) {
    list.append(createServiceItem(service));
  }
});