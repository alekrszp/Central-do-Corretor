export function Sales() {
    return (
        <>
            <header class="w-full flex justify-between py-[28px] px-6 bg-gradient-to-r from-[#9392FF] to-[#A391FF] shadow-xl">
                <button class="font-semibold text-white text-lg">☰</button>
                <h1 class="font-semibold text-white">Central Do Corretor</h1>
            </header>
            <main class="w-full flex flex-col gap-6 px-6 py-4">
                <p class="w-full bg-gradient-to-r from-[#262626] to-[#353535] text-white text-lg font-semibold rounded-2xl py-3 text-center">
                    Clientes
                </p>
                <div class="flex flex-col gap-12">
                    <div class="w-full flex justify-end">
                        <button type="button" class="bg-gradient-to-r from-[#FBBC63] to-[#EFAB4B] py-1.5 px-7 rounded-full text-white font-medium">
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
        </>
    );
}