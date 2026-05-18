"use client";

import dynamic from "next/dynamic";

const ForestMapComponent = dynamic(() => import("./ForestMapComponent"), {
  ssr: false,
  loading: () => <p>Načítám mapu...</p>,
});

export default function ForestMapClientPage() {
  return <ForestMapComponent />;
}
