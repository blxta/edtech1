const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/example.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the example database.");
});

function shops(res) {
  db.all("SELECT * FROM shops", (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      return res.send({ status: "OK", data: rows });
    }
  });
}

function productsInShop(res, id) {
  db.all(
    `SELECT products.id, products.name, products.price
  FROM shop_products
  JOIN products ON shop_products.id_product = products.id
  JOIN shops ON shop_products.id_shop = shops.id
  WHERE shops.id = ${id}`,
    (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        return res.send({ status: "OK", data: rows });
      }
    }
  );
}

function createOrder(body, res) {
  bdy = body;
  db.run(
    `INSERT INTO orders (product_ids,total_price,name,email,phone,address) VALUES ('${bdy.ids}', ${bdy.total}, '${bdy.name}','${bdy.email}','${bdy.phone}','${bdy.address}')`,
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
      } else {
      }
    }
  );
}
module.exports = { shops, productsInShop, createOrder };
