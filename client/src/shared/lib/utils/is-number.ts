export const isNumber = (str: string) => {
  if (str.trim() === '') {
    return false;
  }

  return !Number.isNaN(Number(str));
};
