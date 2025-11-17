"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { adventLocations, AdventLocation } from '../data/adventLocations';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AdventLocationDrawer from "./AdventLocationDrawer";
import AdventSubmitForm from "./AdventSubmitForm";
import Image from "next/image";
import Link from "next/link";
import styles from './adventMap.module.css';
import pageStyles from '../app/advent/style.module.css';

interface AdventMapComponentProps {
  currentDate?: Date;
}

const AdventMapComponent = ({ currentDate }: AdventMapComponentProps) => {
  const [activeLocationId, setActiveLocationId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visibleLocations, setVisibleLocations] = useState<AdventLocation[]>([]);
  const [shuffledLocations, setShuffledLocations] = useState<AdventLocation[]>([]);
  const [clickedLocationId, setClickedLocationId] = useState<number | null>(null);
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
    setClickedLocationId(locationId);

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
          zoom={18}
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
      <h1 className={styles.title} style={{ textAlign: 'center', margin: '3rem auto 1rem' }}>Berounský adventní kalendář</h1>
      <div className={styles.info}>
        <div className={styles.adventCalendar}>
          {shuffledLocations.map((loc) => {
            const isRevealed = visibleLocations.some(v => v.number === loc.number);

            return (
              <div
                key={loc.number}
                className={`${styles.window} ${isRevealed ? styles.windowOpen : styles.windowClosed} ${clickedLocationId === loc.number ? styles.windowClicked : ''}`}
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
        <div style={{ position: 'relative' }}>
          <div className={styles.imageContainer}>
            <Image
              src="/rukavice.png"
              alt="Vánoční rukavice"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className={styles.infoText} style={{ marginTop: '3rem' }}>
          Zveme vás na <strong>procházku adventním Berounem</strong>. Každý den <strong>od 1. do 24. prosince</strong> se ve městě rozsvítí jedno nové okno s adventním číslem. Najděte všechna okna, vyluštěte tajenku a hrajte o ceny!
        </p>
        <p className={styles.infoText}>Každý prosincový den až do Štědrého večera zveřejníme nápovědu, <strong>kde se nové okno nachází</strong>. Vaším úkolem bude místo najít a objevit skrytou nápovědu do tajenky. Některá místa nabídnou i <strong>malé překvapení</strong> – hrnek svařáku, tematickou výstavu, prodej vánočního zboží či speciální prohlídku. </p>
        <p className={styles.infoText}>Pro ty, kteří už mají kalendář plný besídek a vánočních večírků, máme dobrou zprávu - adventní kalendář bude <strong>svítit až do konce prosince</strong>. </p>
        <p className={styles.infoText}>U každého rozsvíceého čísla najdete i <strong>písmeno</strong>. Posbírejte všechna písmena a my na Štědrý den <strong>odhalíme jejich pořadí</strong>, které vám umožní sestavit tajenku.</p>
        </div>
        <AdventSubmitForm />
        <div className={pageStyles.instructionsLinkContainer}>
          <Link href="/advent_info" className={pageStyles.instructionsLink}>
            Instrukce pro účastníky
          </Link>
        </div>
      </div>
      <AdventLocationDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => {
          setDrawerOpen(false);
          setClickedLocationId(null);
        }}
        location={activeLocation}
      />
    </>
  );
}

export default AdventMapComponent;
