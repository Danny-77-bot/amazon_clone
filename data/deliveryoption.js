import { formatDate } from "../scripts/utils/form_date.js";
import { formatCurrency } from "../scripts/utils/format_currency.js";
export const deliveryOptions=[
    {
        id:'1',
        deliveryDays:7,
        priceCents:0

    },
    {
        id:'2',
        deliveryDays:3,
        priceCents:499
    },
    {
        id:'3',
        deliveryDays:1,
        priceCents:999
    }
]


export  function deliveryOptionsHTML(matchingProduct, cartItem) {
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
