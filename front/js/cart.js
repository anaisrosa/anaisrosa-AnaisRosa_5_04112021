//LOCAL STORAGE .Récupération du array avec le contenu stocké le local storage
let itemsInCart = JSON.parse(localStorage.getItem("item"));
console.log(itemsInCart);

/////////////////////// Affichage des produits dans le Panier //////////////////////////
const cartElements = document.getElementById("cart__items");

// // Si le Panier est Vide
if (itemsInCart == null || itemsInCart == 0) {
  const emptyCart = `
  <div>Le panier est vide</div>
  `;
  cartElements.innerHTML = emptyCart;
} else {
  // // Si le Panier contient déjà des produits
  let itemCard = [];

  for (j = 0; j < itemsInCart.length; j++) {
    let totalPriceByProduct =
      itemsInCart[j].itemAmount * itemsInCart[j].itemPrice;
    // console.log(totalPriceByProduct);

    itemCard =
      itemCard +
      `
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
  if (j === itemsInCart.length) {
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
      let colorProductDetete = itemsInCart[k].itemColor;
      // console.log(colorProductDetete);

      // chercher l'id du produit à supprimer + Couleur dans le array
      itemsInCart = itemsInCart.filter(
        (product) =>
          product.itemId !== idProductDelete ||
          product.itemColor !== colorProductDetete
      );
      localStorage.setItem("item", JSON.stringify(itemsInCart));
      alert("Ce produit a bien été supprimé.");
      window.location.href = "./cart.html";
    });
  }
};
eraseProduct();

/////////////////////// Update des quantités dans le Panier //////////////////////////

const updateQuantityInCart = () => {
  let amountItemInput = document.querySelectorAll(".itemQuantity");

  //ça sort une node liste je dois faire un bloucle pour passer sur tous
  for (let l = 0; l < amountItemInput.length; l++) {
    amountItemInput[l].addEventListener("input", (e) => {
      e.preventDefault();

      // //On cherche la quantité, l'id et la couleur dans le local storage
      let quantityToUpdate = Number();
      console.log("je suis la quantité à mettre à Jour : " + quantityToUpdate);
      let idInLocalStorage = itemsInCart[l].itemId;
      console.log(idInLocalStorage);
      let colorInLocalStorage = itemsInCart[l].itemColor;

      // //On cherche la valeur le l'input avec la nouvelle quantité
      let inputQuantityValue = Number(amountItemInput[l].value);
      console.log("Je suis la valeur du input : " + inputQuantityValue);

      // //On cherche quelle ligne on va modifier dans le panier
      const findQuantity = itemsInCart.find(
        (element) =>
          element.itemAmount !== inputQuantityValue &&
          element.itemId === idInLocalStorage &&
          element.itemColor === colorInLocalStorage
      );
      console.log(findQuantity);

      // //On remplace la quantité du produit par la valeur du input
      findQuantity.itemAmount = inputQuantityValue;
      console.log(
        "Je suis la quantité à modifier dans le panier " +
          findQuantity.itemAmount
      );

      // // on l'intègre au Local storage et on recharge la page
      quantityToUpdate = inputQuantityValue;
      localStorage.setItem("item", JSON.stringify(itemsInCart));

      alert("Ce produit a bien été modifié.");
      location.reload();
    });
  }
};
updateQuantityInCart();

/////////////////////// Update total du Prix et du nombre de produits //////////////////////////

const totalItems = () => {
  let itemTotalCart = document.getElementById("totalQuantity");

  let sumItems = 0;
  for (let m = 0; m < itemsInCart.length; m++) {
    // console.log(itemsInCart[m].itemAmount)
    sumItems += Number(itemsInCart[m].itemAmount);
  }
  // console.log(sumItems);

  totalQuantity.innerHTML += sumItems;
};

totalItems();

const totalPrice = () => {
  let priceTotalCart = document.getElementById("totalPrice");
  let sumPrice = 0;
  for (let n = 0; n < itemsInCart.length; n++) {
    // console.log(itemsInCart[n].itemPrice)
    sumPrice += Number(itemsInCart[n].itemPrice * itemsInCart[n].itemAmount);
  }
  // console.log(sumPrice);

  priceTotalCart.innerHTML += sumPrice;
};
totalPrice();

/////////////////////// Formulaire //////////////////////////

//Display des erreurs de validation
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("#" + tag);
  const textError = document.querySelector("#" + tag + "ErrorMsg");

  if (!valid) {
    container.style.color = "red";
    textError.textContent = message;
  } else {
    container.style.color = "black";
    textError.textContent = message;
  }
};

let firstName, lastName, address, city, email;

// //On cible les inputs + le formulaire
let firstNameInput = document.getElementById("firstName"),
  lastNameInput = document.getElementById("lastName"),
  addressInput = document.getElementById("address"),
  cityInput = document.getElementById("city"),
  emailInput = document.getElementById("email");
const form = document.querySelector("form");

//On écoute le bouton submit pour récupérer les info du form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(firstName, lastName, address, city, email);
  if (!firstName || !lastName || !address || !city || !email) {
    alert("Attention : tous les champs doivent être remplis!");
    return;
  }

  // //Création de l'objet contact
  const contact = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    address: addressInput.value,
    city: cityInput.value,
    email: emailInput.value,
  };

  // création d'un objet avec Cantact + [] avec les ids
  const data = {
    contact,
    productIds: itemsInCart.map((item) => {
      return item.itemId;
    }),
  };
  console.log(data);
});

///////////////////////////////////Contrôles des champs//////////////////////////

// // Contrôle du prénom
const firstNameChecker = (value) => {
  if (
    value.trim().length > 0 &&
    (value.trim().length < 3 || value.length > 20)
  ) {
    firstName = false;
    errorDisplay("firstName", "Le prénom doit faire entre 3 et 20 caractères");
  } else if (!value.match(/^[a-zA-Z_.-]*$/)) {
    firstName = false;
    errorDisplay(
      "firstName",
      "Le prénom ne doit pas contenir de chiffres ou caractères spéciaux"
    );
  } else {
    errorDisplay("firstName", "", true);
    if (!firstName) {
      firstName = true;
    }
  }
};

// // Contrôle du Nom de Famille
const lastNameChecker = (value) => {
  if (
    value.trim().length > 0 &&
    (value.trim().length < 3 || value.length > 20)
  ) {
    lastName = false;
    errorDisplay(
      "lastName",
      "Le nom de famille doit faire entre 3 et 20 caractères"
    );
  } else if (!value.match(/^[a-zA-Z_.-]*$/)) {
    lastName = false;
    errorDisplay(
      "lastName",
      "Le nom de famille ne doit pas contenir de chiffres ou caractères spéciaux"
    );
  } else {
    lastName = true;
    errorDisplay("lastName", "", true);
  }
};

// // Contrôle de l'adresse
const addressChecker = (value) => {
  if (value.length > 0 && (value.length < 5 || value.length > 40)) {
    address = false;
    errorDisplay("address", "L'adresse doit faire entre 5 et 40 caractères");
  } else if (!value.match(/^[a-zA-Z0-9_ ]*$/)) {
    address = false;
    errorDisplay(
      "address",
      "L'adresse ne doit pas contenir de caractères spéciaux"
    );
  } else {
    address = true;
    errorDisplay("address", "", true);
  }
};

// // Contrôle du nom de la ville
const cityNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    city = false;
    errorDisplay(
      "city",
      "Le nom de la ville doit faire entre 3 et 20 caractères"
    );
  } else if (!value.match(/^[a-zA-Z_.-]*$/)) {
    city = false;
    errorDisplay(
      "city",
      "Le nom de la ville ne doit pas contenir de chiffres ou caractères spéciaux"
    );
  } else {
    city = true;
    errorDisplay("city", "", true);
  }
};

// // Contrôle de l'email
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "L'adresse email n'est pas valide");
  } else {
    errorDisplay("email", "", true);
    email = true;
  }
};

///////////////////// On pointe les inputs Les valeurs des inputs/////////////////////////
const formInputs = document.querySelectorAll(".cart__order__form__question");

formInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    // console.log(e.target.id);
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "address":
        addressChecker(e.target.value);
      case "city":
        cityNameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});
