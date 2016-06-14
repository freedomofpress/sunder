import { createValidator, required, max, min, isNumber } from './validations';

export default createValidator({
  secret: [required],
  shares: [required, isNumber, max(255), min(2)],
  quorum: [
    required,
    isNumber,
    min(2),
    // Require that quorum is less than the number of shares
    (value, fieldName, allValues) => {
      let sharesValue = allValues.shares;
      if (typeof sharesValue === 'string') {
        sharesValue = parseInt(sharesValue, 10);
      }

      if (typeof value === 'string') {
        value = parseInt(value, 10);
      }
      // Ignore this if they are not both numbers
      if (typeof sharesValue !== 'number' || typeof value !== 'number') {
        return false;
      }

      if (value > sharesValue) {
        return 'The quorum must be at most the number of shares';
      }

      return false;
    }
  ]
});
