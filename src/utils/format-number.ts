export function formatNumber(value: number): string {
  if (isNaN(value)) {
    throw new Error('Input must be a number');
  }

  // Format the number to two decimal places
  let formattedNumber = value.toFixed(2);

  // Replace the decimal point with a comma
  formattedNumber = formattedNumber.replace('.', ',');

  // Add thousands separator (.)
  const parts = formattedNumber.split(',');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return parts.join(',');
}
