import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useAuth } from "../contexts/AuthContext";

const containerStyle = { width: "100%", height: "100vh" };
const center = { lat: -28.452, lng: -52.200 };

export function Map() {
  const [clickedPosition, setClickedPosition] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    logradouro: "",
    numero: "",
    bairro: "",
    complemento: "",
    cep: "",
    cidade: "",
    estado: "",
  });
  const [properties, setProperties] = useState([]);

  const { token } = useAuth()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("http://localhost:8080/ws/imovel");
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!clickedPosition) return;

    const dataToSend = {
      ...formData,
      point: {
        latitude: clickedPosition.lat,
        longitude: clickedPosition.lng,
      }

    };

    try {
      const res = await fetch("http://localhost:8080/ws/imovel", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        const created = await res.json();
        setProperties((prev) => [...prev, created]);
        setClickedPosition(null);
        setFormData({
          nome: "",
          logradouro: "",
          numero: "",
          bairro: "",
          complemento: "",
          cep: "",
          cidade: "",
          estado: "",
        });
      } else {
        alert("Erro ao criar imóvel");
      }
    } catch {
      alert("Erro ao criar imóvel");
    }
  }

  return (
    <>
      <Navbar titulo="Imóveis" />

      <div className="w-full h-screen relative">
        {isLoaded && (
          <>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
              onClick={(e) =>
                setClickedPosition({
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                })
              }
            >
              {properties.map((p) => (
                <Marker
                  key={p.id}
                  position={{
                    lat: Number(p.latitude),
                    lng: Number(p.longitude),
                  }}
                />
              ))}

              {clickedPosition && <Marker position={clickedPosition} />}
            </GoogleMap>

            {clickedPosition && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="w-[420px] max-h-[85vh] bg-black/70 text-white p-6 rounded-2xl shadow-xl overflow-y-auto animate-fadeIn">

                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Novo Imóvel</h2>
                    <button
                      className="text-3xl leading-none hover:text-red-300"
                      onClick={() => setClickedPosition(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Nome"
                      className="p-3 rounded-lg bg-white/20 placeholder-gray-300"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      required
                    />

                    <input
                      type="text"
                      placeholder="Logradouro"
                      className="p-3 rounded-lg bg-white/20 placeholder-gray-300"
                      value={formData.logradouro}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          logradouro: e.target.value,
                        })
                      }
                      required
                    />

                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Número"
                        className="p-3 rounded-lg bg-white/20 placeholder-gray-300 w-full"
                        value={formData.numero}
                        onChange={(e) =>
                          setFormData({ ...formData, numero: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Bairro"
                        className="p-3 rounded-lg bg-white/20 placeholder-gray-300 w-full"
                        value={formData.bairro}
                        onChange={(e) =>
                          setFormData({ ...formData, bairro: e.target.value })
                        }
                        required
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Complemento"
                      className="p-3 rounded-lg bg-white/20 placeholder-gray-300"
                      value={formData.complemento}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          complemento: e.target.value,
                        })
                      }
                    />

                    <input
                      type="text"
                      placeholder="CEP"
                      className="p-3 rounded-lg bg-white/20 placeholder-gray-300"
                      value={formData.cep}
                      onChange={(e) =>
                        setFormData({ ...formData, cep: e.target.value })
                      }
                      required
                    />

                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Cidade"
                        className="p-3 rounded-lg bg-white/20 placeholder-gray-300 w-full"
                        value={formData.cidade}
                        onChange={(e) =>
                          setFormData({ ...formData, cidade: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Estado"
                        className="p-3 rounded-lg bg-white/20 placeholder-gray-300 w-full"
                        value={formData.estado}
                        onChange={(e) =>
                          setFormData({ ...formData, estado: e.target.value })
                        }
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg text-white font-medium"
                    >
                      Criar imóvel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
