const data = require('../../graphqlData')();

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
  storeProduct: args => {
    const product = { ...args, id: Number(args.id) };
    if (args.id == null || product.id === 0) {
      // New.
      product.id = nextId++;
      data.products.push(product);
    } else {
      // Update.
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
  deleteProduct: ({ id }) => {
    id = Number(id);
    // Delete from products list.
    data.products = data.products.filter(p => p.id !== id);
    // Delete product's ID from suppliers that have it.
    data.suppliers = data.suppliers.map(s => {
      s.products = s.products.filter(productId => productId !== id);
      return s;
    });
    return id;
  },
  deleteSupplier: ({ id }) => {
    id = Number(id);
    data.suppliers = data.suppliers.filter(s => s.id !== id);
    return id;
  },
};
