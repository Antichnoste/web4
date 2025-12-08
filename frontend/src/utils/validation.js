export const validateY = (y) => {
  if (y === '' || y === '-') return false;
  const num = parseFloat(y);
  return !isNaN(num) && num >= -3 && num <= 5;
};