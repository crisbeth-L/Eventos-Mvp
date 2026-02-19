import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setLogado }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailsPermitidos = ["Crisbeth@gmail.com"];

    if (emailsPermitidos.includes(email) && senha === "123456") {
      setLogado(true);
      navigate("/home");
    } else {
      alert("Email ou senha inválidos!");
    }
  };

  return (
    <div className="login-wrapper">
      

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;