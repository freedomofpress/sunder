export function createValidator(rules) {
  return (values = {}) => {
    const errors = {};
    Object.keys(rules).forEach((field) => {
      const fieldRules = rules[field];
      const fieldError = fieldRules
          .map((rule) => rule(values[field], field, values))
          .filter((error) => Boolean(error))
          .join('. ');

      if (fieldError) {
        errors[field] = fieldError;
      }
    });

    return errors;
  };
}


export function required(value, fieldName) {
  const errorMessage = `${fieldName} is required`;

  if (!value) {
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

  if (typeof value !== 'number') {
    return errorMessage;
  }

  return false;
}


export function min(num) {
  return (value, fieldName) => {
    // Ignore non-numbers
    if (typeof value !== 'number') {
      return false;
    }

    if (value < num) {
      return `${fieldName} must be at least ${num}`;
    }

    return false;
  };
}


export function max(num) {
  return (value, fieldName) => {
    // Ignore non-numbers
    if (typeof value !== 'number') {
      return false;
    }

    if (value > num) {
      return `${fieldName} must be at most ${num}`;
    }

    return false;
  };
}
