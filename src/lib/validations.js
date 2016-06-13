

export function createValidator(rules) {
  return (values = {}) => {
    const errors = {};
    Object.keys(rules).forEach((field) => {
      const fieldRules = rules[field];
      const fieldErrors = unique(fieldRules
          .map((rule) => rule(values[field], field, values))
          .filter((error) => Boolean(error))
          .map(capitalize));
      const fieldError = `${fieldErrors.join('. ')}${fieldErrors.length ? '.' : ''}`;

      if (fieldError) {
        errors[field] = fieldError;
      }
    });

    return errors;
  };
}


export function required(value, fieldName) {
  const errorMessage = `${fieldName} is required`;

  if (!value && typeof value !== 'number') {
    return errorMessage;
  }

  if (Array.isArray(value) && value.length === 0) {
    return errorMessage;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return errorMessage;
  }

  return false;
}


export function isNumber(value, fieldName) {
  const errorMessage = `${fieldName} must be a number`;

  if (typeof value === 'string') {
    value = parseInt(value, 10);
  }

  if (isNaN(value)) {
    return errorMessage;
  }

  if (typeof value !== 'number') {
    return errorMessage;
  }

  return false;
}


export function min(num) {
  return (value, fieldName) => {
    const numberError = isNumber(value, fieldName);
    if (numberError) {
      return numberError;
    }

    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }

    if (value < num) {
      return `${fieldName} must be at least ${num}`;
    }

    return false;
  };
}


export function max(num) {
  return (value, fieldName) => {
    const numberError = isNumber(value, fieldName);
    if (numberError) {
      return numberError;
    }

    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }

    if (value > num) {
      return `${fieldName} must be at most ${num}`;
    }

    return false;
  };
}


function unique(arr) {
  const hash = {};
  return arr.filter((val) => {
    const alreadyPresent = hash[val];
    hash[val] = true;
    return !alreadyPresent;
  });
}


function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
