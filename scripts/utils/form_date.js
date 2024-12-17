import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
 export function formatDate(deliveryOption) {
  if (!deliveryOption) return "Unavailable";
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  return deliveryDate.format('dddd, MMMM D');
  }