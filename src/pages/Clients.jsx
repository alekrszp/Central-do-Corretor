import { useState, useEffect } from "react";
import { CreateModal, Navbar } from "../components";
import { useNavigate } from "react-router-dom";

export function Clients() {
    const [open, setOpen] = useState(false);
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            getClients(token);
        } else {
            console.warn("Token não encontrado!");
        }
    }, []);

    function getClients(token) {
        const api = getApi('ws/clientes');

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
            setClients(data);
        })
    }


    function getApi(path) {
        return `https://civic-sarajane-pedroscheurer-fd914fc3.koyeb.app/${path}`;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dados = Object.fromEntries(formData.entries());

        const api = getApi('ws/clientes');
        const token = sessionStorage.getItem("token");

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(dados),         
        })
        .then(res => res.json())
        .then(data => {
            console.log('Cliente criado:', data);

            setClients(prev => [...prev, data]);

            setOpen(false);

            e.target.reset();
        })
        .catch(err => {
            console.error('Erro ao enviar os dados:', err);
        });
    }

    function showClient(nome) {
        navigate(`/client?nome=${nome}`);
    }

    return (
        <>
            <Navbar titulo="Clientes" />
            <main class="w-full flex flex-col gap-6 px-6 pt-28 pb-4">
                <div class="flex flex-col gap-12">
                    <div class="w-full flex justify-end">
                        <button onClick={() => setOpen(true)} type="button" class="bg-linear-to-r from-[#FBBC63] to-[#EFAB4B] py-1.5 px-7 rounded-full text-white font-semibold">
                            + Novo Cliente
                        </button>
                    </div>
                    <div class="flex flex-col bg-linear-to-r from-[#FFFFFF] to-[#FEFEFE] rounded-2xl px-4 pt-4 pb-6 max-h-64 overflow-y-auto text-neutral-900">
                        {clients.length > 0 ? (
                            clients.map((item) => (
                                <div class="flex flex-row justify-between items-center border-b py-2">
                                    <div class="flex flex-row gap-3 items-center">
                                        <img class="w-16 rounded-full" src="user-image.png" /> 
                                        <div class="flex flex-col">
                                            <h3 class="font-semibold text-neutral-700">{item.nome}</h3>
                                            <p class="text-sm">{item.cpf}</p>

                                        </div>
                                    </div>                           
                                    <button onClick={() => showClient(item.nome)} class="text-lg font-medium text-neutral-900! no-underline!">+</button>
                                </div>
                            ))
                        ) : (
                            <option disabled>Carregando Clientes...</option>
                        )}
                    </div>
                </div>
            </main>
            <CreateModal open={open} onClose={() => setOpen(false)} containerClass="mt-260">
                <div class="flex flex-col gap-2 items-center">
                    <h1 class="text-3xl text-white font-semibold">Novo Cliente</h1>
                    <form onSubmit={handleSubmit} class="w-full flex flex-col gap-3">
                        <div class="flex flex-col gap-1 w-full">
                            <label for="nome" class="text-white">Nome</label>
                            <input type="text" id="nome" name="nome" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o nome do cliente"/>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="sobrenome" class="text-white">Sobrenome</label>
                            <input type="text" id="sobrenome" name="sobrenome" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o sobrenome do cliente"/>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="cpf" class="text-white">CPF</label>
                            <input type="text" id="cpf" name="cpf" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o CPF do cliente" maxLength={11}/>
                        </div>
                        <div class="flex flex-row gap-3 w-full">
                            <div class="flex flex-col gap-1 w-full">
                                <label for="rg" class="text-white">RG</label>
                                <input id="rg" name="rg" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Nº da identidade"/>
                            </div>
                            <div class="flex flex-col gap-1 w-full">
                                <label for="orgEmissor" class="text-white">Orgão Emissor</label>
                                <input id="orgEmissor" name="orgEmissor" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Org. Emissor"/>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="uf" class="text-white">UF</label>
                            <input id="uf" name="uf" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Unidade Federal"/>
                        </div>
                        <h1 class="text-3xl text-white font-semibold pt-4 pb-1">Endereço</h1>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="logradouro" class="text-white">Logradouro</label>
                            <input type="text" id="logradouro" name="logradouro" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o logradouro"/>
                        </div>
                        <div class="flex flex-row gap-3 w-full">
                            <div class="flex flex-col gap-1 w-full">
                                <label for="numero" class="text-white">Número</label>
                                <input id="numero" name="numero" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Nº do imóvel"/>
                            </div>
                            <div class="flex flex-col gap-1 w-full">
                                <label for="bairro" class="text-white">Bairro</label>
                                <input id="bairro" name="bairro" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Digite o bairro"/>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="complemento" class="text-white">Complemento</label>
                            <input type="text" id="complemento" name="complemento" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o complemento"/>
                        </div>
                        <div class="flex flex-row gap-3 w-full">
                            <div class="flex flex-col gap-1 w-full">
                                <label for="cep" class="text-white">CEP</label>
                                <input id="cep" name="cep" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Digite o CEP" minLength={8} maxLength={8}/>
                            </div>
                            <div class="flex flex-col gap-1 w-full">
                                <label for="cidade" class="text-white">Cidade</label>
                                <input id="cidade" name="cidade" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Digite a cidade"/>
                            </div>
                        </div>   
                        <div class="flex flex-col gap-1 w-full">
                            <label for="estado" class="text-white">Estado</label>
                            <input type="text" id="estado" name="estado" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o estado"/>
                        </div>          
                        <h1 class="text-3xl text-white font-semibold pt-4 pb-1">Contato</h1>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="email" class="text-white">E-mail</label>
                            <input type="text" id="email" name="email" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o email do cliente"/>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="telefone1" class="text-white">Telefone</label>
                            <input type="text" id="telefone1" name="telefone1" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o telefone do cliente"/>
                        </div> 
                        <div class="flex flex-col gap-1 w-full">
                            <label for="telefone2" class="text-white">Celular</label>
                            <input type="text" id="telefone2" name="telefone2" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o celular do cliente"/>
                        </div> 
                        <h1 class="text-3xl text-white font-semibold pt-4 pb-1">Informações Adicionais</h1>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="nacionalidade" class="text-white">Nacionalidade</label>
                            <input type="text" id="nacionalidade" name="nacionalidade" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite a nacionalidade do cliente"/>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                                <label for="sexo" class="text-white">Sexo</label>
                                <select id="sexo" name="sexo" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-3 w-full">
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Não Identificado">Não Identificado</option>
                                </select>
                            </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="observacoes" class="text-white">Observações</label>
                            <textarea type="text" id="observacoes" name="observacoes" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 resize-none" rows="3" placeholder="Digite as observações"/>
                        </div>                      
                        <button type="submit" class="bg-linear-to-br from-[#C77DFF] to-[#CD8BFF] w-fit self-center text-white font-semibold rounded-lg px-4 py-1">Cadastrar</button>
                    </form>
                    
                </div>
            </CreateModal>
        </>
    );
}
