"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { locations } from '../data/locations'
import { useEffect, useState } from "react";
import { Location } from "./LocationDrawer";
import Crossword from "./Crossword";
import LocationDrawer from "./LocationDrawer";
import styles from './locationDrawer.module.css';
import CrosswordSubmitForm from "./CrosswordSubmitForm";

const MapComponent = ({ showCrossword }: { showCrossword: boolean }) => {
  const [activeLocationId, setActiveLocationId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("answers");
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, []);
  const center: LatLngTuple = [49.964, 14.072];

  const activeLocation: Location | undefined = locations.find((loc) => loc.number === activeLocationId);

  const handleAnswerSave = (locationId: number, answer: string) => {
    const newAnswers = { ...answers, [locationId]: answer };
    setAnswers(newAnswers);
    localStorage.setItem("answers", JSON.stringify(newAnswers));
  };

  const handleClear = () => {
    setAnswers({});
    localStorage.removeItem("answers");
  };

  console.log(showCrossword)

  return (
    <>
      <MapContainer
        center={center}
        zoom={14}
        className={styles.map}
        style={showCrossword ? undefined : { height: '100vh' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => {
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
              icon={numberedIcon}
              eventHandlers={{
                click: () => {
                  setActiveLocationId(loc.number)
                  setDrawerOpen(true);
                }
              }}

            >
              <Popup>{loc.name}</Popup>
            </Marker>
          )
        })}
      </MapContainer>
      <LocationDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        location={activeLocation}
        savedAnswer={activeLocation ? answers[activeLocation.number] || "" : ""}
        onAnswerSave={handleAnswerSave}
      />
      {showCrossword && (
        <>
          <Crossword locations={locations} answers={answers} onClear={handleClear} />
          <CrosswordSubmitForm />
        </>
      )}
      <p className={styles.rules}>Pravidla hry ke stažení <a href="/pravidla_sifra.pdf" download style={{textDecoration: 'underline'}}>zde</a>.</p>
    </>
  );
}

export default MapComponent;
