    import { cart } from "../data/cart.js";
    import { products } from "../data/products.js";
    import { formatCurrency } from "./utils/format_currency.js";

    let checkoutHTML = '';

    cart.forEach((cartItem) => {
    // Find the product in the products array that matches the cart item's productId
    const matchingProduct = products.find(product => product.id === cartItem.productId);

    // Ensure the matching product exists to avoid errors
    if (matchingProduct) {
    checkoutHTML += `
    <div class="cart-item-container">
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
    <span class="delete-quantity-link link-primary">Delete</span>
    </div>
    </div>

    <div class="delivery-options">
    <div class="delivery-options-title">
    Choose a delivery option:
    </div>
    <div class="delivery-option">
    <input type="radio" class="delivery-option-input" 
    name="delivery-option-${matchingProduct.id}" value="free-shipping">
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
    <input type="radio" class="delivery-option-input" 
    name="delivery-option-${matchingProduct.id}" value="standard-shipping">
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
    <input type="radio" class="delivery-option-input" 
    name="delivery-option-${matchingProduct.id}" value="express-shipping">
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
    </div>
    </div>
    `;
    }
    });

    // Render the generated HTML into the .order-summary container
    console.log(checkoutHTML);
    document.querySelector('.order-summary').innerHTML = checkoutHTML;
