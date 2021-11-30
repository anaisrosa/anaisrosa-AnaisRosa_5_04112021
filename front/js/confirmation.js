const displayOrderNumber = () => {
// // on pointe le selecteur
const orderId = document.getElementById("orderId")
console.log(orderId);
// On injecte la valeur stockée dans le local storage
orderId.textContent = localStorage.getItem("orderNum")

}
displayOrderNumber();

