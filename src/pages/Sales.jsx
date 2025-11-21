import { useState, useRef, useEffect } from "react";
import { CreateModal, Navbar } from "../components";

export function Sales() {
    const [open, setOpen] = useState(false);

    const [imoveis, setImoveis] = useState([]);

    useEffect(() => {

        const token = sessionStorage.getItem("token");

        if (!token) return;

        async function carregarImoveis() {
            try {
                const resposta = await fetch("https://civic-sarajane-pedroscheurer-fd914fc3.koyeb.app/ws/imovel", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const dados = await resposta.json();
                setImoveis(dados);
            } catch (error) {
                console.error("Erro ao buscar imóveis:", error);
            }
        }

        carregarImoveis();
    }, []);
    
    let numeroParcelas = [];

    const parcelas = 72;
    
    for (let i = 1; i <= parcelas; i++ ) {
        numeroParcelas.push(<option key={i} value={i}>{i}x</option>);
    }

    const formRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        const fields = new FormData(formRef.current);
        console.log("Cliente:", fields.get("cliente"));
    }

    return (
        <>
            <Navbar titulo="Vendas" />
            <main class="w-full flex flex-col gap-6 px-6 pt-28 pb-4">
                <div class="flex flex-col gap-12">
                    <div class="w-full flex justify-end">
                        <button onClick={() => setOpen(true)} type="button" class="bg-linear-to-r from-[#FBBC63] to-[#EFAB4B] py-1.5 px-7 rounded-full text-white font-semibold">
                            + Nova Venda
                        </button>
                    </div>
                    <div class="grid grid-cols-3 w-full gap-8">
                        <div class="flex flex-col gap-3 bg-gradient-to-r from-[#C77DFF] to-[#CD8BFF] rounded-3xl px-2 py-3">
                            <h2 class="text-right text-2xl/none text-white font-bold">Qtd.</h2>
                            <div class="flex flex-col gap-3 text-white font-medium text-center">
                                <p class="text-xl/none font-semibold">[nmr]</p>
                                <p class="text-lg/none font-semibold">Vendas</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-3 bg-gradient-to-r from-[#C77DFF] to-[#CD8BFF] rounded-3xl px-2 py-3">
                            <h2 class="text-right text-2xl/none text-white font-bold">R$</h2>
                            <div class="flex flex-col gap-3 text-white font-medium text-center">
                                <p class="text-xl/none font-semibold">[preço]</p>
                                <p class="text-sm/none font-semibold">Faturamento</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-3 bg-gradient-to-r from-[#C77DFF] to-[#CD8BFF] rounded-3xl px-2 py-3">
                            <h2 class="text-right text-2xl/none text-white font-bold">%</h2>
                            <div class="flex flex-col gap-3 text-white font-medium text-center">
                                <p class="text-xl/none font-semibold">[pctg]</p>
                                <p class="text-lg/none font-semibold">Meta</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between px-6 py-2 bg-gradient-to-r from-[#262626] to-[#353535] text-white font-semibold text-sm rounded-full">
                        <p>Imóvel</p>
                        <p>Data Venda</p>
                        <p>Cliente</p>
                        <p>Valor R$</p>
                        <p>Detalhes</p>
                    </div>
                    <div class="flex flex-col bg-gradient-to-r from-[#FFFFFF] to-[#FEFEFE] rounded-2xl px-4 pt-4 pb-6 max-h-64 overflow-y-auto text-neutral-900">
                        <div class="flex flex-row justify-between items-center border-b py-2">
                            <a href="#" class="text-xs font-medium max-w-[100px] text-center text-neutral-900! no-underline!">Edifício Miami Apto. 401</a>
                            <p class="text-xs font-medium">30/10/2025</p>
                            <a href="#" class="text-xs font-medium text-center text-neutral-900! no-underline!">João Nepes</a>
                            <p class="text-xs font-medium">100.000,00</p>
                            <a href="#" class="text-xs font-medium text-neutral-900! no-underline!">+</a>
                        </div>
                    </div>
                </div>
            </main>
            <CreateModal open={open} onClose={() => setOpen(false)} containerClass="mt-46">
                <div class="flex flex-col gap-2 items-center">
                    <h1 class="text-3xl text-white font-semibold">Nova venda</h1>
                    <form ref={formRef} onSubmit={handleSubmit} class="w-full flex flex-col gap-3">
                        <div class="flex flex-col gap-1 w-full">
                            <label for="imovel" class="text-white">Imóvel</label>
                            <select id="imovel" name="imovel" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-3">
                                {imoveis.length > 0 ? (
                                    imoveis.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nome}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Carregando...</option>
                                )}
                            </select>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="cliente" class="text-white">Cliente</label>
                            <input type="text" id="cliente" name="cliente" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o nome do cliente"/>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="valor" class="text-white">Valor</label>
                            <input type="text" id="valor" name="valor" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1" placeholder="Digite o valor"/>
                        </div>
                        <div class="flex flex-row gap-3 w-full">
                            <div class="flex flex-col gap-1 w-full">
                                <label for="parcelas" class="text-white">Nº de Parcelas</label>
                                <select id="parcelas" name="parcelas" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-3 w-full">
                                    {numeroParcelas}
                                </select>
                            </div>
                            <div class="flex flex-col gap-1 w-full">
                                <label for="forma-pagamento" class="text-white">Forma de Pagamento</label>
                                <select id="forma-pagamento" name="forma-pagamento" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-3 w-full">
                                    <option value="À vista">À vista</option>
                                    <option value="Consórcio">Consórcio</option>
                                    <option value="Permuta">Permuta</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex flex-row gap-3 w-full">
                            <div class="flex flex-col gap-1 w-full">
                                <label for="entrada" class="text-white">Entrada</label>
                                <input id="entrada" name="entrada" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Valor de entrada"/>
                            </div>
                            <div class="flex flex-col gap-1 w-full">
                                <label for="comissao" class="text-white">Comissão</label>
                                <input id="comissao" name="comissao" class="text-white focus:ring-0 focus:outline-none bg-neutral-700 rounded-lg px-2 py-1 w-full" placeholder="Valor de comissão"/>
                            </div>
                        </div>
                        <button type="submit" class="bg-gradient-to-br from-[#C77DFF] to-[#CD8BFF] w-fit self-center text-white font-semibold rounded-lg px-4 py-1">Cadastrar</button>
                    </form>
                    
                </div>
            </CreateModal>
        </>
    );
}