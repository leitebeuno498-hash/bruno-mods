import { useEffect, useState } from "react";
import axios from "axios";

function Client() {

  const [licenses, setLicenses] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    buscarLicencas();

  }, []);

  async function buscarLicencas() {

    const res = await axios.get(
      `https://bruno-mods.onrender.com/api/license/${user._id}`
    );

    setLicenses(res.data);

  }

  async function gerarKey() {

    await axios.post(
      `https://bruno-mods.onrender.com/api/license/generate/${user._id}`
    );

    buscarLicencas();

  }

  return (

    <div className="container">

      <h1>ÁREA CLIENTE</h1>

      <h2>
        {user.username}
      </h2>

      <button onClick={gerarKey}>
        GERAR KEY
      </button>

      <div className="mods">

        {licenses.map((license) => (

          <div
            className="card"
            key={license._id}
          >

            <h2>KEY PREMIUM</h2>

            <p>{license.key}</p>

            <span>
              Status:
              {license.ativa
                ? " ATIVA 🔥"
                : " DESATIVADA"}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Client;