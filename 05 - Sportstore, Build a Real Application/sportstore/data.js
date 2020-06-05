const faker = require('faker');

let products = [];
let categories = ['Watersports', 'Chess', 'Running', 'Soccer'];
faker.seed(100);
for (let i = 1; i <= 503; i++) {
  let category = faker.helpers.randomize(categories);
  products.push({
    id: i,
    name: faker.commerce.productName(),
    category,
    description: `${category}: ${faker.lorem.sentence(3)}`,
    price: Number(faker.commerce.price()),
  });
}

// Orders seeding.
let orders = [];
for (let i = 0; i < 103; i++) {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let order = {
    id: i,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email(firstName, lastName),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
    shipped: faker.random.boolean(),
    products: [],
  };

  // Seeding order's products list.
  let productCount = faker.random.number({ min: 1, max: 5 });
  let product_ids = [];
  while (product_ids.length < productCount) {
    let candidateId = faker.random.number({ min: 1, max: products.length });
    if (!product_ids.some(id => id === candidateId))
      product_ids.push(candidateId);
  }

  for (let j = 0; j < productCount; j++) {
    order.products.push({
      quantity: faker.random.number({ min: 1, max: 10 }),
      product_id: product_ids[j],
    });
  }

  orders.push(order);
}

module.exports = () => ({ categories, products, orders });
