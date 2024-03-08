const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/example.db");

const schemaQueries = [
  `CREATE TABLE IF NOT EXISTS shops (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    )`,
  `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL
    )`,
  `CREATE TABLE IF NOT EXISTS shop_products (
        id_shop INTEGER,
        id_product INTEGER,
        FOREIGN KEY (id_shop) REFERENCES shops(id),
        FOREIGN KEY (id_product) REFERENCES products(id),
        PRIMARY KEY (id_shop, id_product)
    )`,
  `CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    product_ids TEXT NOT NULL,
    total_price REAL NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL
);`,
];

// Create the tables based on the schema
db.serialize(() => {
  schemaQueries.forEach((query) => {
    db.run(query, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Table created successfully");
      }
    });
  });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insertShops() {
  const shops = ["Doctor-bocktor", "AnginLESS", "Bobus", "Amogus"];
  const insertShopQuery = "INSERT INTO shops (name) VALUES (?)";

  shops.forEach((shopName) => {
    db.run(insertShopQuery, [shopName], (err) => {
      if (err) {
        console.error("Error inserting shop:", err.message);
      } else {
        console.log("Shop inserted successfully:", shopName);
      }
    });
  });
}

function insertProducts() {
  const latinDrugNames = [
    "Acetaminophenum",
    "Amoxicillinum",
    "Aspirinum",
    "Atorvastatinum",
    "Azithromycinum",
    "Ciprofloxacini",
    "Clarithromycinum",
    "Clopidogrelum",
    "Codeinum",
    "Dexamethasonum",
    "Diazepamum",
    "Digoxinum",
    "Diphenhydraminum",
    "Doxycyclinum",
    "Enalaprilum",
    "Escitalopramum",
    "Furosemidum",
    "Hydrochlorothiazidum",
    "Ibuprofenum",
    "Levofloxacinum",
    "Lisinoprilum",
    "Lorazepamum",
    "Losartanum",
    "Metforminum",
    "Metoprololum",
    "Mirtazapinum",
    "Montelukastum",
    "Naproxenum",
    "Omeprazolum",
    "Paracetamolum",
    "Pantoprazolum",
    "Prednisonum",
    "Pravastatinum",
    "Pregabalinum",
    "Propranololum",
    "Quetiapinum",
    "Ramiprilum",
    "Ranitidinum",
    "Rosuvastatinum",
    "Sertralinum",
    "Simvastatinum",
    "Tramadolium",
    "Valsartanum",
    "Venlafaxinum",
    "Warfarinum",
    "Amlodipinum",
    "Atropinum",
    "Beclometasonum",
    "Betamethasonum",
    "Budesonidum",
    "Bupropionum",
    "Carvedilolum",
    "Cetirizineum",
    "Chloramphenicol",
    "Cimetidinum",
    "Citalopramum",
    "Dextromethorphani",
    "Doxazosinum",
    "Ergometrinum",
    "Erythromycinum",
    "Estrogenum",
    "Famotidinum",
    "Fluconazolum",
    "Fluticasonum",
    "Gabapentinum",
    "Gemfibrozilum",
    "Glipizidum",
    "Glyburidum",
    "Haloperidolum",
    "Hydralazinum",
    "Hydroxyzinum",
    "Imipraminum",
    "Indomethacinum",
    "Ipratropium",
    "Irbesartanum",
    "Isosorbide",
    "Ketotifenum",
    "Lamotrigineum",
    "Lansoprazolum",
    "Loperamidum",
    "Meloxicamum",
    "Memantinum",
    "Methyldopa",
    "Miconazolum",
    "Midazolamum",
    "Minocyclinum",
    "Mometasonum",
    "Nifedipinum",
    "Nitroglycerinum",
    "Nortriptylinum",
    "Ofloxacinum",
    "Olanzapinum",
    "Oxycodone",
    "Paroxetinum",
    "Phenobarbitalum",
    "Phenytoinum",
    "Pioglitazonum",
    "Piroxicamum",
    "Risperidonum",
    "Sildenafilum",
  ];

  const insertProductQuery = "INSERT INTO products (name, price) VALUES (?, ?)";

  for (let i = 0; i < 100; i++) {
    const productName = latinDrugNames[i];
    const price = getRandomInt(21, 170);
    db.run(insertProductQuery, [productName, price], (err) => {
      if (err) {
        console.error("Error inserting product:", err.message);
      } else {
        console.log("Product inserted successfully:", productName);
      }
    });
  }
}

function insertShopProducts() {
  const insertShopProductQuery =
    "INSERT INTO shop_products (id_shop, id_product) VALUES (?, ?)";

  const shopProductMap = new Map();

  db.each(
    "SELECT id FROM shops",
    (err, row) => {
      if (err) {
        console.error("Error selecting shop ID:", err.message);
      } else {
        const shopId = row.id;
        const numProducts = getRandomInt(4, 10);
        const productIds = [];

        for (let i = 0; i < numProducts; i++) {
          const productId = getRandomInt(1, 70); // Assuming product IDs start from 1
          productIds.push(productId);
        }

        shopProductMap.set(shopId, productIds);
      }
    },
    () => {
      // Insert shop_products
      shopProductMap.forEach((productIds, shopId) => {
        productIds.forEach((productId) => {
          db.run(insertShopProductQuery, [shopId, productId], (err) => {
            if (err) {
              console.error("Error inserting shop_product:", err.message);
            } else {
              console.log(
                "Shop_product inserted successfully:",
                shopId,
                productId
              );
            }
          });
        });
      });
    }
  );
}

db.serialize(() => {
  insertShops();
  insertProducts();
  insertShopProducts();
});
