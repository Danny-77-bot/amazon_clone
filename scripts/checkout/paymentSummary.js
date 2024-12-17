    import { cart } from "../../data/cart.js";
    import { products } from "../../data/products.js";
    import { deliveryOptions } from "../../data/deliveryoption.js";
    import { formatCurrency } from "../utils/format_currency.js";
    export function renderPaymentSummary() {
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
        <div class="payment-summary-money">$${formatCurrency(orderTotal * 100)}</div>
        </div>
    
        <button class="place-order-button button-primary">Place your order</button>
        `;
        }