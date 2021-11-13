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
    .then((data) => (singleProductData = data));
  //console.log(singleProductData);
};
fetchSingleProduct();

// //fonction permetant de demander à l'API d'afficher LE produit sur la page
const singleProductDisplay = async () => {
  await fetchSingleProduct();

  //image à récupérer
  // console.log(singleProductData.imageUrl);
  // console.log(singleProductData.altTxt);
  document.getElementById("item__img").innerHTML +=
    "<img src =" +
    singleProductData.imageUrl +
    " alt=" +
    singleProductData.altTxt +
    ">";

  //titre à récupérer
  // console.log(singleProductData.name);
  document.getElementById("title").innerHTML += singleProductData.name;

  //prix à récupérer
  // console.log(singleProductData.price);
  document.getElementById("price").innerHTML += singleProductData.price + " ";

  //description à récupérer
  // console.log(singleProductData.description);
  document.getElementById("description").innerHTML +=
    singleProductData.description;

  // Couleurs à récupérer
  // console.log(singleProductData.colors);
  // console.log(singleProductData.colors.length);
  let colorList = singleProductData.colors;

  colorList.forEach((color, i) => {
    document.getElementById("colors").innerHTML +=
      "<option value=" +
      singleProductData.colors[i] +
      ">" +
      singleProductData.colors[i] +
      "</option>";
  });
};

singleProductDisplay();

//Ajout d'un produit dans le panier
let colorPicked = document.getElementById("colors");
let amountOfItems = document.getElementById("quantity");
const addToCartBtn = document.getElementById("addToCart");

const addProductToCart =  () => {
addToCartBtn.addEventListener("click", (e) => {
    // alert("hello")
    if (
      amountOfItems.value > 1 &&
      amountOfItems.value < 100 &&
      amountOfItems.value !== 0
    ) {
      //Recupération des couleurs et quantités selectionnés
      colorPicked = colorPicked.value;
      amountOfItems = amountOfItems.value;

      //création d'un objet par item mis dans le panier:
    let product = { 
    itemId : singleProductData._id,
    itemPicture : singleProductData.imageUrl,
    itemAltText : singleProductData.altTxt,
    itemName : singleProductData.name,
    itemPrice : singleProductData.price,
    itemDescription : singleProductData.description,
    itemColorPicked : colorPicked.value,
    itemAmount : amountOfItems.value
    }
  // console.log(product);

  //activation du LOCAL STORAGE
  
let itemSelected = JSON.parse(localStorage.getItem('item'));
// console.log(itemSelected);

//s'il y a dejà des des produits dans le panier 
if(itemSelected) {
  // itemSelected.push(product);
  // localStorage.setItem("item", JSON.stringify(itemSelected));

  //s'il n'y a pas de produits dans le panier
} else {
  itemSelected = [];
  itemSelected.push(product);
  localStorage.setItem("item", JSON.stringify(itemSelected));
  console.log(itemSelected);
}
    }
  });
};

addProductToCart();
