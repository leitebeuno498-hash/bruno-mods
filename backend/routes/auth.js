const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

// REGISTRO
router.post("/register", async (req, res) => {

  try {

    const { username, password } = req.body;

    const userExiste = await User.findOne({
      username
    });

    if (userExiste) {

      return res.status(400).json({
        message: "Usuário já existe"
      });

    }

    const senhaHash = await bcrypt.hash(password, 10);

    const novoUser = new User({
      username,
      password: senhaHash,
      admin: false
    });

    await novoUser.save();

    res.json({
      message: "Conta criada"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    const user = await User.findOne({
      username
    });

    if (!user) {

      return res.status(400).json({
        message: "Usuário não encontrado"
      });

    }

    const senhaCorreta = await bcrypt.compare(
      password,
      user.password
    );

    if (!senhaCorreta) {

      return res.status(400).json({
        message: "Senha incorreta"
      });

    }

    const token = jwt.sign({

      id: user._id,
      admin: user.admin

    },
    "BRUNO_MODS_SECRET",
    {
      expiresIn: "7d"
    });

    res.json({

      token,

      user: {
        username: user.username,
        admin: user.admin
      }

    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;
