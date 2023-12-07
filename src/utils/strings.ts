export const toCurrencyString = (value: number) =>
  '$ ' + value.toLocaleString('en-US');

export const isPhoneNumber = (p) => {
  const phoneRegexp = new RegExp('^[0-9]{7,15}$');
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
      console.log('not valid', phones[i]);
      return false;
    }
  }
  console.log('passing validation');
  return true;
};

export const validateTaxCode = (t) => {
  const taxCodeRegexp = new RegExp('^[0-9]{1,15}$');
  return taxCodeRegexp.test(t);
};

export const validateBankAccount = (t) => {
  const bankAccountRegexp = new RegExp('^[0-9]{1,20}$');
  return bankAccountRegexp.test(t);
};
