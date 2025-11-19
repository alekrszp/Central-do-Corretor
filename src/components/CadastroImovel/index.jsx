export function CadastroImovel({ handleChange,
    handleSubmit, handleCloseForm, formData, setFormData }) {
    return (<div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 cursor-default p-4" onClick={handleCloseForm}>

        <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 text-white p-6 rounded-3xl shadow-2xl overflow-y-auto animate-slideUp max-h-[85vh] no-scrollbar" onClick={(e) => e.stopPropagation()}>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Novo Imóvel</h2>
                <button className="text-2xl text-gray-400 hover:text-white transition-colors" onClick={handleCloseForm}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="space-y-4 border-b border-white/10 pb-4">
                    <input
                        type="text"
                        placeholder="Nome do Imóvel"
                        className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all"
                        value={formData.nome}
                        name="nome"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    <div className="flex gap-3">
                        <input type="text" placeholder="Logradouro" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.logradouro} name='logradouro' onChange={(e) => handleChange(e)} required />
                        <input type="text" placeholder="Nº" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-1/4 focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.numero} name='numero' onChange={(e) => handleChange(e)} required />
                    </div>
                    <div className="flex gap-3">
                        <input type="text" placeholder="Bairro" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.bairro} name='bairro' onChange={(e) => handleChange(e)} required />
                        <input type="text" placeholder="CEP" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.cep} name='cep' onChange={(e) => handleChange(e)} required />
                    </div>
                    <div className="flex gap-3">
                        <input type="text" placeholder="Cidade" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.cidade} name='cidade' onChange={(e) => handleChange(e)} required />
                        <input type="text" placeholder="Estado" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-1/3 focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.estado} name='estado' onChange={(e) => handleChange(e)} required />
                    </div>
                    <input type="text" placeholder="Complemento" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.complemento} name='complemento' onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1 ml-1 text-gray-200">Valor</label>
                    <input
                        type="text"
                        placeholder="R$ 00,00"
                        className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full text-lg focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all"
                        value={formData.valor}
                        name='valor'
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-bold mb-1 ml-1 text-gray-200">Tipo</label>
                        <div className="relative">
                            <select
                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white w-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all"
                                value={formData.tipo}
                                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                            >
                                <option value="Casa" className="bg-gray-800 text-white">Casa</option>
                                <option value="Apartamento" className="bg-gray-800 text-white">Apartamento</option>
                                <option value="Terreno" className="bg-gray-800 text-white">Terreno</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-bold mb-1 ml-1 text-gray-200">m²</label>
                        <input
                            type="text"
                            placeholder="Digite..."
                            className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all"
                            value={formData.area}
                            name='area'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                {/* {formData.tipo !== "Terreno" && (
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-bold mb-1 ml-1 text-gray-200">Nº banheiros</label>
                            <input
                                type="number"
                                placeholder="Qtd"
                                className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all"
                                value={formData.banheiros}
                                onChange={(e) => handleNumberChange(e, 'banheiros')}
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-bold mb-1 ml-1 text-gray-200">Nº quartos</label>
                            <input
                                type="number"
                                placeholder="Qtd"
                                className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all"
                                value={formData.quartos}
                                onChange={(e) => handleNumberChange(e, 'quartos')}
                            />
                        </div>
                    </div>
                )} */}

                <div>
                    <label className="block text-sm font-bold mb-1 ml-1 text-gray-200">Observações</label>
                    <textarea
                        rows="3"
                        placeholder="Digite a observação"
                        className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full resize-none focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all"
                        value={formData.descricao}
                        name='descricao'
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 w-full bg-[#7B61FF] hover:bg-[#6A4BFF] transition-all p-3.5 rounded-xl text-white font-bold shadow-lg hover:shadow-[#7B61FF]/40"
                >
                    Cadastrar
                </button>
            </form>
        </div>

    </div>)
}