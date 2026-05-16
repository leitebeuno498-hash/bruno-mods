import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import Login from "./Login.jsx";
import Client from "./Client.jsx";

function App() {

  const [logado, setLogado] = useState(false);

  const [mods, setMods] = useState([]);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    const userStorage = localStorage.getItem("user");

    if (token) {
      setLogado(true);
    }

    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }

    buscarMods();

  }, []);

  async function buscarMods() {

    try {

      const res = await axios.get(
        "https://bruno-mods.onrender.com/api/mods"
      );

      setMods(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  async function cadastrarMod() {

    try {

      const formData = new FormData();

      formData.append("nome", nome);
      formData.append("preco", preco);
      formData.append("descricao", descricao);
      formData.append("imagem", imagem);

      await axios.post(
        "https://bruno-mods.onrender.com/api/mods/create",
        formData,
        {
          headers: {
            Authorization:
              localStorage.getItem("token")
          }
        }
      );

      buscarMods();

      setNome("");
      setPreco("");
      setDescricao("");
      setImagem(null);

      alert("Mod criado 🔥");

    } catch (err) {

      console.log(err);

      alert("Erro ao criar mod");

    }

  }

  async function deletarMod(id) {

    try {

      await axios.delete(
        `https://bruno-mods.onrender.com/api/mods/${id}`,
        {
          headers: {
            Authorization:
              localStorage.getItem("token")
          }
        }
      );

      buscarMods();

      alert("Mod deletado 🔥");

    } catch (err) {

      console.log(err);

      alert("Erro ao deletar");

    }

  }

  function sair() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();

  }

  if (!logado) {
    return <Login setLogado={setLogado} />
  }

  // CLIENTE
  if (!user?.admin) {
    return <Client />
  }

  // ADMIN
  return (

    <div className="container">

      <h1>BRUNO MODS ADMIN</h1>

      <h2>
        Bem-vindo, {user?.username}
      </h2>

      <button onClick={sair}>
        SAIR
      </button>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setImagem(e.target.files[0])}
      />

      <button onClick={cadastrarMod}>
        CADASTRAR MOD
      </button>

      <div className="mods">

        {mods.map((mod) => (

          <div className="card" key={mod._id}>

            <img
              src={`https://bruno-mods.onrender.com/uploads/${mod.imagem}`}
              alt=""
              className="mod-img"
            />

            <h2>{mod.nome}</h2>

            <p>R$ {mod.preco}</p>

            <span>{mod.descricao}</span>

            <button
              className="delete-btn"
              onClick={() => deletarMod(mod._id)}
            >
              DELETAR
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default App;