// http://localhost:3000/api/products
let productsData = [];

//fonction permetant de demander à l'API quels sont les produits
const fetchAllProducts = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (productsData = data));
  console.table(productsData);
};

//fonction permetant de demander à l'API d'afficher les produits
const allProductsDisplay = async () => {
  await fetchAllProducts();

  document.getElementById("items").innerHTML = productsData
  .map((product) =>
      `<a href="./product.html?id=${product._id}">
      <article>
        <img src=${product.imageUrl} alt="${product.description}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
       </article>
       </a>
       `
       )
       .join("");
      };

allProductsDisplay();
