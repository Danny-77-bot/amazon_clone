// Initialize cart from localStorage or set default
export let cart = JSON.parse(localStorage.getItem('cart')) || [

];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += 1; 
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1"
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingItem = cart.find(cartItem => cartItem.productId === productId);
  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

export  function displayDeliveryQuantity(cart) {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const backLink = document.querySelector('.js-return-to-home');
  if (backLink) {
  backLink.innerHTML = totalQuantity;
  }
  }
