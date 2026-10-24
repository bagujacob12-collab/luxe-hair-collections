const shopProducts = document.querySelector("#shop-grid");
if (shopProducts) {
  products.forEach(product => {
    shopProducts.append(createProductCard(product));
  });  
}