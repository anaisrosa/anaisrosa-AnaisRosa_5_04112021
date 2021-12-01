// // http://localhost:3000/api/products
let singleProductData = [];
// Recupération de l'ID dans url
let currentPage = window.location.href;
let url = new URL(currentPage);
let urlIdProduct = url.searchParams.get("id");
// console.log(urlIdProduct);
const addToCartBtn = document.getElementById("addToCart");
let amountOfItems = document.getElementById("quantity");
let colorPicked = document.getElementById("colors");

//////////////////// Demande à l'API d'aller chercher le produit///////////////////
const fetchSingleProduct = async () => {
  await fetch("http://localhost:3000/api/products/" + urlIdProduct)
  .then((res) => res.json())
  // .then((data)=> console.log(data))
  .then((data) => (singleProductData = data));
  // console.log(singleProductData);
  // console.log(singleProductData.colors);
};

//////////////////// Affichage du produit sur la page///////////////////////////////
const singleProductDisplay = async () => {
  await fetchSingleProduct();
  
  // // Récupération de l'image produit
  // console.log(singleProductData.imageUrl);
  // console.log(singleProductData.altTxt);
  document.getElementById("item__img").innerHTML +=
  "<img src =" +
  singleProductData.imageUrl +
  " alt=" +
  singleProductData.altTxt +
  ">";
  // // Récupération du nom du produit
  // console.log(singleProductData.name);
  document.getElementById("title").innerHTML += singleProductData.name;
  
// // Récupération du Prix 
// console.log(singleProductData.price);
  document.getElementById("price").innerHTML += singleProductData.price + " ";
  
// // Récupération de la Description produit 
  // console.log(singleProductData.description);
  document.getElementById("description").innerHTML +=
  singleProductData.description;
  
// // Récupération des Couleurs 
  //console.log(singleProductData.colors);
  //console.log(singleProductData.colors.length);
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


//// Verification des options d'ajout au panier : couleur et quantité obligatoires ////

// // Verifier quantité 
const checkQuantity = () => {
  //console.log(amountOfItems.value);
  let a = amountOfItems.value;
  console.log(a);
  //vérification + Stokage de la quantité
  if (a == 0 || a >= 100) {
    alert("Vous devez ajouter une quantité (entre 1 et 100)");
  } else {
    //Recupération de la quantité selectionnée
    checkColor();
    //console.log(a);
    //console.log(typeof a);
  }
};

// // Verfifier la couleur 
const checkColor = () => {
  if (colorPicked.value == "") {
    alert ("Vous devez selectioner une couleur");
  } else {
    //Recupération de la couleur selectionnée
    colorPicked = colors.value;
    console.log("couleur: " + colorPicked);
    // Couleur & Quantité Ok
    addItemToCart();
  }
};

// // Verifications d'ajout au panier 
const checkOptions = () => {
addToCartBtn.addEventListener("click", (e) => {
  checkQuantity();
});
}
checkOptions();

//////////////////////Initialisation local storage + ajout au Panier ///////////////////////

const addItemToCart = () => {
  let product = {
    itemId: singleProductData._id,
    itemPicture: singleProductData.imageUrl,
    itemAltText: singleProductData.altTxt,
    itemName: singleProductData.name,
    itemPrice: singleProductData.price,
    itemDescription: singleProductData.description,
    itemColor: colorPicked,
    itemAmount: Number(amountOfItems.value),
  };
  
  // // LOCAL STORAGE .Parse transforme les objets du Localstorage en objets JSON
  let itemsInCart = JSON.parse(localStorage.getItem("item"));
  //console.log(itemsInCart);
  
  // // Confimation d'ajout d'un produit au panier
  const confirmItem = () => {
    if(window.confirm(`Le produit ${singleProductData.name}, ${colorPicked} a bien été ajouté à votre panier en ${ Number(amountOfItems.value)} unité(s). Pour consulter le Panier : OK ou pour revenir à l'accueil ANNULER.
    `)){
      window.location.href ="./cart.html";
    } else {
      window.location.href ="./index.html";  
    }
  }
  
  // // S'il y a déjà des produits dans le panier
  if (itemsInCart) {
    // recherche de la même référence avec la même couleur
    const sameProduct = itemsInCart.find(
      (element) => element.itemId === urlIdProduct && element.itemColor === colorPicked);
      
      if (sameProduct) {
        console.log("MAJ quantité avec id + couleur identique");
        
        // Alors on cherche les quantités
        console.log("la quantité à ajouter" + product.itemAmount)
        console.log("la quantité trouvée dans le panier: " + sameProduct.itemAmount)
        
        // Attention à changer le type de valeurs en Nombres
        let updateQuantity =  Number(product.itemAmount) + Number(sameProduct.itemAmount);
        console.log(updateQuantity);
        // On met à jour la nouvelle quantité
        sameProduct.itemAmount = updateQuantity;
        localStorage.setItem("item", JSON.stringify(itemsInCart));
        console.log(itemsInCart);
        confirmItem();
        
      } else {
        itemsInCart.push(product);
        localStorage.setItem("item", JSON.stringify(itemsInCart));
        console.log("On ajoute le produit dans le panier");
        confirmItem();
      }
      // // S'il n'y a pas déjà des produits dans le panier
    } else {
      // Création de la clé
      itemsInCart = [];
      itemsInCart.push(product);
      localStorage.setItem("item", JSON.stringify(itemsInCart));
      confirmItem();
      //console.log(itemsInCart);
    }
  }
  