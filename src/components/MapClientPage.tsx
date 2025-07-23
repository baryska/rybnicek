"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p>Načítám mapu...</p>,
});

export default function MapClientPage({ showCrossword = true }: { showCrossword: boolean }) {
  return <MapComponent showCrossword={showCrossword} />;
}

