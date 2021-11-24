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
    // console.log(totalPriceByProduct);
    
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
    <p id="amountItemsLocalStorage">Qté : ${itemsInCart[j].itemAmount}</p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemsInCart[j].itemAmount}">
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
  
  let amountItemInput =  document.querySelectorAll(".itemQuantity") 
  let amountItemsLocalStorage = document.getElementById("amountItemsLocalStorage")
  let inputQuantity
  let quantityToUpdate
  
  //ça sort une node liste je dois faire un bloucle pour passer sur tous
  for (let l = 0; l < amountItemInput.length; l++) {
    amountItemInput[l].addEventListener("input", (e) => {
      
      inputQuantity = e.target.value;
      // console.log("Je suis la quantité du input : " + inputQuantity);
      
      // On cherche la quantité dans le local storage
      let quantityToUpdate = Number(itemsInCart[l].itemAmount);
      // console.log("je suis a quantité à mettre à Jour : " + quantityToUpdate);
      
      const findQuantity = itemsInCart.find(
        (element) => element.itemAmount !== inputQuantity);
        console.log(findQuantity);
        console.log("Je suis la quantité déjà dans le panier "+ findQuantity.itemAmount);
        findQuantity.itemAmount = inputQuantity;
        console.log("Je suis la quantité mise à jour : " + inputQuantity);

        // on remplace la quantité et on l'intègre au Html et on recharge la page
        localStorage.setItem("item", JSON.stringify(itemsInCart));  
        alert("Ce produit a bien été modifié.")
        window.location.href = "./cart.html";
        
      });
      
    }
  }

  updateQuantityInCart();

  /////////////////////// Update total du Prix et du nombre de produits //////////////////////////
  
  const totalItems = ()=> {
    let itemTotalCart =  document.getElementById("totalQuantity") 

    let sumItems = 0;
    for (let m = 0; m < itemsInCart.length; m++) {
    // console.log(itemsInCart[m].itemAmount)
    sumItems += Number(itemsInCart[m].itemAmount)
    }
    // console.log(sumItems);

    totalQuantity.innerHTML += sumItems;
  }

  totalItems();

  const totalPrice = ()=> {
    let priceTotalCart = document.getElementById("totalPrice")
    let sumPrice = 0;
    for (let n = 0; n < itemsInCart.length; n++) {
    // console.log(itemsInCart[n].itemPrice)
    sumPrice += Number(itemsInCart[n].itemPrice*itemsInCart[n].itemAmount)
    }
    console.log(sumPrice);

    priceTotalCart.innerHTML += sumPrice;
  }
  totalPrice();
  



