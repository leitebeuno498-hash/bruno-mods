const express = require("express");
const router = express.Router();

const multer = require("multer");

const Mod = require("../models/Mod");

const auth = require("../middleware/auth");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    cb(null, Date.now() + file.originalname);

  },

});

const upload = multer({ storage });

/* =========================
   CRIAR MOD
========================= */

router.post(
  "/create",
  auth,
  upload.single("imagem"),

  async (req, res) => {

    try {

      const {
        nome,
        preco,
        descricao
      } = req.body;

      const novoMod = await Mod.create({

        nome,
        preco,
        descricao,

        imagem: req.file
          ? req.file.filename
          : null,

      });

      res.json(novoMod);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Erro ao criar mod"
      });

    }

  }

);

/* =========================
   LISTAR MODS
========================= */

router.get("/", async (req, res) => {

  try {

    const mods = await Mod.find();

    res.json(mods);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Erro ao buscar mods"
    });

  }

});

/* =========================
   DELETAR MOD
========================= */

router.delete(
  "/:id",
  auth,

  async (req, res) => {

    try {

      await Mod.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Mod deletado"
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Erro ao deletar mod"
      });

    }

  }

);

module.exports = router;