// class Dog {
//   constructor(name) {
//     this.name = name;
//   }
//   // Arrow method will be created as instance's method.
//   bark = () => {
//     console.log('WOOF');
//   };
//   // While "normal" method will be created as prototype's method.
//   printThis() {
//     console.log(this);
//   }
// }

// let fluffy = new Dog('Fluffy');
// fluffy.printThis();

// ======================================================================================================== //

import sumOdds, { sumValue } from './sum';

let values = [10, 20, 30, 40, 50];

console.log(`Sum value: ${sumValue(values)}. Sum odds: ${sumOdds(values)}`);
