"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  MapPin,
  Plus,
  Minus,
  Crosshair,
} from "@phosphor-icons/react";
import type { BrowseActivity } from "@/api/mock-data";
import "maplibre-gl/dist/maplibre-gl.css";
import type {
  Map as MaplibreMap,
  Marker as MaplibreMarker,
  Popup as MaplibrePopup,
  GeoJSONSource,
  MapLayerMouseEvent,
} from "maplibre-gl";
import {
  ALL_CATEGORIES,
  catColor,
  buildActiveMarkerEl,
  createPopupHTML,
  renderIconCanvas,
} from "@/lib/map-helpers";

interface MapViewProps {
  activities: BrowseActivity[];
  activeId?: string;
  onMarkerClick?: (id: string) => void;
}

function buildClusterIconExpr(): unknown[] {
  const expr: unknown[] = ["case"];

  for (const cat of ALL_CATEGORIES) {
    const conditions: unknown[] = ["all"];
    for (const other of ALL_CATEGORIES) {
      if (other === cat) continue;
      conditions.push([">=", ["get", cat], ["get", other]]);
    }
    expr.push(conditions);
    expr.push(`icon-${cat}-promoted`);
  }

  expr.push("icon-default-promoted");
  return expr;
}

function registerCategoryIcons(map: MaplibreMap) {
  const categories = [...ALL_CATEGORIES, "default"];
  const states: Array<"regular" | "promoted"> = ["regular", "promoted"];

  for (const cat of categories) {
    for (const state of states) {
      const name = `icon-${cat}-${state}`;
      if (map.hasImage(name)) continue;
      const canvas = renderIconCanvas(cat, state);
      const ctx = canvas.getContext("2d")!;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      map.addImage(name, imageData, { pixelRatio: 2 });
    }
  }
}

function buildFeatureCollection(activities: BrowseActivity[]): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: "FeatureCollection",
    features: activities.map((a) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [a.lng, a.lat] },
      properties: {
        id: a.id,
        title: a.title,
        image: a.image,
        location: a.location,
        address: a.address,
        distance: a.distance,
        ageRange: a.ageRange,
        rating: a.rating,
        reviewCount: a.reviewCount,
        price: a.price,
        badge: a.badge || "",
        category: a.category,
        lat: a.lat,
        lng: a.lng,
        isPromoted: a.isPromoted ? 1 : 0,
        groupType: a.groupType || "",
      },
    })),
  };
}

function buildClusterColorExpr(): unknown[] {
  const expr: unknown[] = ["case"];

  for (const cat of ALL_CATEGORIES) {
    const conditions: unknown[] = ["all"];
    for (const other of ALL_CATEGORIES) {
      if (other === cat) continue;
      conditions.push([">=", ["get", cat], ["get", other]]);
    }
    expr.push(conditions);
    expr.push(catColor(cat));
  }

  expr.push("#6B7280");
  return expr;
}

function buildClusterSizeExpr(): unknown[] {
  return [
    "step", ["get", "point_count"],
    16,
    10, 18,
    50, 20,
  ];
}

