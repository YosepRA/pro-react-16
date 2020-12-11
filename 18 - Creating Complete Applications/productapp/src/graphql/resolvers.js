const data = require('../../restData')();

let nextId = 100;

const mapIdsToProducts = (supplier, nameFilter) =>
  supplier.products
    .map(id => data.products.find(product => product.id === Number(id)))
    .filter(product =>
      product.name.toLowerCase().includes(nameFilter.toLowerCase())
    );

module.exports = {
  products: () => data.products,
  product: ({ id }) =>
    data.products.find(product => product.id === parseInt(id)),
  suppliers: () =>
    data.suppliers.map(supplier => ({
      ...supplier,
      products: ({ nameFilter }) => mapIdsToProducts(supplier, nameFilter),
    })),
  supplier: ({ id }) => {
    const result = data.suppliers.find(
      supplier => supplier.id === parseInt(id)
    );
    if (result) {
      return {
        ...result,
        products: ({ nameFilter }) => mapIdsToProducts(result, nameFilter),
      };
    }
  },
  storeProduct: ({ product }) => {
    if (product.id == null) {
      // New.
      product.id = nextId++;
      data.products.push(product);
    } else {
      // Update.
      product = { ...product, id: Number(product.id) };
      data.products = data.products.map(p =>
        p.id === product.id ? product : p
      );
    }
    return product;
  },
  storeSupplier: args => {
    const supp = { ...args, id: Number(args.id) };
    if (args.id == null) {
      // New.
      supp.id = nextId++;
      data.suppliers.push(supp);
    } else {
      // Update.
      data.suppliers = data.suppliers.map(s => (s.id === supp.id ? supp : s));
    }
    const result = data.suppliers.find(s => s.id === supp.id);
    if (result) {
      return {
        ...result,
        products: ({ nameFilter }) => mapIdsToProducts(result, nameFilter),
      };
    }
  },
};
