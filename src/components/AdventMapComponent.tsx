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

  // Handle client-side mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Check for test date in URL query params
    const testDateParam = searchParams.get('testDate');
    let now: Date;

    if (testDateParam) {
      // Use test date if provided (format: YYYY-MM-DD)
      now = new Date(testDateParam);
      console.log('🧪 Test mode active! Simulating date:', now.toLocaleDateString('cs-CZ'));
    } else {
      // Use current date or provided date
      now = currentDate || new Date();
    }

    // Helper function to check if a location should be revealed
    const isLocationRevealed = (location: AdventLocation): boolean => {
      const revealDate = new Date(location.revealDate);
      return now >= revealDate;
    };

    // Get all locations that should be visible
    const visible = adventLocations.filter(isLocationRevealed);
    console.log('Current date:', now);
    console.log('Total locations:', adventLocations.length);
    console.log('Visible locations:', visible.length);
    console.log('First location reveal date:', adventLocations[0]?.revealDate);
    setVisibleLocations(visible);
  }, [currentDate, searchParams]);

  const handleLocationClick = (locationId: number) => {
    setActiveLocationId(locationId);

    // On touch devices, delay opening drawer to show door animation
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setTimeout(() => {
        setDrawerOpen(true);
      }, 600); // Match the door animation duration
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
        <h1 className={styles.title}>🎄 Berounský adventní kalendář 🎄</h1>
        <p className={styles.infoText}>
          Každý den se od 1. prosince objeví nové místo! Objeveno: {visibleLocations.length} z 24
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
