// Sometimes, there will be occasions where you need to evaluate the form once user has entered ~
// ~ the valid data. This is often a case when you need to measure the consistencies between different ~
// ~ input field before sending it to the server.
export function ValidateForm(data) {
  let errors = [];
  if (!data.email.endsWith('@example.com'))
    errors.push('Only @example.com users allowed.');
  if (!data.email.toLowerCase().startsWith(data.name.toLowerCase()))
    errors.push('Email must start with name.');
  if (data.name.toLowerCase() === 'joe') errors.push('Get away, Joe!');
  return errors;
}
