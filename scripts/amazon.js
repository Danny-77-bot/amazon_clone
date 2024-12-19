import { cart, addToCart } from "../data/cart.js";
import { products} from "../data/products.js";


// Select the container where the products should be added
const productsGrid = document.querySelector('.js-products-grid');
const cartCountElement = document.querySelector('.js-cart-quantity'); // Renamed for clarity

// Generate the product HTML
let productHTML = '';
products.forEach((item) => {
  productHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${item.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">
        ${item.name}
      </div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src="${item.getStarUrl()}">
        <div class="product-rating-count link-primary">
          ${item.rating.count}
        </div>
      </div>
      <div class="product-price">
        ${item.getPrice()}
      </div>
      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
         ${item.extraInfoHTML()} 
      <div class="product-spacer"></div>
      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>
      <button class="js-add-to-cart add-to-cart-button button-primary" data-id="${item.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// Function to update the cart UI
function updateCartUi() {
  let totalCartCount = 0; // Fixed naming for clarity
  cart.forEach(item => {
    totalCartCount += item.quantity; // Sum up quantities
  });

  cartCountElement.innerHTML = totalCartCount; // Update the cart icon
}

// Insert the HTML into the container
productsGrid.innerHTML = productHTML;

// Select all "Add to Cart" buttons
const addBtns = document.querySelectorAll('.js-add-to-cart');

// Add event listeners to all buttons
addBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.id; // Access product ID from dataset
    addToCart(productId); // Add product to the cart
    updateCartUi(); // Update the cart UI
  });
});

// Initial update to ensure the cart count is displayed properly on page load
updateCartUi();
