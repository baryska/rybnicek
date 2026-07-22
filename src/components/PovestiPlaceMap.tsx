"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import styles from "./povesti.module.css";

/** Mini-mapa s polohou zastavení — stejné dlaždice jako ostatní hry (CyclOSM). */
const pinIcon = L.divIcon({
  className: styles.placeMarkerIcon,
  html: "📍",
  iconSize: [36, 36],
  iconAnchor: [18, 32],
  popupAnchor: [0, -28],
});

const PovestiPlaceMap = ({
  coords,
  label,
}: {
  coords: [number, number];
  label: string;
}) => (
  <div className={styles.placeMap}>
    <MapContainer
      center={coords as LatLngTuple}
      zoom={17}
      scrollWheelZoom={false}
      className={styles.placeMapInner}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.cyclosm.org/">CyclOSM</a> &copy; OpenStreetMap contributors'
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
        maxZoom={20}
      />
      <Marker position={coords as LatLngTuple} icon={pinIcon}>
        <Popup>{label}</Popup>
      </Marker>
    </MapContainer>
  </div>
);

export default PovestiPlaceMap;
