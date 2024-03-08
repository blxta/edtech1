const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
