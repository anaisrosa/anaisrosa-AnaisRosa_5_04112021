//LOCAL STORAGE .Récupération du array avec le contenu stocké le local storage
let itemsInCart = JSON.parse(localStorage.getItem("item"));
console.log(itemsInCart);

/////////////////////// Affichage des produits dans le Panier //////////////////////////
const cartElements = document.getElementById("cart__items");

// // Si le Panier est Vide
if (itemsInCart == null) {
  const emptyCart = `
<div>Le panier est vide</div>
`;
  cartElements.innerHTML = emptyCart;
} else {
  // // Si le Panier contient déjà des produits
  let itemCard = [];

  for (j = 0; j < itemsInCart.length; j++) {

    itemCard = itemCard + `
    <article class="cart__item" data-id="{product-ID}">

    <div class="cart__item__img">
     <img src="${itemsInCart[j].itemPicture}" alt="${itemsInCart[j].itemAltText}">
    </div>

    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${itemsInCart[j].itemName}</h2>
        <p>${itemsInCart[j].itemPrice} €</p>
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


