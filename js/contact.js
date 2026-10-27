// ----- Part 1: the form -----

const contactForm = document.querySelector("#contact-form");

if (contactForm) {   // only run on the Contact page

  const nameInput = document.querySelector("#c-name");
  const phoneInput = document.querySelector("#c-phone");
  const topicInput = document.querySelector("#c-topic");
  const messageInput = document.querySelector("#c-message");

  // Show an error under one field
  function setError(input, message) {
    const field = input.closest(".field");              // closest() walks UP to the nearest parent with this class
    field.classList.add("invalid");                      // CSS turns the border red
    field.querySelector(".error").textContent = message; // write the message in the empty <span>
  }

  // Remove the error from one field
  function clearError(input) {
    const field = input.closest(".field");
    field.classList.remove("invalid");
    field.querySelector(".error").textContent = "";
  }

  // Check everything. Returns true only if every field is fine.
  function validateForm() {
    let isValid = true;           // we start by assuming it is fine
    let firstBad = null;          // remember the first broken field so we can jump to it

    // clean the text: trim() removes spaces at the start and end
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    // remove spaces and dashes from the phone, so "0801 234-5678" still counts
    const phone = phoneInput.value.replace(/[\s-]/g, "");

    // Name: at least 2 characters
    if (name.length < 2) {
      setError(nameInput, "Please enter your name.");
      isValid = false;
      firstBad = firstBad || nameInput;     // keep the first one only
    } else {
      clearError(nameInput);
    }

    // Phone: a Nigerian number. Pattern explained in the table below.
    const phonePattern = /^(\+234|234|0)[789]\d{9}$/;
    if (!phonePattern.test(phone)) {        // test() returns true if the text matches the pattern
      setError(phoneInput, "Enter a valid number, like 08012345678.");
      isValid = false;
      firstBad = firstBad || phoneInput;
    } else {
      clearError(phoneInput);
    }

    // Message: at least 10 characters
    if (message.length < 10) {
      setError(messageInput, "Please write a little more (at least 10 characters).");
      isValid = false;
      firstBad = firstBad || messageInput;
    } else {
      clearError(messageInput);
    }

    // send the visitor to the first problem
    if (firstBad) {
      firstBad.focus();
    }

    return isValid;
  }

  // When the form is submitted (button click OR pressing Enter)
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();               // stop the browser from reloading the page

    if (!validateForm()) {
      return;                             // something is wrong: stop here
    }

    // Build the WhatsApp message from what they typed
    const text =
      `Hello Luxe Hair Collections,\n` +
      `Name: ${nameInput.value.trim()}\n` +
      `Phone: ${phoneInput.value.trim()}\n` +
      `About: ${topicInput.value}\n\n` +
      `${messageInput.value.trim()}`;

    // encodeURIComponent makes the text safe inside a link
    const link = `https://wa.me/2349164220790?text=${encodeURIComponent(text)}`;

    window.open(link, "_blank");          // open WhatsApp in a new tab
    showToast("Opening WhatsApp");        // your toast from utils.js
    contactForm.reset();                  // empty the form again
  });

  // While typing, remove that field's error straight away
  [nameInput, phoneInput, messageInput].forEach(input => {
    input.addEventListener("input", function () {
      clearError(input);
    });
  });
}

// ----- Part 2: the FAQ (same open and close idea as the services list) -----

const faqs = [
  { q: "How do I order?",
    a: "Add what you like to your cart and check out, or message us on WhatsApp. We confirm the product, price and delivery with you before anything is final." },
  { q: "Is the product I want still available?",
    a: "Stock changes, so we always confirm availability on WhatsApp before you pay." },
  { q: "How do I pay?",
    a: "By bank transfer, or cash on delivery where we have approved it for your order." },
  { q: "How much is delivery?",
    a: "It depends on your location and the delivery arrangement. Message us your area and we give you the price." },
  { q: "Do you deliver outside Abuja?",
    a: "Yes, to other locations across Nigeria, subject to availability. Deliveries are done between 8am and 6pm." },
  { q: "Can you revamp my old wig?",
    a: "Yes. We refresh and restore existing wigs. Send us a photo on WhatsApp and we will advise you." }
];

const faqList = document.querySelector("#faq-list");

if (faqList) {
  faqs.forEach(faq => {
    const item = document.createElement("div");
    item.classList.add("service-item");          // reuse the Services row styling

    const head = document.createElement("button");
    head.classList.add("service-head");
    head.textContent = faq.q;
    head.setAttribute("aria-expanded", "false");

    const body = document.createElement("div");
    body.classList.add("service-body");
    const inner = document.createElement("div");
    inner.classList.add("service-body-inner");
    const answer = document.createElement("p");
    answer.textContent = faq.a;

    inner.append(answer);
    body.append(inner);
    item.append(head, body);

    head.addEventListener("click", function () {
      const isOpen = item.classList.toggle("open");
      head.setAttribute("aria-expanded", isOpen);
    });

    faqList.append(item);
  });
}