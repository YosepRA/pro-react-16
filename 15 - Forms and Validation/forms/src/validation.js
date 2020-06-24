import validator from 'validator';

// data: { field: data }, ...
// rules: { field: { rule: data }, ... }
export function ValidateData(data, rules) {
  let errors = {};

  Object.keys(data).forEach(field => {
    if (rules.hasOwnProperty(field)) {
      // Each field will have an array of error messages that will later be displayed as a long ~
      // ~ string around the field.
      let fieldErrors = [];
      let value = data[field];

      // Checkbox validation.
      // We create a separate checker here because 'validator' can only accept strings.
      if (rules[field].true) {
        if (!value) fieldErrors.push('Must be checked.');
      } else {
        // String-based input validation.
        // If it's required.
        if (rules[field].required && validator.isEmpty(value)) {
          fieldErrors.push('Value required.');
        }
        // As long as it's not empty.
        if (!validator.isEmpty(value)) {
          // If there's a required minimal length.
          if (
            rules[field].minlength &&
            !validator.isLength(value, rules[field].minlength)
          ) {
            fieldErrors.push(
              `Enter at least ${rules[field].minlength} characters.`
            );
          }
          // If the field must only contain alphabets.
          if (rules[field].alpha && !validator.isAlpha(value)) {
            fieldErrors.push('Enter only letters.');
          }
          // If the field must comply to email format.
          if (rules[field].email && !validator.isEmail(value)) {
            fieldErrors.push('Enter a valid address.');
          }
          if (
            rules[field].equals &&
            !validator.equals(value, data[rules[field].equals])
          ) {
            fieldErrors.push("Value doesn't match.");
          }
        }
      }
      // If there's an error, assign the array to the respective field name.
      if (fieldErrors.length > 0) errors[field] = fieldErrors;
    }
  });

  return errors;
}
