import { displayDeliveryQuantity } from "../data/cart.js";
import { cart } from "../data/cart.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { orderSummaryRender } from "./checkout/orderSummary.js";
  displayDeliveryQuantity(cart);
  orderSummaryRender();
  renderPaymentSummary();






