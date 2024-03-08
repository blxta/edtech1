const services = require("../services/services");

const getAllShops = (req, res) => {
  const { mode } = req.query;
  try {
    const allShops = services.getAllShops(res);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllProductsInShop = (req, res) => {
  const { id_shop } = req.query;
  try {
    const allShops = services.getAllProductsInShop(res, id_shop);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createOrder = (req, res) => {
  const { body } = req;
  try {
    const order = services.createOrder(body);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
module.exports = { getAllShops, getAllProductsInShop, createOrder };
