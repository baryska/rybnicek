"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { locations } from '../data/locations'

const MapComponent = () =>  {
  const center: LatLngTuple = [49.964, 14.072];

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: "40rem", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) =>{ 
        const iconUrl = `/${loc.number}.png`;
        const numberedIcon = new L.Icon({
          iconUrl,
          iconSize: [60, 60],
          iconAnchor: [16, 32], // bod kotvení (střed dole)
          popupAnchor: [0, -32]
        });
        return (
        <Marker
          key={loc.number}
          position={loc.position as LatLngTuple}
          icon={numberedIcon} // tady použijeme vlastní ikonu
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      )})}
    </MapContainer>
  );
}

export default MapComponent;
