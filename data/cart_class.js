class Cart {
    constructor(localStorageKey) {
      this.localStorageKey = localStorageKey;
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    }
  
    saveToStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }
  
    addToCart(productId) {
      const matchingItem = this.cartItems.find((item) => item.productId === productId);
  
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
  
      this.saveToStorage();
    }
  
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.productId !== productId);
      this.saveToStorage();
    }
  
    updateDeliveryOption(productId, deliveryOptionId) {
      const matchingItem = this.cartItems.find((item) => item.productId === productId);
      if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      }
    }
  
    displayDeliveryQuantity() {
      const totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
      const backLink = document.querySelector('.js-return-to-home');
      if (backLink) {
        backLink.innerHTML = totalQuantity;
      }
    }
  }
  
  // Example Usage
  const cartManager = new Cart('cart-oop');
  const businessCart = new Cart('cart-business');
  
  cartManager.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  cartManager.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  cartManager.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', "2");
  cartManager.displayDeliveryQuantity();
  
  console.log(businessCart);
  console.log(cartManager);
  