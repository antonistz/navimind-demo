import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import type { ReactNode } from 'react';
import { mockBaselineRoute, mockOptimalRoute } from './fixtures';
import type { DangerZone } from '../types';

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Polyline: ({ pathOptions }: { pathOptions: { color: string } }) => (
    <div data-testid="polyline" data-color={pathOptions.color} />
  ),
  Marker: () => <div data-testid="marker" />,
  Circle: ({ children }: { children?: ReactNode }) => (
    <div data-testid="danger-circle">{children}</div>
  ),
  Popup: ({ children }: { children: ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
  useMap: () => ({ fitBounds: vi.fn() }),
}));

vi.mock('leaflet', () => ({
  default: {
    latLngBounds: vi.fn(() => ({})),
    divIcon: vi.fn(() => ({})),
  },
  latLngBounds: vi.fn(() => ({})),
  divIcon: vi.fn(() => ({})),
}));

const { default: RouteMap } = await import('../components/RouteMap');

const mockDangerZones: DangerZone[] = [
  { center: [36.8, 24.4], radiusMeters: 45000, severity: 'moderate', label: 'Test zone' },
];

describe('RouteMap', () => {
  it('renders the map container', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} dangerZones={[]} />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('renders the legend', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} dangerZones={[]} />);
    expect(screen.getByText('Baseline route')).toBeInTheDocument();
    expect(screen.getByText('NaviMind – AI-optimized route')).toBeInTheDocument();
  });

  it('renders two polylines for non-empty routes', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} dangerZones={[]} />);
    expect(screen.getAllByTestId('polyline')).toHaveLength(2);
  });

  it('baseline polyline uses grey color', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} dangerZones={[]} />);
    const polylines = screen.getAllByTestId('polyline');
    expect(polylines.some(el => el.getAttribute('data-color') === '#6b7280')).toBe(true);
  });

  it('optimal polyline uses cyan color', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} dangerZones={[]} />);
    const polylines = screen.getAllByTestId('polyline');
    expect(polylines.some(el => el.getAttribute('data-color') === '#22d3ee')).toBe(true);
  });

  it('renders no polylines for empty routes', () => {
    render(<RouteMap baselineRoute={[]} optimalRoute={[]} dangerZones={[]} />);
    expect(screen.queryAllByTestId('polyline')).toHaveLength(0);
  });

  it('renders danger zones when provided', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} dangerZones={mockDangerZones} />);
    expect(screen.getByTestId('danger-circle')).toBeInTheDocument();
    expect(screen.getByText('Test zone')).toBeInTheDocument();
  });

  it('shows wave toggle button when danger zones exist', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} dangerZones={mockDangerZones} />);
    expect(screen.getByTitle('Toggle wave danger zones')).toBeInTheDocument();
  });
});
