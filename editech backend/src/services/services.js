const Meds = require("../database/Meds");

const getAllShops = (res) => {
  try {
    const allShops = Meds.shops(res);
    return allShops;
  } catch (error) {
    throw error;
  }
};

const getAllProductsInShop = (res, id_shop) => {
  try {
    const allProductsInShop = Meds.productsInShop(res, id_shop);
    return allProductsInShop;
  } catch (error) {
    throw error;
  }
};

const createOrder = (body, res) => {
  try {
    const order = Meds.createOrder(body);
  } catch (error) {
    throw error;
  }
};

{
}
module.exports = {
  createOrder,
  getAllShops,
  getAllProductsInShop,
};