function setupSourceAndLayers(map: MaplibreMap, data: GeoJSON.FeatureCollection<GeoJSON.Point>) {
  const clusterProperties: Record<string, unknown[]> = {};
  for (const cat of ALL_CATEGORIES) {
    clusterProperties[cat] = ["+", ["case", ["==", ["get", "category"], cat], 1, 0]];
  }

  map.addSource("activities", {
    type: "geojson",
    data,
    cluster: true,
    clusterRadius: 45,
    clusterMaxZoom: 14,
    clusterProperties,
  });

  map.addLayer({
    id: "clusters-circle",
    type: "circle",
    source: "activities",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": buildClusterColorExpr() as never,
      "circle-radius": buildClusterSizeExpr() as never,
      "circle-stroke-width": 2.5,
      "circle-stroke-color": "rgba(255,255,255,0.85)",
    },
  });

  map.addLayer({
    id: "clusters-icon",
    type: "symbol",
    source: "activities",
    filter: ["has", "point_count"],
    layout: {
      "icon-image": buildClusterIconExpr() as never,
      "icon-size": 1,
      "icon-allow-overlap": true,
    },
  });

  map.addLayer({
    id: "clusters-count",
    type: "symbol",
    source: "activities",
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-size": 10,
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-allow-overlap": true,
      "text-offset": [0.8, -0.8],
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": buildClusterColorExpr() as never,
      "text-halo-width": 5,
    },
  });

  map.addLayer({
    id: "markers-regular",
    type: "symbol",
    source: "activities",
    filter: [
      "all",
      ["!", ["has", "point_count"]],
      ["==", ["get", "isPromoted"], 0],
    ],
    layout: {
      "icon-image": [
        "coalesce",
        ["image", ["concat", "icon-", ["get", "category"], "-regular"]],
        ["image", "icon-default-regular"],
      ],
      "icon-size": 1,
      "icon-allow-overlap": true,
      "icon-anchor": "center",
    },
  });

  map.addLayer({
    id: "markers-promoted",
    type: "symbol",
    source: "activities",
    filter: [
      "all",
      ["!", ["has", "point_count"]],
      ["==", ["get", "isPromoted"], 1],
    ],
    layout: {
      "icon-image": [
        "coalesce",
        ["image", ["concat", "icon-", ["get", "category"], "-promoted"]],
        ["image", "icon-default-promoted"],
      ],
      "icon-size": 1,
      "icon-allow-overlap": true,
      "icon-anchor": "center",
    },
  });
}

function MapPlaceholder() {
  return (
    <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-3 text-gray-400">
      <MapPin size={48} />
      <p className="text-sm font-medium">Map loading...</p>
    </div>
  );
}

const MARKER_LAYERS = ["markers-regular", "markers-promoted"];

