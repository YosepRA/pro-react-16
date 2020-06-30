let names = [
  { name: 'Joe', age: '21' },
  { name: 'Maria', age: '20' },
];

let namesCopySpread = [...names];
let namesCopySlice = names.slice();
let namesCopyFrom = Array.from(names);
let namesCopyJSON = JSON.parse(JSON.stringify(names));

function compareCopiedArrays(arrayOne, arrayTwo) {
  let result = true;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) result = false;
  }
  return result;
}

console.log(`namesCopySpread: ${compareCopiedArrays(names, namesCopySpread)}`);
console.log(`namesCopySlice: ${compareCopiedArrays(names, namesCopySlice)}`);
console.log(`namesCopyFrom: ${compareCopiedArrays(names, namesCopyFrom)}`);
console.log(`namesCopyJSON: ${compareCopiedArrays(names, namesCopyJSON)}`);
