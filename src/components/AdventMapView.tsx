"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { AdventLocation } from '../data/adventLocations';
import styles from './adventMap.module.css';
import { memo } from 'react';

interface AdventMapViewProps {
  visibleLocations: AdventLocation[];
  onLocationClick: (locationId: number) => void;
}

const AdventMapView = memo(({ visibleLocations, onLocationClick }: AdventMapViewProps) => {
  const center: LatLngTuple = [49.964, 14.072];

  return (
    <MapContainer
      center={center}
      zoom={14}
      className={styles.map}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {visibleLocations.map((loc) => {
        const iconUrl = `/${loc.number}.png`;
        const numberedIcon = new L.Icon({
          iconUrl,
          iconSize: [60, 60],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });
        return (
          <Marker
            key={loc.number}
            position={loc.position as LatLngTuple}
            icon={numberedIcon}
            eventHandlers={{
              click: () => {
                onLocationClick(loc.number);
              }
            }}
          >
            <Popup>{loc.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}, (prevProps, nextProps) => {
  // Only re-render if the number of visible locations changes
  return prevProps.visibleLocations.length === nextProps.visibleLocations.length;
});

AdventMapView.displayName = 'AdventMapView';

export default AdventMapView;
