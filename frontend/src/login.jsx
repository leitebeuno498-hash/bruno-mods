import { useState } from "react";
import axios from "axios";

function Login({ setLogado }) {

  const [register, setRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registrar() {

    try {

      await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          username,
          password,
        }
      );

      alert("Conta criada 🔥");

      setRegister(false);

    } catch (err) {

      console.log(err);
      alert("Erro ao criar conta");

    }

  }

  async function fazerLogin() {

    try {

      const res = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setLogado(true);

    } catch (err) {

      console.log(err);
      alert("Login inválido");

    }

  }

  return (

    <div className="container">

      <h1>
        {register ? "CRIAR CONTA" : "LOGIN ADMIN"}
      </h1>

      <input
        placeholder="Usuário"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      {register ? (

        <button onClick={registrar}>
          CRIAR CONTA
        </button>

      ) : (

        <button onClick={fazerLogin}>
          ENTRAR
        </button>

      )}

      <button
        onClick={() => setRegister(!register)}
      >

        {register
          ? "Já tenho conta"
          : "Criar conta"}

      </button>

    </div>

  );

}

export default Login;