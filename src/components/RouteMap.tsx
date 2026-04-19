import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Polyline, useMap, Marker, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Route, DangerZone } from '../types';
import './RouteMap.css';

interface FitBoundsProps {
  baselineRoute: Route;
  optimalRoute: Route;
}

function FitBounds({ baselineRoute, optimalRoute }: FitBoundsProps) {
  const map = useMap();

  useEffect(() => {
    const allPoints = [...baselineRoute, ...optimalRoute];
    if (!allPoints.length) return;

    const bounds = L.latLngBounds(allPoints.map(([lat, lon]) => [lat, lon]));
    const isMobile = window.innerWidth < 640;

    map.fitBounds(bounds, {
      padding: isMobile ? [40, 40] : [120, 120],
      maxZoom: isMobile ? 8 : 10,
    });
  }, [map, baselineRoute, optimalRoute]);

  return null;
}

interface RouteMapProps {
  baselineRoute: Route;
  optimalRoute: Route;
  dangerZones: DangerZone[];
  isLoading?: boolean;
}

const SEVERITY_COLORS: Record<DangerZone['severity'], { stroke: string; fill: string }> = {
  moderate: { stroke: '#f59e0b', fill: '#f59e0b' },
  severe:   { stroke: '#ef4444', fill: '#ef4444' },
};

function RouteMap({ baselineRoute, optimalRoute, dangerZones, isLoading = false }: RouteMapProps) {
  const initialCenter: [number, number] = [37.5, 23.5];
  const initialZoom = 5;
  const [showDangerZones, setShowDangerZones] = useState(true);

  const { baselineMid, optimalMid, baselineLabelIcon, optimalLabelIcon } = useMemo(() => {
    const baselineMid = baselineRoute.length
      ? baselineRoute[Math.floor(baselineRoute.length / 2)]
      : null;
    const optimalMid = optimalRoute.length
      ? optimalRoute[Math.floor(optimalRoute.length / 2)]
      : null;

    const baselineLabelIcon = L.divIcon({
      className: 'route-label baseline-label',
      html: 'Baseline route',
      iconSize: undefined,
    });

    const optimalLabelIcon = L.divIcon({
      className: 'route-label optimal-label',
      html: 'NaviMind (AI-optimized)',
      iconSize: undefined,
    });

    return { baselineMid, optimalMid, baselineLabelIcon, optimalLabelIcon };
  }, [baselineRoute, optimalRoute]);

  return (
    <div className="route-map-wrapper">
      {isLoading && <div className="map-loading-overlay"><span>Optimizing…</span></div>}

      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        className="route-map-container"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showDangerZones && dangerZones.map((zone, i) => (
          <Circle
            key={i}
            center={zone.center}
            radius={zone.radiusMeters}
            pathOptions={{
              color:       SEVERITY_COLORS[zone.severity].stroke,
              fillColor:   SEVERITY_COLORS[zone.severity].fill,
              fillOpacity: 0.18,
              weight:      1.5,
              dashArray:   '4 4',
            }}
          >
            <Popup>{zone.label}</Popup>
          </Circle>
        ))}

        {baselineRoute.length > 0 && (
          <Polyline
            positions={baselineRoute}
            pathOptions={{ color: '#6b7280', weight: 3 }}
          />
        )}

        {optimalRoute.length > 0 && (
          <Polyline
            positions={optimalRoute}
            pathOptions={{ color: '#22d3ee', weight: 4 }}
          />
        )}

        {baselineMid && (
          <Marker position={baselineMid} icon={baselineLabelIcon} interactive={false} />
        )}

        {optimalMid && (
          <Marker
            position={[optimalMid[0], optimalMid[1] - 0.6]}
            icon={optimalLabelIcon}
            interactive={false}
          />
        )}

        {baselineRoute.length > 0 && (
          <FitBounds baselineRoute={baselineRoute} optimalRoute={optimalRoute} />
        )}
      </MapContainer>

      <div className="route-legend">
        <div className="legend-item">
          <span className="legend-line baseline" />
          <span>Baseline route</span>
        </div>
        <div className="legend-item">
          <span className="legend-line optimal" />
          <span>NaviMind – AI-optimized route</span>
        </div>
        {dangerZones.length > 0 && (
          <>
            <div className="legend-item">
              <span className="legend-swatch moderate" />
              <span>Moderate sea state</span>
            </div>
            <div className="legend-item">
              <span className="legend-swatch severe" />
              <span>Severe sea state</span>
            </div>
          </>
        )}
      </div>

      {dangerZones.length > 0 && (
        <button
          className={`wave-toggle-btn ${showDangerZones ? 'active' : ''}`}
          onClick={() => setShowDangerZones(s => !s)}
          title="Toggle wave danger zones"
        >
          {showDangerZones ? '🌊 Hide wave zones' : '🌊 Show wave zones'}
        </button>
      )}
    </div>
  );
}

export default RouteMap;
