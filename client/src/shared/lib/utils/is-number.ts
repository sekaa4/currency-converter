export const isNumber = (str: string) => {
  if (str.trim() === '' || str.includes('.')) {
    return false;
  }

  return !Number.isNaN(Number(str));
};
