const controller = require("../controller/controller");

const express = require("express");

const router = express.Router();

router.get("/shops", (req, res) => {
  controller.getAllShops(req, res);
});

router.get("/productsOfShop", (req, res) => {
  controller.getAllProductsInShop(req, res);
});

router.post("/createorder", (req, res) => {
  controller.createOrder(req, res);
});

module.exports = router;
