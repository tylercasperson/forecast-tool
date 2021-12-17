export const numberWithCommas = (number) => {
  let incommingNumber = number === null ? 0 : number;
  return incommingNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const noCommas = (number) => {
  let incommingNumber =
    number === '' || number === null || number === undefined || isNaN(number) ? '0' : number;
  return incommingNumber.indexOf(',') === -1 ? incommingNumber : incommingNumber.replace(/,/g, '');
};

export const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
