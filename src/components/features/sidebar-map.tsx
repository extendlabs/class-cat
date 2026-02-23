"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Crosshair, Plus, Minus } from "@phosphor-icons/react";
import "maplibre-gl/dist/maplibre-gl.css";
import { BRAND_ACCENT } from "@/lib/constants";

const ACCENT = BRAND_ACCENT;

interface SidebarMapProps {
  lat: number;
  lng: number;
  address: string;
  interactive?: boolean;
  onCoordinateChange?: (coords: { lat: number; lng: number }) => void;
}

export function SidebarMap({
  lat,
  lng,
  address,
  interactive = false,
  onCoordinateChange,
}: SidebarMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const markerRef = useRef<import("maplibre-gl").Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    import("maplibre-gl").then((maplibregl) => {
      if (cancelled || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
        center: [lng, lat],
        zoom: 14,
        minZoom: 5,
        attributionControl: false,
      });

      map.on("load", () => {
        setMapLoaded(true);

        const el = document.createElement("div");
        el.style.cssText = `
          width:36px;height:36px;
          background:${ACCENT};
          border-radius:50%;
          border:2.5px solid #fff;
          box-shadow:0 4px 14px ${ACCENT}55;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;
        `;
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" style="color:#fff;display:block;"><path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" fill="currentColor"/></svg>`;

        const marker = new maplibregl.Marker({
          element: el,
          anchor: "center",
          draggable: interactive,
        })
          .setLngLat([lng, lat])
          .addTo(map);

        markerRef.current = marker;

        if (interactive) {
          marker.on("dragend", () => {
            const lngLat = marker.getLngLat();
            onCoordinateChange?.({ lat: lngLat.lat, lng: lngLat.lng });
          });

          map.on("click", (e) => {
            marker.setLngLat(e.lngLat);
            onCoordinateChange?.({ lat: e.lngLat.lat, lng: e.lngLat.lng });
          });
        }
      });

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, interactive, onCoordinateChange]);

  return (
    <div className="relative h-52 rounded-[16px] overflow-hidden shadow-[var(--shadow-soft)] border border-gray-200">
      <div ref={containerRef} className="w-full h-full" />
      {!mapLoaded && (
        <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center gap-2 text-gray-400">
          <MapPin size={32} />
          <p className="text-xs font-medium">Map loading...</p>
        </div>
      )}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 z-10">
        <button
          onClick={() => {
            if (navigator.geolocation && mapRef.current) {
              navigator.geolocation.getCurrentPosition((pos) => {
                mapRef.current?.flyTo({
                  center: [pos.coords.longitude, pos.coords.latitude],
                  zoom: 14,
                });
              });
            }
          }}
          className="bg-coral text-white w-8 h-8 rounded-full shadow-sm hover:bg-coral-hover transition-all border-none flex items-center justify-center active:scale-95"
        >
          <Crosshair size={14} weight="bold" />
        </button>
        <div className="bg-white rounded-full shadow-sm flex flex-col overflow-hidden border border-gray-100">
          <button
            onClick={() => mapRef.current?.zoomIn()}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-coral hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <Plus size={14} />
          </button>
          <button
            onClick={() => mapRef.current?.zoomOut()}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-coral hover:bg-gray-50 transition-colors"
          >
            <Minus size={14} />
          </button>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-14 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
        <p className="text-xs font-medium text-gray-900 line-clamp-1 flex items-center gap-1.5">
          <MapPin size={12} weight="fill" className="text-coral flex-shrink-0" />
          {address}
        </p>
      </div>
    </div>
  );
}
