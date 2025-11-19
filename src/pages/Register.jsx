import React, { useState } from "react";
import { Title, Input, Button, Loading, PasswordRequirements } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasLength = password.length >= 8; 
    return hasUpper && hasLower && hasNumber && hasLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!isPasswordValid(senha)) {
      setErro("Sua senha não atende aos requisitos mínimos.");
      return;
    }

    try {
      setIsLoading(true);
      await signUp(name, email, senha);
      navigate("/login");
    } catch (err) {
      setErro(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="container">
        <Title title="Registro" />
        
        <form onSubmit={handleSubmit}>
          <Input 
            label="Nome" 
            placeholder="Digite seu nome" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
          
          <Input 
            label="Email" 
            placeholder="Digite seu email" 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          
          <Input 
            label="Senha" 
            placeholder="Digite sua senha" 
            type="password" 
            value={senha} 
            onChange={e => {
                setSenha(e.target.value);
                if (erro) setErro(""); 
            }} 
          />

          <PasswordRequirements password={senha} />

          {erro && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mt-2 mb-6 animate-slideUp">
                <p className="text-red-300 text-sm text-center font-bold">{erro}</p>
            </div>
          )}
          
          <Button type="submit">Cadastrar</Button>
        </form>
        <div className="text-center mt-6 text-sm text-black">
          <span>Já tem conta? 
            <Link to="/" className="text-[#7B61FF] hover:text-[#A391FF] font-bold ml-1.5 transition-colors decoration-transparent hover:underline">
              Faça login
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}