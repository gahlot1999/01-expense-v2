export function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateStr, formatNeeded) {
  const formats = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const options = {};

  formatNeeded?.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(formats, key)) {
      options[key] = formats[key];
    }
  });

  return new Intl.DateTimeFormat('en', formatNeeded ? options : formats).format(
    new Date(dateStr),
  );
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getCurrentMonthYear() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  const formattedMonth = `${year}-${month}`;

  return formattedMonth;
}
