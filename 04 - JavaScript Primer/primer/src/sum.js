export function sumValue(value) {
  return value.reduce((total, val) => total + val, 0);
}

export default function (value) {
  return sumValue(value.filter((val, index) => (index + 1) % 2 !== 0));
}
