// // Recup json
// // http://localhost:3000/api/products
let singleProductData = [];

// Recupération de l'ID dans url
let currentPage = window.location.href;
let url = new URL(currentPage);
let urlId = url.searchParams.get("id");
// console.log(idParam);

// // fonction permetant de demander à l'API quelles sont les caratéristiques du produit
const fetchSingleProduct = async () => {
  await fetch("http://localhost:3000/api/products/" + urlId)
    .then((res) => res.json())
    // .then((data)=> console.log(data))
    .then((data) => (singleProductData = data))
        console.log(singleProductData);
};
fetchSingleProduct();

// //fonction permetant de demander à l'API d'afficher LE produit sur la page
const singleProductDisplay = async () => {
await fetchSingleProduct();

//image à récupérer
console.log(singleProductData.imageUrl);
console.log(singleProductData.altTxt);

//<h1 id="title"><!-- Nom du produit --></h1>
console.log(singleProductData.name);

//<p>Prix : <span id="price">
console.log(singleProductData.price);

//<p id="description">
console.log(singleProductData.description);

//<select name="color-select" id="colors">

console.log(singleProductData.colors)
};

singleProductDisplay();
