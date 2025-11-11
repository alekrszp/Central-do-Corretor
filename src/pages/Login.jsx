import React, { useState } from "react";
import { Logo, Title, Input, Button } from "../components";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const token = await signIn(email, senha);
      login(token);
      navigate("/map");
    } catch (err) {
      setErro(err.message);
    }
  };
  return (
    <div className="container">
      <Logo/>
      <Title title="Login"/>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" placeholder="Digite seu usuário" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input label="Senha" placeholder="Digite sua senha" type="password" value={senha} onChange={e=>setSenha(e.target.value)} />
        {erro && <p style={{color:"red"}}>{erro}</p>}
        <Button type="submit">Entrar</Button>
      </form>
      <div style={{textAlign:"center",marginTop:"16px",fontSize:"14px"}}>
        <a href="#">Esqueci minha senha</a><br/>
        <span>Não tem uma conta? <Link to="/register">Registre-se agora</Link></span>
      </div>
    </div>
  );
}
