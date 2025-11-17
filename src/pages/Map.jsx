import { useState } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import "./Map.css";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

let center = { lat: -28.452, lng: -52.200 };

export function Map() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const properties = [
    {
      id: 1,
      name: "Edifício Plex",
      address: "Rua João Navário Astolfo, 957",
      rooms: 3,
      bathrooms: 2,
      area: "84m²",
      description:
        "O Edifício Plex é um moderno complexo residencial composto por duas torres.",
      image: "/imoveis/plex.jpg",
      position: { lat: -28.4508, lng: -52.2002 },
    },
    {
      id: 2,
      name: "Residencial Aurora",
      address: "Av. Central, 1200",
      rooms: 2,
      bathrooms: 1,
      area: "69m²",
      description:
        "O Residencial Aurora oferece conforto e praticidade em uma região excelente.",
      image: "/imoveis/aurora.jpg",
      position: { lat: -28.4521, lng: -52.201 },
    },
  ];

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
            >
              {properties.map((property) => (
                <Marker
                  key={property.id}
                  position={property.position}
                  onClick={() => setSelectedMarker(property)}
                />
              ))}
            </GoogleMap>

            {selectedMarker && (
              <PropertyCard
                marker={selectedMarker}
                onClose={() => setSelectedMarker(null)}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}





