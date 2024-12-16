import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/format_currency.js";
import { deliveryOptions } from "../data/deliveryoption.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// Initialize the checkout HTML string
let checkoutHTML = '';
let totalPrice = 0; // To calculate the total price


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
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>`;
    }
});
let backLink=document.querySelector('.js-retrun-to-home');
const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    backLink.innerHTML=totalQuantity

function deliveryOptionsHTML(matchingProduct, cartItem) {
    let HTML = '';
    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0
            ? 'Free'
            : `$${formatCurrency(deliveryOption.priceCents)}`;

        // Check if this option matches the selected delivery option for the cart item
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        HTML += `
        <div class="delivery-option">
            <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}" 
                id="delivery-option-${deliveryOption.id}-${matchingProduct.id}" 
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - shipping
                </div>
            </div>
        </div>`;
    });
    return HTML;
}

// Render the generated HTML into the order-summary container
document.querySelector('.order-summary').innerHTML = checkoutHTML;

// Add event listeners to the delete links
const deleteLinks = document.querySelectorAll('.delete-quantity-link');

deleteLinks.forEach(link => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        // Remove item from the cart
        removeFromCart(productId);

        // Select and remove the cart item container
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) {
            container.remove(); // Remove the element from the DOM
        } else {
            console.error(`Container not found for productId: ${productId}`);
        }
    });
});

// Event listener for delivery option selection
const deliveryOptionInputs = document.querySelectorAll('.delivery-option-input');

deliveryOptionInputs.forEach(option => {
    option.addEventListener('change', () => {
        const productId = option.dataset.productId;
        const deliveryOptionId = option.dataset.deliveryOptionId;

        // Update the cart with the selected delivery option
        const cartItem = cart.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.deliveryOptionId = deliveryOptionId;
        }

        console.log(`Product ID: ${productId}, Selected Delivery Option ID: ${deliveryOptionId}`);
    });
});
