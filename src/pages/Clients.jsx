import { useState } from "react";
import { CreateModal, Navbar } from "../components";

export function Clients() {
    const [open, setOpen] = useState(false);

    let numeroParcelas = [];

    const parcelas = 72;
    
    for (let i = 1; i <= parcelas; i++ ) {
        numeroParcelas.push(<option key={i} value={i}>{i}x</option>);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <Navbar titulo="Clientes" />
            <main class="w-full flex flex-col gap-6 px-6 pt-28 pb-4">
                <div class="flex flex-col gap-12">
                    <div class="w-full flex justify-end">
                        <button onClick={() => setOpen(true)} type="button" class="bg-linear-to-r from-[#FBBC63] to-[#EFAB4B] py-1.5 px-7 rounded-full text-white font-semibold">
                            + Nova Venda
                        </button>
                    </div>
                    <div class="flex flex-col bg-linear-to-r from-[#FFFFFF] to-[#FEFEFE] rounded-2xl px-4 pt-4 pb-6 max-h-64 overflow-y-auto text-neutral-900">
                        <div class="flex flex-row justify-between items-center border-b py-2">
                            <div class="flex flex-row gap-3 items-center">
                                <img class="w-16 rounded-full" src="user-image.png" /> 
                                <div class="flex flex-col">
                                    <h3 class="font-semibold text-neutral-700">Nome do Cliente</h3>
                                    <p class="text-sm">000.000.000-00</p>

                                </div>
                            </div>                           
                            <a href="#" class="text-lg font-medium text-neutral-900! no-underline!">+</a>
                        </div>
                        <div class="flex flex-row justify-between items-center border-b py-2">
                            <div class="flex flex-row gap-3 items-center">
                                <img class="w-16 rounded-full" src="user-image.png" /> 
                                <div class="flex flex-col">
                                    <h3 class="font-semibold text-neutral-700">Nome do Cliente</h3>
                                    <p class="text-sm">000.000.000-00</p>

                                </div>
                            </div>                           
                            <a href="#" class="text-lg font-medium text-neutral-900! no-underline!">+</a>
                        </div>
                        <div class="flex flex-row justify-between items-center border-b py-2">
                            <div class="flex flex-row gap-3 items-center">
                                <img class="w-16 rounded-full" src="user-image.png" /> 
                                <div class="flex flex-col">
                                    <h3 class="font-semibold text-neutral-700">Nome do Cliente</h3>
                                    <p class="text-sm">000.000.000-00</p>

                                </div>
                            </div>                           
                            <a href="#" class="text-lg font-medium text-neutral-900! no-underline!">+</a>
                        </div>
                        <div class="flex flex-row justify-between items-center border-b py-2">
                            <div class="flex flex-row gap-3 items-center">
                                <img class="w-16 rounded-full" src="user-image.png" /> 
                                <div class="flex flex-col">
                                    <h3 class="font-semibold text-neutral-700">Nome do Cliente</h3>
                                    <p class="text-sm">000.000.000-00</p>

                                </div>
                            </div>                           
                            <a href="#" class="text-lg font-medium text-neutral-900! no-underline!">+</a>
                        </div>
                    </div>
                </div>
            </main>
            <CreateModal open={open} onClose={() => setOpen(false)} containerClass="mt-260">
                <div class="flex flex-col gap-2 items-center">
                    <h1 class="text-3xl text-white font-semibold">Novo Cliente</h1>
                    <form onSubmit={handleSubmit} class="w-full flex flex-col gap-3">
                        <div class="flex flex-col gap-1 w-full">
                            <label for="cliente" class="text-white">Nome</label>
                            <input type="text" id="cliente" name="cliente" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o nome do cliente"/>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="cliente" class="text-white">CPF</label>
                            <input type="text" id="cliente" name="cliente" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o CPF do cliente"/>
                        </div>
                        <div class="flex flex-row gap-3 w-full">
                            <div class="flex flex-col gap-1 w-full">
                                <label for="entrada" class="text-white">RG</label>
                                <input id="entrada" name="entrada" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Nº da identidade"/>
                            </div>
                            <div class="flex flex-col gap-1 w-full">
                                <label for="comissao" class="text-white">Orgão Emissor/ UF</label>
                                <input id="comissao" name="comissao" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Org. Emissor/ UF"/>
                            </div>
                        </div>
                        <h1 class="text-3xl text-white font-semibold pt-4 pb-1">Endereço</h1>
                        <div class="flex flex-row gap-3 w-full">
                            <div class="flex flex-col gap-1 w-full">
                                <label for="entrada" class="text-white">CEP</label>
                                <input id="entrada" name="entrada" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Digite o CEP"/>
                            </div>
                            <div class="flex flex-col gap-1 w-full">
                                <label for="comissao" class="text-white">Cidade</label>
                                <input id="comissao" name="comissao" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Digite a cidade"/>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="valor" class="text-white">Logradouro</label>
                            <input type="text" id="valor" name="valor" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o logradouro"/>
                        </div>
                        <div class="flex flex-row gap-3 w-full">
                            <div class="flex flex-col gap-1 w-full">
                                <label for="entrada" class="text-white">Número</label>
                                <input id="entrada" name="entrada" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Nº do imóvel"/>
                            </div>
                            <div class="flex flex-col gap-1 w-full">
                                <label for="comissao" class="text-white">Bairro</label>
                                <input id="comissao" name="comissao" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Digite o bairro"/>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="valor" class="text-white">Complemento</label>
                            <input type="text" id="valor" name="valor" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o complemento"/>
                        </div>
                        <h1 class="text-3xl text-white font-semibold pt-4 pb-1">Contato</h1>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="cliente" class="text-white">E-mail</label>
                            <input type="text" id="cliente" name="cliente" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o email do cliente"/>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="cliente" class="text-white">Telefone</label>
                            <input type="text" id="cliente" name="cliente" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o telefone do cliente"/>
                        </div> 
                        <h1 class="text-3xl text-white font-semibold pt-4 pb-1">Informações Adicionais</h1>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="cliente" class="text-white">Nacionalidade</label>
                            <input type="text" id="cliente" name="cliente" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite a nacionalidade do cliente"/>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                                <label for="forma-pagamento" class="text-white">Sexo</label>
                                <select id="forma-pagamento" name="forma-pagamento" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-3 w-full">
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Não Identificado">Não Identificado</option>
                                </select>
                            </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="cliente" class="text-white">Observações</label>
                            <textarea type="text" id="cliente" name="cliente" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 resize-none" rows="3" placeholder="Digite as observações"/>
                        </div>                      
                        <button type="submit" class="bg-gradient-to-br from-[#C77DFF] to-[#CD8BFF] w-fit self-center text-white font-semibold rounded-lg px-4 py-1">Cadastrar</button>
                    </form>
                    
                </div>
            </CreateModal>
        </>
    );
}
