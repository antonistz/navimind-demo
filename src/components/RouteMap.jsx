// src/components/RouteMap.jsx
import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, useMap, Marker } from 'react-leaflet';
import L from 'leaflet';
import './RouteMap.css';

function FitBounds({ baselineRoute, optimalRoute }) {
  const map = useMap();

  useEffect(() => {
    const allPoints = [...(baselineRoute || []), ...(optimalRoute || [])];

    if (!allPoints.length) return;

    const bounds = L.latLngBounds(
      allPoints.map(([lat, lon]) => [lat, lon])
    );

    // You already tuned this
    const isMobile = window.innerWidth < 640;

map.fitBounds(bounds, {
  padding: isMobile ? [40, 40] : [120, 120],  // less padding = more zoom-in
  maxZoom: isMobile ? 8 : 10                  // enforce tighter zoom on phones
});

  }, [map, baselineRoute, optimalRoute]);

  return null;
}

function RouteMap({ baselineRoute, optimalRoute }) {
  const initialCenter = [37.5, 23.5];
  const initialZoom = 5;

  // Compute simple midpoints and label icons
  const { baselineMid, optimalMid, baselineLabelIcon, optimalLabelIcon } = useMemo(() => {
    const baselineMid =
      baselineRoute && baselineRoute.length
        ? baselineRoute[Math.floor(baselineRoute.length / 2)]
        : null;

    const optimalMid =
      optimalRoute && optimalRoute.length
        ? optimalRoute[Math.floor(optimalRoute.length / 2)]
        : null;

   const baselineLabelIcon = L.divIcon({
  className: 'route-label baseline-label',
  html: 'Baseline route',
  iconSize: null,        // ← allow auto-size based on content
});

const optimalLabelIcon = L.divIcon({
  className: 'route-label optimal-label',
  html: 'NaviMind (AI-optimized)',
  iconSize: null,        // ← same here
});

    return { baselineMid, optimalMid, baselineLabelIcon, optimalLabelIcon };
  }, [baselineRoute, optimalRoute]);

  return (
    <div className="route-map-wrapper">
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        className="route-map-container"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Baseline route in grey */}
        {baselineRoute && baselineRoute.length > 0 && (
          <Polyline
            positions={baselineRoute}
            pathOptions={{ color: '#6b7280', weight: 3 }}
          />
        )}

        {/* AI-optimized route in cyan */}
        {optimalRoute && optimalRoute.length > 0 && (
          <Polyline
            positions={optimalRoute}
            pathOptions={{ color: '#22d3ee', weight: 4 }}
          />
        )}

        {/* Text labels placed near the middle of each route */}
        {baselineMid && (
          <Marker
            position={baselineMid}
            icon={baselineLabelIcon}
            interactive={false}
          />
        )}

        {optimalMid && (
          <Marker
            position={[optimalMid[0], optimalMid[1] - 0.6]}  // shift label left
            icon={optimalLabelIcon}
            interactive={false}
          />
        )}

        {/* Auto-fit both routes */}
        <FitBounds
          baselineRoute={baselineRoute}
          optimalRoute={optimalRoute}
        />
      </MapContainer>

      {/* Legend overlay (reinforces the meaning of colors) */}
      <div className="route-legend">
        <div className="legend-item">
          <span className="legend-line baseline" />
          <span>Baseline route</span>
        </div>
        <div className="legend-item">
          <span className="legend-line optimal" />
          <span>NaviMind – AI-optimized route</span>
        </div>
      </div>
    </div>
  );
}

export default RouteMap;
