export const GetMessages = element => {
  let messages = [];
  if (element.validity.typeMismatch) messages.push(`Invalid ${element.type}`);
  if (element.validity.valueMissing) messages.push('Value required');
  return messages;
};
