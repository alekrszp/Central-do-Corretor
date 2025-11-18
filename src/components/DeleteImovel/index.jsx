export function DeleteImovel({setDeleteTargetIdNull, confirmDelete}) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn" onClick={setDeleteTargetIdNull}>
            <div
                className="bg-[#1E1E1E] border border-white/10 p-6 rounded-3xl shadow-2xl w-full max-w-sm text-center transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Excluir Imóvel?</h3>
                <p className="text-gray-300 mb-6 text-sm">
                    Tem certeza que deseja excluir este imóvel? Essa ação não poderá ser desfeita.
                </p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={setDeleteTargetIdNull}
                        className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="flex-1 py-3 rounded-xl bg-red-500/80 text-white font-semibold hover:bg-red-500 transition-colors shadow-lg shadow-red-500/20"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}
