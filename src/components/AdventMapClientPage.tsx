"use client";

import dynamic from "next/dynamic";

const AdventMapComponent = dynamic(() => import("./AdventMapComponent"), {
  ssr: false,
  loading: () => <p>Načítám adventní mapu...</p>,
});

export default function AdventMapClientPage() {
  return <AdventMapComponent />;
}
