export function GetValidationMessages(element) {
  let errors = [];

  if (!element.checkValidity()) {
    const { valueMissing, tooShort, rangeUnderflow } = element.validity;

    if (valueMissing) errors.push('Value required.');
    if (tooShort) errors.push('Value is too short');
    if (rangeUnderflow) errors.push('Value is too small.');
  }

  return errors;
}
