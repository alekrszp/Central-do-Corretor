import React, { useState } from "react";
import { Logo, Title, Input, Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";
export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      await signUp(name, email, senha);
      navigate("/login");
    } catch (err) {
      setErro(err.message);
    }
  };
  return (
    <div className="container">
      <Logo/>
      <Title title="Cadastro"/>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" placeholder="Digite seu nome" value={name} onChange={e=>setName(e.target.value)} />
        <Input label="Email" placeholder="Digite seu email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input label="Senha" placeholder="Digite sua senha" type="password" value={senha} onChange={e=>setSenha(e.target.value)} />
        {erro && <p style={{color:"red"}}>{erro}</p>}
        <Button type="submit">Cadastrar</Button>
      </form>
      <div style={{textAlign:"center",marginTop:"16px",fontSize:"14px"}}>
        <span>Já tem conta? <Link to="/login">Faça login</Link></span>
      </div>
    </div>
  );
}
