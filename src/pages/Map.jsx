import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../components"; 
import { Loading } from "../components/Loading"; 
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useAuth } from "../contexts/AuthContext";

const formatBRL = (value) => {
  if (!value) return "R$ 0,00";
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numericValue)) return "R$ N/A";

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

const containerStyle = { width: "100%", height: "100vh" };
const center = { lat: -28.452, lng: -52.200 };

const PIN_PRETO_PATH = "/pino1.png";
const PIN_ROXO_PATH = "/pino2.png";

const initialFormState = { 
  nome: "", 
  logradouro: "", 
  numero: "", 
  bairro: "", 
  complemento: "", 
  cep: "", 
  cidade: "", 
  estado: "",
  valor: "",
  tipo: "Casa",
  area: "",
  banheiros: "",
  quartos: "",
  observacoes: ""
};

export function Map() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null); 
  const [clickedPosition, setClickedPosition] = useState(null);   
  const [isExpanded, setIsExpanded] = useState(false); 
  const [isClosing, setIsClosing] = useState(false); 
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState(initialFormState);
  
  const { token } = useAuth();
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY });

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:8080/ws/imovel", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setProperties(res.data);
      } catch (error) {
        console.error("Erro ao carregar imóveis:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (token) {
        loadData();
    }
  }, [token]);

  const handleTextChange = (e, field) => {
    const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnyChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNumberChange = (e, field) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const closeCard = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProperty(null);
      setIsExpanded(false);
      setIsClosing(false);
    }, 300); 
  };

  const handleCloseForm = () => {
    setClickedPosition(null);
    setFormData(initialFormState);
  };

  const handleMapClick = (e) => {
    if (selectedProperty) {
        closeCard();
    } else {
        setClickedPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() }); 
    }
  };

  const handleMarkerClick = (e, property) => {
    e.domEvent.stopPropagation(); 
    
    if (clickedPosition) {
        handleCloseForm();
    }
    
    if (selectedProperty?.id === property.id) {
        closeCard();
    } else {
        setSelectedProperty(property);
        setIsExpanded(false); 
        setIsClosing(false); 
    }
  };

  const handleSobreClick = () => {
    setIsExpanded(!isExpanded);
  };

  const requestDelete = (id) => {
    setDeleteTargetId(id);
  };

  async function confirmDelete() {
    if (!deleteTargetId) return;
    
    setIsLoading(true);
    try {
        await axios.delete(`http://localhost:8080/ws/imovel/${deleteTargetId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error("Erro ao excluir.");
    } finally {
        setProperties((prev) => prev.filter((p) => p.id !== deleteTargetId));
        setDeleteTargetId(null);
        setIsLoading(false);
        closeCard();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!clickedPosition) return;

    setIsLoading(true);

    const dataToSend = { 
      ...formData, 
      point: { latitude: clickedPosition.lat, longitude: clickedPosition.lng } 
    };

    try {
      const res = await axios.post("http://localhost:8080/ws/imovel", dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const created = res.data;
      setProperties((prev) => [...prev, created]);
      handleCloseForm();

    } catch (error) {
        if (error.response) {
            alert("Erro ao salvar: Verifique os dados e tente novamente.");
        } else if (error.request) {
            const newLocalProperty = {
                id: Date.now(),
                latitude: clickedPosition.lat, 
                longitude: clickedPosition.lng,
                nome: formData.nome,
                logradouro: formData.logradouro,
                numero: formData.numero,
                bairro: formData.bairro,
                quartos: formData.quartos,
                banheiros: formData.banheiros,
                area: formData.area,
                valor: formData.valor,
                descricao: formData.observacoes,
            };

            setProperties((prev) => [...prev, newLocalProperty]);
            handleCloseForm();
        } else {
            alert("Erro inesperado ao tentar salvar.");
        }
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar titulo="Imóveis" />
      {isLoading && <Loading />}
      
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDownFade {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(50px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slideDown {
          animation: slideDownFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <div className="w-full h-screen relative bg-[#121212]">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onClick={handleMapClick}
            options={{
              disableDefaultUI: true, 
              zoomControl: false,
              gestureHandling: "cooperative", 
            }}
          >
            {properties.map((p) => {
              const isSelected = selectedProperty?.id === p.id;
              
              return (
                <Marker
                  key={p.id}
                  position={{ lat: Number(p.latitude), lng: Number(p.longitude) }}
                  onClick={(e) => handleMarkerClick(e, p)}
                  icon={{
                    url: isSelected ? PIN_ROXO_PATH : PIN_PRETO_PATH,
                    scaledSize: new window.google.maps.Size(32, 32), 
                    anchor: new window.google.maps.Point(16, 32),
                  }}
                />
              );
            })}

            {deleteTargetId && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn" onClick={() => setDeleteTargetId(null)}>
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
                                onClick={() => setDeleteTargetId(null)} 
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
            )}

            {selectedProperty && (
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
                          <span className="font-bold text-white text-base">{selectedProperty.quartos || "-"}</span>
                          <span className="text-xs uppercase tracking-wider opacity-70">quartos</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-white text-base">{selectedProperty.banheiros || "-"}</span>
                          <span className="text-xs uppercase tracking-wider opacity-70">banheiros</span>
                        </div>
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
            )}

            {clickedPosition && (
              <>
                <Marker position={clickedPosition} icon={{ url: PIN_PRETO_PATH, scaledSize: new window.google.maps.Size(32, 32), anchor: new window.google.maps.Point(16, 32) }} />
                
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 cursor-default p-4" onClick={handleCloseForm}>
                  
                  <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 text-white p-6 rounded-3xl shadow-2xl overflow-y-auto animate-slideUp max-h-[85vh] no-scrollbar" onClick={(e)=>e.stopPropagation()}>
                    
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
                            onChange={(e) => handleTextChange(e, 'nome')} 
                            required 
                           />
                           <div className="flex gap-3">
                                <input type="text" placeholder="Logradouro" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.logradouro} onChange={(e) => handleTextChange(e, 'logradouro')} required />
                                <input type="text" placeholder="Nº" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-1/4 focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.numero} onChange={(e) => handleNumberChange(e, 'numero')} required />
                           </div>
                           <div className="flex gap-3">
                                <input type="text" placeholder="Bairro" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.bairro} onChange={(e) => handleTextChange(e, 'bairro')} required />
                                <input type="text" placeholder="CEP" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.cep} onChange={(e) => handleNumberChange(e, 'cep')} required />
                           </div>
                           <div className="flex gap-3">
                                <input type="text" placeholder="Cidade" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.cidade} onChange={(e) => handleTextChange(e, 'cidade')} required />
                                <input type="text" placeholder="Estado" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-1/3 focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.estado} onChange={(e) => handleTextChange(e, 'estado')} required />
                           </div>
                           <input type="text" placeholder="Complemento" className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" value={formData.complemento} onChange={(e) => handleTextChange(e, 'complemento')} />
                       </div>

                       <div>
                           <label className="block text-sm font-bold mb-1 ml-1 text-gray-200">Valor</label>
                           <input 
                               type="text" 
                               placeholder="R$ 00,00" 
                               className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full text-lg focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" 
                               value={formData.valor} 
                               onChange={(e) => handleNumberChange(e, 'valor')} 
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
                                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
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
                                   onChange={(e) => handleNumberChange(e, 'area')} 
                               />
                           </div>
                       </div>

                       {formData.tipo !== "Terreno" && (
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
                       )}

                       <div>
                           <label className="block text-sm font-bold mb-1 ml-1 text-gray-200">Observações</label>
                           <textarea 
                               rows="3"
                               placeholder="Digite a observação" 
                               className="p-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 text-white w-full resize-none focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all" 
                               value={formData.observacoes} 
                               onChange={(e) => handleAnyChange(e, 'observacoes')} 
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

                </div>
              </>
            )}

          </GoogleMap>
        )}
      </div>
    </>
  );
}