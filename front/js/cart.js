//LOCAL STORAGE .Récupération du array avec le contenu stocké le local storage
let itemsInCart = JSON.parse(localStorage.getItem("item"));
console.log(itemsInCart);

/////////////////////// Affichage des produits dans le Panier //////////////////////////
const cartElements = document.getElementById("cart__items");

// // Si le Panier est Vide
if (itemsInCart == null || itemsInCart == 0 ) {
  const emptyCart = `
<div>Le panier est vide</div>
`;
  cartElements.innerHTML = emptyCart;
} else {
  // // Si le Panier contient déjà des produits
  let itemCard = [];

  for (j = 0; j < itemsInCart.length; j++) {

    let totalPriceByProduct = itemsInCart[j].itemAmount * itemsInCart[j].itemPrice;
    console.log(totalPriceByProduct);

    itemCard = itemCard + `
    <article class="cart__item" data-id="{product-ID}">

    <div class="cart__item__img">
     <img src="${itemsInCart[j].itemPicture}" alt="${itemsInCart[j].itemAltText}">
    </div>

    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${itemsInCart[j].itemName}, ${itemsInCart[j].itemColor}</h2>
        <p>${totalPriceByProduct}  €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${itemsInCart[j].itemAmount}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
  }
    if(j === itemsInCart.length) {
    cartElements.innerHTML = itemCard;
  }
}

/////////////////////// Supression d'un produits dans le Panier //////////////////////////

const eraseProduct = () => {

let deleteItem = document.querySelectorAll(".deleteItem");

//ça sort une node liste je dois faire un bloucle pour passer sur tous
for (let k = 0; k < deleteItem.length; k++) {

  // il faut suprimener la ligne du local Storage
deleteItem[k].addEventListener("click", (e) => {
  e.preventDefault();

 //trouver l'id du produit à supprimer + Couleur
let idProductDelete = itemsInCart[k].itemId;
// console.log(idProductDelete);
let colorProductDetete = itemsInCart[k].itemColor
// console.log(colorProductDetete);

// chercher l'id du produit à supprimer + Couleur dans le array
itemsInCart = itemsInCart.filter( product => product.itemId !== idProductDelete || product.itemColor !== colorProductDetete );
localStorage.setItem("item", JSON.stringify(itemsInCart));  
alert("Ce produit a bien été supprimé.")
  window.location.href = "./cart.html";
  });
  
}

}
eraseProduct();

/////////////////////// Update des quantités dans le Panier //////////////////////////

const updateQuantityInCart = () => {
  
  let quantityInCart =  document.querySelectorAll(".itemQuantity") 

  

}



