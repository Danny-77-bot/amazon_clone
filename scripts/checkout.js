  import { cart, displayDeliveryQuantity, removeFromCart, updateDeliveryOption } from "../data/cart.js";
  import { products } from "../data/products.js";
  import { formatCurrency } from "./utils/format_currency.js";
  import { deliveryOptions,deliveryOptionsHTML } from "../data/deliveryoption.js";
   import { formatDate } from '../scripts/utils/form_date.js';
  import { renderPaymentSummary } from "./paymentSummary.js";
 
  // Initialize the checkout HTML string
  let checkoutHTML = '';
  let totalPrice = 0;

  // Generate checkout HTML
  cart.forEach((cartItem) => {
  const matchingProduct = products.find(product => product.id === cartItem.productId);

  if (matchingProduct) {
  const itemTotal = (matchingProduct.priceCents * cartItem.quantity) / 100;
  totalPrice += itemTotal;

  checkoutHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date js-delivery-date-${matchingProduct.id}">
    Delivery Date: ${formatDate(deliveryOptions.find(option => option.id === cartItem.deliveryOptionId))}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">

    <div class="cart-item-details">
      <div class="product-name">${matchingProduct.name}</div>
      <div class="product-price">${formatCurrency(matchingProduct.priceCents)}</div>
      <div class="product-quantity">
        <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
        <span class="update-quantity-link link-primary">Update</span>
        <span class="js-delete-link delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">Delete</span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">Choose a delivery option:</div>
      ${deliveryOptionsHTML(matchingProduct, cartItem)}
    </div>
  </div>
  </div>`;
  }
  });

 
  // Render checkout HTML
  document.querySelector('.order-summary').innerHTML = checkoutHTML;

  // Event listeners for delete links
  document.querySelectorAll('.delete-quantity-link').forEach(link => {
  link.addEventListener('click', () => {
  const productId = link.dataset.productId;

  removeFromCart(productId);
  displayDeliveryQuantity(cart);

  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  if (container) {
  container.remove();
  displayDeliveryQuantity();
  renderPaymentSummary();
  }
  });
  });
  // Event listener for delivery option selection
  document.querySelectorAll('.delivery-option-input').forEach(option => {
  option.addEventListener('change', () => {
  const productId = option.dataset.productId;
  const deliveryOptionId = option.dataset.deliveryOptionId;

  // Update the cart with the selected delivery option
  updateDeliveryOption(productId, deliveryOptionId);

  // Dynamically update the delivery date in the DOM
  const updatedDeliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);
 
  const deliveryDateElement = document.querySelector(`.js-delivery-date-${productId}`);
  if (deliveryDateElement && updatedDeliveryOption) {
  deliveryDateElement.textContent = `Delivery Date: ${formatDate(updatedDeliveryOption)}`;
  }

  console.log(`Product ID: ${productId}, Selected Delivery Option ID: ${deliveryOptionId}`);
  renderPaymentSummary();
  });

  });

  displayDeliveryQuantity(cart);
  renderPaymentSummary();