export function MapView({ activities, activeId, onMarkerClick }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MaplibreMap | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const popupRef = useRef<MaplibrePopup | null>(null);
  const activeIdRef = useRef(activeId);
  const onMarkerClickRef = useRef(onMarkerClick);
  const markerClassRef = useRef<typeof MaplibreMarker | null>(null);
  const popupClassRef = useRef<typeof MaplibrePopup | null>(null);
  const sourceReadyRef = useRef(false);
  const activeMarkerRef = useRef<MaplibreMarker | null>(null);

  const featureCollection = useMemo(() => buildFeatureCollection(activities), [activities]);
  const featureCollectionRef = useRef(featureCollection);
  useEffect(() => { featureCollectionRef.current = featureCollection; }, [featureCollection]);

  const activitiesById = useMemo(() => {
    const map = new Map<string, BrowseActivity>();
    for (const a of activities) map.set(a.id, a);
    return map;
  }, [activities]);

  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);
  useEffect(() => { onMarkerClickRef.current = onMarkerClick; }, [onMarkerClick]);

  const initMap = useCallback(async () => {
    if (!mapContainerRef.current) return;

    try {
      const maplibreModule = await import("maplibre-gl");
      const { Map: MapClass, Marker: MarkerCls, Popup: PopupCls } = maplibreModule;
      markerClassRef.current = MarkerCls;
      popupClassRef.current = PopupCls;

      const map = new MapClass({
        container: mapContainerRef.current,
        style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
        center: [19.5, 52.0],
        zoom: 6,
        minZoom: 5,
        attributionControl: false,
      });

      mapRef.current = map;

      map.on("load", () => {
        setMapLoaded(true);

        registerCategoryIcons(map);

        setupSourceAndLayers(map, featureCollectionRef.current);
        sourceReadyRef.current = true;
      });

      const CLUSTER_LAYERS = ["clusters-circle", "clusters-icon"];
      for (const clusterLayer of CLUSTER_LAYERS) {
        map.on("click", clusterLayer, (e: MapLayerMouseEvent) => {
          const features = map.queryRenderedFeatures(e.point, { layers: CLUSTER_LAYERS });
          if (!features.length) return;
          const feature = features[0];
          const clusterId = feature.properties?.cluster_id;
          if (clusterId == null) return;

          const source = map.getSource("activities") as GeoJSONSource;
          source.getClusterExpansionZoom(clusterId).then((zoom) => {
            const coords = (feature.geometry as GeoJSON.Point).coordinates;
            map.flyTo({ center: [coords[0], coords[1]], zoom, duration: 500 });
          });
        });
      }

      for (const layerId of MARKER_LAYERS) {
        map.on("click", layerId, (e: MapLayerMouseEvent) => {
          const features = map.queryRenderedFeatures(e.point, { layers: [layerId] });
          if (!features.length) return;
          const props = features[0].properties;
          if (!props) return;

          const activity: BrowseActivity = {
            id: String(props.id),
            title: String(props.title),
            image: String(props.image),
            location: String(props.location),
            address: String(props.address),
            distance: String(props.distance),
            ageRange: String(props.ageRange),
            rating: Number(props.rating),
            reviewCount: Number(props.reviewCount),
            price: Number(props.price),
            badge: props.badge ? String(props.badge) : undefined,
            category: String(props.category),
            lat: Number(props.lat),
            lng: Number(props.lng),
            isPromoted: Number(props.isPromoted) === 1,
            groupType: props.groupType ? String(props.groupType) as BrowseActivity["groupType"] : undefined,
          };

          popupRef.current?.remove();
          const popup = new PopupCls({
            closeButton: true, closeOnClick: true,
            offset: 14, className: "cf-popup-container", maxWidth: "280px",
          })
            .setLngLat([activity.lng, activity.lat])
            .setHTML(createPopupHTML(activity))
            .addTo(map);
          popupRef.current = popup;

          onMarkerClickRef.current?.(activity.id);
        });
      }

      const interactiveLayers = ["clusters-circle", "clusters-icon", ...MARKER_LAYERS];
      for (const layerId of interactiveLayers) {
        map.on("mouseenter", layerId, () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", layerId, () => { map.getCanvas().style.cursor = ""; });
      }

      map.on("error", () => setMapError(true));
    } catch {
      setMapError(true);
    }

    return () => {
      activeMarkerRef.current?.remove();
      activeMarkerRef.current = null;
      popupRef.current?.remove();
      popupRef.current = null;
      sourceReadyRef.current = false;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const cleanup = initMap();
    return () => { cleanup?.then((fn) => fn?.()); };
  }, [initMap]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !sourceReadyRef.current) return;
    const source = map.getSource("activities") as GeoJSONSource | undefined;
    if (!source) return;
    source.setData(featureCollection);
  }, [featureCollection]);

  useEffect(() => {
    const map = mapRef.current;
    const MarkerClass = markerClassRef.current;
    if (!map || !MarkerClass) return;

    activeMarkerRef.current?.remove();
    activeMarkerRef.current = null;

    if (!activeId) return;

    const activity = activitiesById.get(activeId);
    if (!activity) return;

    const el = buildActiveMarkerEl(activity);
    const marker = new MarkerClass({ element: el, anchor: "center" })
      .setLngLat([activity.lng, activity.lat])
      .addTo(map);

    activeMarkerRef.current = marker;
  }, [activeId, activitiesById]);

  if (mapError) {
    return (
      <div className="w-full h-full rounded-[24px] overflow-hidden shadow-[var(--shadow-soft)] border border-gray-200 relative">
        <MapPlaceholder />
        <MapControls />
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-[24px] overflow-hidden shadow-[var(--shadow-soft)] border border-gray-200 relative">
      <div ref={mapContainerRef} className="w-full h-full" />
      {!mapLoaded && <MapPlaceholder />}
      <MapControls mapRef={mapRef} />
    </div>
  );
}

function MapControls({ mapRef }: { mapRef?: React.MutableRefObject<MaplibreMap | null> }) {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
      <button
        onClick={() => {
          if (navigator.geolocation && mapRef?.current) {
            navigator.geolocation.getCurrentPosition((pos) => {
              mapRef.current?.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: 14 });
            });
          }
        }}
        className="bg-coral text-white w-10 h-10 rounded-full shadow-lg hover:bg-coral-hover transition-all border-none flex items-center justify-center active:scale-95 shadow-coral/20"
      >
        <Crosshair size={18} weight="bold" />
      </button>
      <div className="bg-white rounded-full shadow-lg flex flex-col overflow-hidden border border-gray-100">
        <button
          onClick={() => mapRef?.current?.zoomIn()}
          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-coral hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <Plus size={18} />
        </button>
        <button
          onClick={() => mapRef?.current?.zoomOut()}
          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-coral hover:bg-gray-50 transition-colors"
        >
          <Minus size={18} />
        </button>
      </div>
    </div>
  );
}
