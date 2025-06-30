import type { Product } from "./types";

export const formatDate = (date: Date, isHours: boolean | undefined = undefined): string => {
  const day = new Date(date).getDate().toString().padStart(2, '0');
  const month = new Date(date).toLocaleString('en-US', { month: 'short' });
  const year = new Date(date).getFullYear();

  let formattedDate = `${day} ${month}, ${year}`;

  if (isHours) {
    const time = new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
    formattedDate = `${formattedDate}, ${time}`;
  }

  return formattedDate;
};

export const formatDateForInput = (date: Date | null) => {
  if (!date) return '';

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const calculatePrice = (products: Product[]) => {
  let totalUAH = 0;
  let totalUSD = 0;

  for (const item of products) {
    if (item.price && Array.isArray(item.price)) {
      for (const price of item.price) {
        if (price.symbol === 'UAH') {
          totalUAH += price.value;
        } else if (price.symbol === 'USD') {
          totalUSD += price.value;
        }
      }
    }
  }

  return {
    totalUAH: totalUAH.toFixed(2),
    totalUSD: totalUSD.toFixed(2)
  };
}
