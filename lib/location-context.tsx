"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Coords = { lat: number; lng: number };

type LocationCtx = {
  coords: Coords | null;
  address: string | null;
  loading: boolean;
  requestLocation: () => void;
};

const LocationContext = createContext<LocationCtx>({
  coords: null,
  address: null,
  loading: false,
  requestLocation: () => {},
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=vi`,
            { headers: { "User-Agent": "StillGood/1.0" } }
          );
          const data = await res.json();
          const addr =
            data.address?.suburb ||
            data.address?.quarter ||
            data.address?.neighbourhood ||
            data.address?.city_district ||
            data.address?.city ||
            data.display_name?.split(",")[0];
          setAddress(addr ?? null);
        } catch {
          // silently fail on geocoding
        } finally {
          setLoading(false);
        }
      },
      () => setLoading(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  return (
    <LocationContext.Provider value={{ coords, address, loading, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
