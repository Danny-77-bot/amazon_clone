import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/format_currency.js";

let checkoutHTML = '';

cart.forEach((cartItem) => {
    // Find the product in the products array that matches the cart item's productId
    const matchingProduct = products.find(product => product.id === cartItem.productId);

    // Ensure the matching product exists to avoid errors
    if (matchingProduct) {
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
                        <span>${cartItem.quantity}</span>
                        <span class="update-quantity-link link-primary">Update</span>
                        <span class="js-delete-link delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">Delete</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
});

// Render the generated HTML into the .order-summary container
document.querySelector('.order-summary').innerHTML = checkoutHTML;

// Add event listeners to delete links
const deleteLinks = document.querySelectorAll('.delete-quantity-link');

deleteLinks.forEach(link => {
    link.addEventListener('click', () => {
        let productId = link.dataset.productId;

        // Remove item from cart
        removeFromCart(productId);

        // Select the container using the correct class name
        let container = document.querySelector(`.js-cart-item-container-${productId}`);

        // Log and remove the container
        console.log(container);
        if (container) {
            container.remove(); // Remove the element from the DOM
        } else {
            console.error(`Container not found for productId: ${productId}`);
        }
    });
});
