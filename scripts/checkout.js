import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/format_currency.js";

// Initialize the checkout HTML string
let checkoutHTML = '';
let totalPrice = 0;  // To calculate the total price

cart.forEach((cartItem) => {
    // Find the product that matches the cart item's productId
    const matchingProduct = products.find(product => product.id === cartItem.productId);

    if (matchingProduct) {
        const itemTotal = matchingProduct.priceCents * cartItem.quantity / 100;
        totalPrice += itemTotal;

        checkoutHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
                        <span class="update-quantity-link link-primary">Update</span>
                        <span class="js-delete-link delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">Delete</span>
                    </div>
                </div>  
                
                    <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>

                 <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>

                 <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
            </div>

             

 
        </div>`;
    }
});

// Render the generated HTML into the order-summary container
document.querySelector('.order-summary').innerHTML = checkoutHTML;

// Add event listeners to the delete links
const deleteLinks = document.querySelectorAll('.delete-quantity-link');

deleteLinks.forEach(link => {
    link.addEventListener('click', () => {
        let productId = link.dataset.productId;

        // Remove item from the cart
        removeFromCart(productId);

        // Select and remove the cart item container
        let container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) {
            container.remove();  // Remove the element from the DOM
        } else {
            console.error(`Container not found for productId: ${productId}`);
        }

        // Optionally, update the total and payment summary
        updatePaymentSummary();
    });
});

// Function to update the payment summary (item total, shipping, and total cost)
function updatePaymentSummary() {
    const paymentSummaryHTML = `
        <div class="payment-summary-title">Order Summary</div>
        <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">${formatCurrency(totalPrice * 100)}</div>
        </div>
        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
        </div>
        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency((totalPrice + 4.99) * 100)}</div>
        </div>
        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(((totalPrice + 4.99) * 0.1) * 100)}</div>
        </div>
        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(((totalPrice + 4.99) * 1.1) * 100)}</div>
        </div>
        <button class="place-order-button button-primary">
            Place your order
        </button>`;

    // Update the payment summary container
    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
}




// Initialize the payment summary when the page loads
updatePaymentSummary();


