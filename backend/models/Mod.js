const mongoose = require("mongoose");

const ModSchema = new mongoose.Schema({
  nome: String,
  preco: String,
  descricao: String,
  imagem: String,
});

module.exports = mongoose.model("Mod", ModSchema);