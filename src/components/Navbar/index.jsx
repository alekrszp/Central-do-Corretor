import { useState, useEffect } from "react";
import { NavMenu, OverlayTitle } from "../index";
import { api } from "../../utils/axiosConfig"; // Caminho corrigido (../../)

export function Navbar({ titulo, user, onSelectImovel }) {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavStateClick = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 0) {
        setLoading(true);
        try {
          const { data } = await api.get("/imovel");
          
          const filtered = data.filter((imovel) => {
            const term = query.toLowerCase();
            return (
                (imovel.nome && imovel.nome.toLowerCase().includes(term)) ||
                (imovel.bairro && imovel.bairro.toLowerCase().includes(term)) ||
                (imovel.cidade && imovel.cidade.toLowerCase().includes(term))
            );
          });

          setResults(filtered);
          setShowDropdown(true);
        } catch (error) {
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleItemClick = (imovel) => {
    if (onSelectImovel) {
        onSelectImovel(imovel);
    }
    setShowDropdown(false);
    setQuery(""); 
  };

  return (
    <>
      {isNavMenuOpen && <NavMenu closeNav={handleNavStateClick} />}

      <header className="fixed top-0 left-0 z-50 w-full px-[18px] pt-[30px] pb-[14px] flex flex-col gap-3 text-white bg-gradient-to-b from-[#7B61FF] to-[#A391FF] font-sans box-border shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img src={user?.foto ?? '/icon.png'} alt="avatar" className="w-[38px] h-[38px] rounded-full object-cover shrink-0" />
            <div className="text-[20px] font-bold whitespace-nowrap overflow-hidden text-ellipsis ml-[6px] leading-none max-[420px]:text-[18px]">
              {user?.nome ?? "Josué Bueno"}
            </div>
          </div>

          <button className="text-[26px] bg-transparent border-none text-white p-[6px] leading-none cursor-pointer" onClick={handleNavStateClick}>
            ☰
          </button>
        </div>

        <div className="relative w-full z-50">
            <div className="w-full bg-white/20 rounded-[20px] px-[12px] py-[9px] flex items-center gap-[10px] box-border">
              <img src="/search.png" alt="search" className="opacity-90 shrink-0 w-8! h-6! max-[420px]:w-[22px] max-[420px]:h-[22px]" />

              <input
                type="text"
                placeholder="Pesquisar Imóvel..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.length > 0 && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="bg-transparent border-none outline-none text-white text-[14px] w-full py-[6px] placeholder:text-white/85"
              />

              {loading ? (
                 <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin shrink-0" />
              ) : (
                 <img src="/mic.png" alt="mic" className="w-6! h-6! opacity-90 shrink-0" />
              )}
            </div>

            {showDropdown && results.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-gradient-to-b from-[#7B61FF] to-[#A391FF] rounded-b-[20px] rounded-t-[5px] shadow-xl overflow-hidden z-50 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
                <ul className="max-h-[300px] overflow-y-auto scrollbar-hide">
                  {results.map((imovel) => (
                    <li 
                      key={imovel.id}
                      className="flex items-center gap-3 px-4 py-3 border-b border-white/10 last:border-none hover:bg-white/20 cursor-pointer transition-colors"
                      onClick={() => handleItemClick(imovel)}
                    >
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/40">
                             <img src="/icon.png" alt="icon" className="w-6 h-6 opacity-70" />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-white font-bold text-[14px] leading-tight">
                                {imovel.nome}
                            </span>
                            <span className="text-white/80 text-[12px]">
                                {imovel.cidade || imovel.bairro} - {imovel.tipo}
                            </span>
                        </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {showDropdown && query.length > 0 && results.length === 0 && !loading && (
                 <div className="absolute top-full left-0 w-full mt-1 bg-gradient-to-b from-[#7B61FF] to-[#A391FF] rounded-[15px] p-4 text-white/90 text-center text-sm shadow-xl z-50">
                    Nenhum imóvel encontrado.
                 </div>
            )}
        </div>
      </header>

      <div className="mt-[140px] relative z-40 pointer-events-none">
         <OverlayTitle>{titulo}</OverlayTitle>
      </div>
    </>
  );
}