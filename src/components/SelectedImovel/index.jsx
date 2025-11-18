import { formatBRL } from "../../utils"

export function SelectedImovel({ isExpanded, isClosing, selectedProperty, 
    closeCard, handleSobreClick, requestDelete }) {
    return (
        <div className={`absolute bottom-6 left-0 right-0 flex justify-center z-40 px-4 ${isClosing ? 'animate-slideDown' : 'animate-slideUp'}`}>
            <div
                className={`
                        bg-black/50 backdrop-blur-md 
                        border border-white/10
                        w-full max-w-md 
                        rounded-3xl shadow-2xl 
                        flex flex-col relative 
                        overflow-hidden
                        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                        p-6
                        ${isExpanded ? 'max-h-[600px]' : 'max-h-[220px]'} 
                      `}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-6 left-6 text-red-400 hover:text-red-300 z-20 transition-colors p-1 hover:bg-red-400/10 rounded-full"
                    onClick={() => requestDelete(selectedProperty.id)}
                    title="Excluir Imóvel"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>

                <button
                    className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl leading-none z-20 transition-colors"
                    onClick={closeCard}
                >
                    ✕
                </button>

                <div className="pr-8 pl-8 shrink-0 text-center">
                    <h2 className="text-xl font-bold text-white mb-1">
                        {selectedProperty.nome}
                    </h2>
                    <p className="text-gray-300 text-sm font-medium mb-2">
                        {selectedProperty.bairro}, {selectedProperty.numero}
                    </p>
                    <p className="text-[#6A4BFF] text-2xl font-extrabold mb-3">
                        {formatBRL(selectedProperty.valor)}
                    </p>
                </div>

                <div
                    className={`
                          overflow-hidden transition-all duration-500 ease-in-out
                          ${isExpanded ? 'max-h-[400px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}
                        `}
                >
                    <div className="flex items-center justify-between text-gray-300 text-sm mb-5 border-b border-white/10 pb-4">
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-white text-base">
                                {selectedProperty.area ? `${selectedProperty.area} m²` : "-"}
                            </span>
                            <span className="text-xs uppercase tracking-wider opacity-70">área</span>
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-[200px] custom-scrollbar pr-2 text-left">
                        <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line pb-2">
                            {selectedProperty.descricao || "Sem descrição disponível."}
                        </p>
                    </div>
                </div>

                <div className="mt-auto pt-5 shrink-0 text-center">
                    <button
                        className="bg-[#7B61FF] hover:bg-[#6A4BFF] text-white text-sm font-bold py-2.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-[#7B61FF]/30 w-auto inline-block"
                        onClick={handleSobreClick}
                    >
                        {isExpanded ? "Minimizar" : "Sobre"}
                    </button>
                </div>

            </div>
        </div>
    )
}