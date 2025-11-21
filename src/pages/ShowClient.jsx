import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components";

export function ShowClient() {
    const [client, setClient] = useState(null);
    const location = useLocation();


    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const params = new URLSearchParams(location.search);
        const nome = params.get("nome");
        if (token) {
            getClient(nome, token);
        } else {
            console.warn("Token não encontrado!");
        }
    }, []);

    function getClient(nome, token) {
        const api = getApi(`ws/clientes?nome=${encodeURIComponent(nome)}`);

        fetch(api, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
            return res.json();
        })
        .then(data => {
            setClient(data[0]);
        })
    }

    function getApi(path) {
        return `https://civic-sarajane-pedroscheurer-fd914fc3.koyeb.app/${path}`;
    }

    return (
        <>
            <Navbar titulo="Detalhes do Cliente" />
            <main className="w-full flex flex-col gap-6 px-6 pt-28 pb-4">
                {client ? (
                    <div className="flex flex-col w-full max-w-[500px] m-auto">
                        <div className="flex flex-col gap-2 pb-6 border-b">
                            <h1 className="text-4xl font-semibold">{client.nome} {client.sobrenome}</h1>
                            <p className="text-3xl font-semibold">{client.cpf}</p>
                        </div>
                        <div className="flex flex-row justify-between gap-2 py-12 border-b">
                            <div className="flex flex-col gap-1">
                                <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">Email</h3>
                                <p>{client.email}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">Telefone</h3>
                                <p>{client.telefone1}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 py-12 border-b">
                            <div className="flex flex-row justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                    <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">Logradouro</h3>
                                    <p>{client.logradouro}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">Número</h3>
                                    <p>{client.numero}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">CEP</h3>
                                    <p>{client.cep}</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                    <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">Complemento</h3>
                                    <p>{client.complemento}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">Bairro</h3>
                                    <p>{client.bairro}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 py-12 border-b">
                            <div className="flex flex-row justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                    <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">Sexo</h3>
                                    <p>{client.sexo}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">Nacionalidade</h3>
                                    <p>{client.nacionalidade}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">CEP</h3>
                                    <p>{client.cep}</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                    <h3 className="bg-gradient-to-br from-[#262626] to-[#353535] py-2 px-2 font-semibold text-white rounded-full text-center">Observações</h3>
                                    <p>{client.observacoes}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                ) : (
                    <p>Carregando cliente...</p>
                )}
            </main>
            
        </>
    );
}
