import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./Map.css";

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
      latitude: clickedPosition.lat,
      longitude: clickedPosition.lng,
    };

    try {
      const res = await fetch("http://localhost:8080/ws/imovel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } catch (err) {
      alert("Erro ao criar imóvel");
    }
  }

  return (
    <>
      <Navbar titulo="Imóveis" />

      <div className="map-wrapper">
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
              {/* IMÓVEIS EXISTENTES */}
              {properties.map((p) => (
                <Marker
                  key={p.id}
                  position={{
                    lat: Number(p.latitude),
                    lng: Number(p.longitude),
                  }}
                />
              ))}

              {/* MARCADOR DO CLIQUE */}
              {clickedPosition && (
                <Marker position={clickedPosition} />
              )}
            </GoogleMap>

            {clickedPosition && (
              <div className="modal-overlay">
                <div className="form-container">
                  <div className="form-header">
                    <h2>Novo Imóvel</h2>
                    <button
                      className="close-btn"
                      onClick={() => setClickedPosition(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="form-body">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Logradouro"
                      value={formData.logradouro}
                      onChange={(e) =>
                        setFormData({ ...formData, logradouro: e.target.value })
                      }
                      required
                    />
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Número"
                        value={formData.numero}
                        onChange={(e) =>
                          setFormData({ ...formData, numero: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Bairro"
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
                      value={formData.cep}
                      onChange={(e) =>
                        setFormData({ ...formData, cep: e.target.value })
                      }
                      required
                    />
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Cidade"
                        value={formData.cidade}
                        onChange={(e) =>
                          setFormData({ ...formData, cidade: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Estado"
                        value={formData.estado}
                        onChange={(e) =>
                          setFormData({ ...formData, estado: e.target.value })
                        }
                        required
                      />
                    </div>

                    <button type="submit" className="submit-btn">
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
