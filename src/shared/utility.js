export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const validateValue = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
};

export const parseQueryString = (query) => {
  let queryObj = {};
  let str = query.slice(1, query.length);
  while (str) {
    const indexEq = str.indexOf('=');
    let indexAmp = str.indexOf('&');
    if (indexEq >= 0 && indexAmp >= 0) {
      queryObj = {
        ...queryObj,
        [str.slice(0, indexEq)]: str.slice(indexEq + 1, indexAmp),
      };
    } else if (indexEq > 0 && indexAmp === -1) {
      indexAmp = str.length;
      queryObj = {
        ...queryObj,
        [str.slice(0, indexEq)]: str.slice(indexEq + 1, str.length),
      };
    }
    // eslint-disable-next-line no-unused-expressions
    indexEq === -1 && indexAmp === -1 ? str = null : str = str.slice(indexAmp + 1, str.length);
  }
  return queryObj;
};

export const getDate = () => {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
};
