export const checkAllValuesNullOrEmpty = (obj: object) => {
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== '') {
      return false;
    }
  }
  return true;
};
