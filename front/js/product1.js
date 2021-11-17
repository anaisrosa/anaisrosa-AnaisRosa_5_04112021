// // Recup json
// // http://localhost:3000/api/products
let singleProductData = [];

// Recupération de l'ID dans url
let currentPage = window.location.href;
let url = new URL(currentPage);
let urlIdProduct = url.searchParams.get("id");
// console.log(idParam);

// // fonction permetant de demander à l'API quelles sont les caratéristiques du produit
const fetchSingleProduct = async () => {
  await fetch("http://localhost:3000/api/products/" + urlIdProduct)
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

const addProductToCart = () => {
  addToCartBtn.addEventListener("click", (e) => {
    // alert("hello")
    if (amountOfItems.value >= 1 && amountOfItems.value < 100) {
      //Recupération des couleurs et quantités selectionnés
      colorPicked = colorPicked.value;
      // console.log(colorPicked);
      amountOfItems = amountOfItems.value;

      //création d'un objet par item mis dans le panier:
      let product = {
        itemId: singleProductData._id,
        itemPicture: singleProductData.imageUrl,
        itemAltText: singleProductData.altTxt,
        itemName: singleProductData.name,
        itemPrice: singleProductData.price,
        itemDescription: singleProductData.description,
        itemColor: colorPicked,
        itemAmount: Number(amountOfItems),
      };
      //console.log(product);

      // // LOCAL STORAGE

      //transforme les objets du Localstorage en objets JSON
      let itemsInCart = JSON.parse(localStorage.getItem("item"));
      console.log(itemsInCart);

      // Verifier le panier
      //si il y a dejà des des produits dans le panier
      if (itemsInCart) {
        let searchId = itemsInCart.find((element) => {
          element.itemId == urlIdProduct;

          if (element.itemId == urlIdProduct) {
            console.log("ajout d'un produit identique");
            itemsInCart.push(product);
            localStorage.setItem("item", JSON.stringify(itemsInCart));
          } else {
            // itemsInCart = [];
            itemsInCart.push(product);
            localStorage.setItem("item", JSON.stringify(itemsInCart));
            console.log("ajout new variante");
          }
          // faire le push apres pour pouvoir choisir entre MAJ / Ajouter un produit
        });

        // let searchColor = itemsInCart.find((element) => {
        //   element.itemColor == colorList;

        //   if (element.itemColor == colorList) {
        //     console.log("ajout d'un produit avec colouleur identique");
        //     itemsInCart.push(product);
        //     localStorage.setItem("item", JSON.stringify(itemsInCart));
        //   } else {
        //     // itemsInCart = [];
        //     itemsInCart.push(product);
        //     localStorage.setItem("item", JSON.stringify(itemsInCart));
        //     console.log("ajout new variante");
        //   }
        //   // faire le push apres pour pouvoir choisir entre MAJ / Ajouter un produit
        // });

      } else {
        itemsInCart = [];
        itemsInCart.push(product);
        localStorage.setItem("item", JSON.stringify(itemsInCart));
        console.log("ajout new produit");
      }

    }
  });
};

addProductToCart();
