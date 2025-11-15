import "./PropertyCard.css";

export default function PropertyCard({ marker, onClose }) {
  return (
    <div className="property-card">
      <button className="close-btn" onClick={onClose}>✕</button>

      <img src={marker.image} className="property-img" />

      <h2>{marker.name}</h2>
      <p>{marker.address}</p>

      <div className="details">
        <span>{marker.rooms} quartos</span>
        <span>{marker.bathrooms} banheiros</span>
        <span>{marker.area}</span>
      </div>

      <p className="description">{marker.description}</p>
    </div>
  );
}

