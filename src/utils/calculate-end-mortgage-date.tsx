export function calculateEndMortgageDate(monthsFromNow: number): string {
  const today = new Date();
  const futureDate = new Date(today.setMonth(today.getMonth() + monthsFromNow));
  const futureMonth = futureDate.getMonth() + 1; // Months are zero-based in JavaScript
  const futureYear = futureDate.getFullYear();
  return `${futureMonth}/${futureYear}`;
}
