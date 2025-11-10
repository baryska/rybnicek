"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { adventLocations, AdventLocation } from '../data/adventLocations';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AdventLocationDrawer from "./AdventLocationDrawer";
import styles from './adventMap.module.css';

interface AdventMapComponentProps {
  currentDate?: Date;
}

const AdventMapComponent = ({ currentDate }: AdventMapComponentProps) => {
  const [activeLocationId, setActiveLocationId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visibleLocations, setVisibleLocations] = useState<AdventLocation[]>([]);
  const [shuffledLocations, setShuffledLocations] = useState<AdventLocation[]>([]);
  const searchParams = useSearchParams();

  const activeLocation: AdventLocation | undefined = adventLocations.find((loc) => loc.number === activeLocationId);

  // Shuffle locations once on mount
  useEffect(() => {
    const shuffled = [...adventLocations].sort(() => Math.random() - 0.5);
    setShuffledLocations(shuffled);
  }, []);

  useEffect(() => {
    setMounted(true);

    const testDateParam = searchParams.get('testDate');
    let now: Date;

    if (testDateParam) {
      now = new Date(testDateParam);
      console.log('🧪 Test mode active! Simulating date:', now.toLocaleDateString('cs-CZ'));
    } else {
      now = currentDate || new Date();
    }

    const isLocationRevealed = (location: AdventLocation): boolean => {
      const revealDate = new Date(location.revealDate);
      return now >= revealDate;
    };

    const visible = adventLocations.filter(isLocationRevealed);
    setVisibleLocations(visible);
  }, [currentDate, searchParams]);

  const handleLocationClick = (locationId: number) => {
    setActiveLocationId(locationId);

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setTimeout(() => {
        setDrawerOpen(true);
      }, 600);
    } else {
      setDrawerOpen(true);
    }
  };

  if (!mounted) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Načítám adventní mapu...</div>;
  }

  const testDateParam = searchParams.get('testDate');
  const center: LatLngTuple = [49.964, 14.072];

  return (
    <>
      {testDateParam && (
        <div style={{
          background: '#c58160',
          color: 'white',
          padding: '0.5rem 1rem',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>
          🧪 TESTOVACÍ REŽIM: Simulované datum {new Date(testDateParam).toLocaleDateString('cs-CZ')}
        </div>
      )}
      <div style={{ position: 'relative' }}>
        <MapContainer
          center={center}
          zoom={14}
          className={styles.map}
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
                    handleLocationClick(loc.number);
                  }
                }}
              >
                <Popup>{loc.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <AdventLocationDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        location={activeLocation}
      />
      <div className={styles.info}>
        <h1 className={styles.title}>Berounský adventní kalendář</h1>
        <p className={styles.infoText}>
          Každý den od 1. prosince se objeví nové místo!
        </p>

        <div className={styles.adventCalendar}>
          {shuffledLocations.map((loc) => {
            const isRevealed = visibleLocations.some(v => v.number === loc.number);

            return (
              <div
                key={loc.number}
                className={`${styles.window} ${isRevealed ? styles.windowOpen : styles.windowClosed}`}
                onClick={() => isRevealed && handleLocationClick(loc.number)}
              >
                <div className={styles.windowDoorLeft}></div>
                <div className={styles.windowDoorRight}></div>
                <div className={styles.windowNumber}>{loc.number}</div>
                {!isRevealed && <div className={styles.windowLock}>🔒</div>}
                {isRevealed && (
                  <div className={styles.windowContent}>
                    <div className={styles.windowIcon}>{loc.icon}</div>
                    <h4 className={styles.windowTitle}>{loc.name}</h4>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdventMapComponent;
