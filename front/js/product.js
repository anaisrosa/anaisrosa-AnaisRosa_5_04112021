// Recup json
// http://localhost:3000/api/products
let productsData = [];

// Recup ID url
let str = window.location.href;
let url = new URL(str);
let idParams = url.searchParams.get("id");console.log(productsData);

// fonction permetant de demander à l'API quels sont les produits
const fetchSingleProduct = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then(console.log(idParams))
    .then((data) => (singleProduct = productsData+idParams)) 
    console.log(singleProduct);
};


//fonction permetant de demander à l'API d'afficher le produit

const singleProductDisplay = async () => {
    await fetchSingleProduct();
    // document.getElementsByClassName("item__img").innerHtml = productsData
    // .map((product) =>
    // `<img src=${product.imageUrl} alt="${product.description}"></img>
    // `
    // )
    console.log(product.description);
}

singleProductDisplay();

