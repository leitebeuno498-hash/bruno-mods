const licenseRoutes =
require("./routes/license");

app.use(
  "/api/license",
  licenseRoutes
);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const modRoutes = require("./routes/mods");
const licenseRoutes = require("./routes/license");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/mods", modRoutes);
app.use("/api/license", licenseRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB conectado");

})
.catch((err) => {

  console.log(err);

});

app.listen(3001, () => {

  console.log("Servidor rodando na porta 3001");

});