import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/format_currency.js";
import { deliveryOptions } from "../data/deliveryoption.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let HTML = '';
  deliveryOptions.forEach((deliveryOption) => {
    const priceString = deliveryOption.priceCents === 0 ? 'Free' : `${formatCurrency(deliveryOption.priceCents)}`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    HTML += `
      <div class="delivery-option js-delivery-option"
           data-product-id="${matchingProduct.id}"    
           data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
               class="delivery-option-input"
               name="delivery-option-${matchingProduct.id}" 
               id="delivery-option-${deliveryOption.id}-${matchingProduct.id}" 
               data-product-id="${matchingProduct.id}"
               data-delivery-option-id="${deliveryOption.id}">
        <div>
          <div class="delivery-option-date">${formatDate(deliveryOption)}</div>
          <div class="delivery-option-price">${priceString} - shipping</div>
        </div>
      </div>`;
  });
  return HTML;
}

// Render checkout HTML
document.querySelector('.order-summary').innerHTML = checkoutHTML;

// Event listeners for delete links
document.querySelectorAll('.delete-quantity-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    if (container) {
      container.remove();
      displayDeliveryQuantity();
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
  });
});

function formatDate(deliveryOption) {
  if (!deliveryOption) return "Unavailable";
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  return deliveryDate.format('dddd, MMMM D');
}

function displayDeliveryQuantity() {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const backLink = document.querySelector('.js-return-to-home');
  if (backLink) {
    backLink.innerHTML = totalQuantity;
  }
}

displayDeliveryQuantity();


// Function to dynamically render the payment summary
function renderPaymentSummary() {
    const paymentSummaryContainer = document.querySelector('.payment-summary');
    
    if (!paymentSummaryContainer) return;
  
    const itemTotal = cart.reduce((total, cartItem) => {
      const matchingProduct = products.find(product => product.id === cartItem.productId);
      return total + (matchingProduct.priceCents * cartItem.quantity) / 100;
    }, 0);
  
    const shippingTotal = cart.reduce((total, cartItem) => {
      const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);
      return total + (deliveryOption?.priceCents || 0) / 100;
    }, 0);
  
    const totalBeforeTax = itemTotal + shippingTotal;
    const estimatedTax = totalBeforeTax * 0.1; // Assuming 10% tax
    const orderTotal = totalBeforeTax + estimatedTax;
  
    // Render the updated payment summary
    paymentSummaryContainer.innerHTML = `
      <div class="payment-summary-title">Order Summary</div>
  
      <div class="payment-summary-row">
        <div>Items (${cart.length}):</div>
        <div class="payment-summary-money">${formatCurrency(itemTotal * 100)}</div>
      </div>
  
      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${formatCurrency(shippingTotal * 100)}</div>
      </div>
  
      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${formatCurrency(totalBeforeTax * 100)}</div>
      </div>
  
      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${formatCurrency(estimatedTax * 100)}</div>
      </div>
  
      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${formatCurrency(orderTotal * 100)}</div>
      </div>
  
      <button class="place-order-button button-primary">Place your order</button>
    `;
  }
  
  // Initial render of the order summary
  renderPaymentSummary();
  
  // Update payment summary whenever the cart changes (e.g., delivery option changes)
  document.querySelectorAll('.delivery-option-input').forEach(option => {
    option.addEventListener('change', () => {
      renderPaymentSummary();
    });
  });
  
  document.querySelectorAll('.delete-quantity-link').forEach(link => {
    link.addEventListener('click', () => {
      renderPaymentSummary();
    });
  });
  


