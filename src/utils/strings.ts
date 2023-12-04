export const toCurrencyString = (value: number) =>
  '$ ' + value.toLocaleString('en-US');

export const isPhoneNumber = (p) => {
  const phoneRegexp = new RegExp('^[1-9]{7,15}$');
  return phoneRegexp.test(p);
};

export const validatePhoneList = (val) => {
  const phones = val
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p !== '');
  console.log(phones);
  // phones.forEach((p) => {
  //   console.log(isPhoneNumber(p));
  //   if (!isPhoneNumber(p)) {
  //     console.log('not valid');
  //     return false;
  //   }
  // });
  for (let i = 0; i < phones.length; i++) {
    if (!isPhoneNumber(phones[i])) {
      console.log('not valid');
      return false;
    }
  }
  console.log('passing validation');
  return true;
};
