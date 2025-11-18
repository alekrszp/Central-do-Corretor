import { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Navbar, Loading, DeleteImovel, SelectedImovel, CadastroImovel, ErroModal } from "../components";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../utils/axiosConfig";
import "./map.css"

const containerStyle = { width: "100%", height: "100vh" };

let center = { lat: -30.0325, lng: -51.2065 };
navigator.geolocation.getCurrentPosition(position => {
  center = { lat: position.coords.latitude, lng: position.coords.longitude }
})

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
  descricao: ""
};

export function Map() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState(null)

  const [formData, setFormData] = useState(initialFormState);

  const { token } = useAuth();
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY });

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await api.get("/imovel");
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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (["nome", "logradouro", "bairro", "complemento", "cidade", "estado"].includes(name)) {
      newValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    }

    if (["numero", "cep", "valor", "area"].includes(name)) {
      newValue = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  }, []);

  const closeCard = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProperty(null);
      setIsExpanded(false);
      setIsClosing(false);
    }, 300);
  }, []);

  const handleCloseForm = useCallback(() => {
    setClickedPosition(null);
    setFormData(initialFormState);
  }, []);

  const handleMapClick = useCallback((e) => {
    if (selectedProperty) {
      closeCard();
    } else {
      setClickedPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  }, [selectedProperty, closeCard]);

  const handleMarkerClick = useCallback((e, property) => {
    e.domEvent.stopPropagation();

    if (clickedPosition) handleCloseForm();

    if (selectedProperty?.id === property.id) {
      closeCard();
    } else {
      setSelectedProperty(property);
      setIsExpanded(false);
      setIsClosing(false);
    }
  }, [clickedPosition, selectedProperty, closeCard]);

  const handleSobreClick = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const requestDelete = useCallback((id) => {
    setDeleteTargetId(id);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteTargetId) return;
    setIsLoading(true);

    try {
      await api.delete(`/imovel/${deleteTargetId}`);
      setProperties((prev) => prev.filter((p) => p.id !== deleteTargetId));
    } finally {
      setDeleteTargetId(null);
      setIsLoading(false);
      closeCard();
    }
  }, [deleteTargetId]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!clickedPosition) return;

    setIsLoading(true);

    try {
      const res = await api.post("/imovel", {
        ...formData,
        point: {
          latitude: clickedPosition.lat,
          longitude: clickedPosition.lng,
        },
      });

      setProperties((prev) => [...prev, res.data]);
      handleCloseForm();
    } catch (error) {
      handleCloseForm();
      setErro(error)
    }
    finally {
      setIsLoading(false);
    }
  }, [clickedPosition, formData]);

  return (
    <>
      <Navbar titulo="Imóveis" />
      {isLoading && <Loading />}
      {erro && (
        <ErroModal open={erro} onClose={()=>{setErro(null)}}>
            <h2 className="text-xl font-bold text-red-300 mb-2">Erro</h2>
            <p className="text-white">{erro?.response?.data?.message || erro?.message}</p>
        </ErroModal>)}

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

            {deleteTargetId && <DeleteImovel setDeleteTargetIdNull={() => setDeleteTargetId(null)}
              confirmDelete={confirmDelete} />}

            {selectedProperty && <SelectedImovel isExpanded={isExpanded} isClosing={isClosing} selectedProperty={selectedProperty}
              closeCard={closeCard} handleSobreClick={handleSobreClick} requestDelete={requestDelete} />}

            {clickedPosition && (
              <>
                <Marker position={clickedPosition} icon={{ url: PIN_PRETO_PATH, scaledSize: new window.google.maps.Size(32, 32), anchor: new window.google.maps.Point(16, 32) }} />

                <CadastroImovel handleChange={handleChange} handleSubmit={handleSubmit}
                  handleCloseForm={handleCloseForm}
                  formData={formData} setFormData={setFormData} />

              </>
            )}

          </GoogleMap>
        )}
      </div>
    </>
  );
}