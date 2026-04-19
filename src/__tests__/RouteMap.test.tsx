import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import type { ReactNode } from 'react';
import { mockBaselineRoute, mockOptimalRoute } from './fixtures';

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Polyline: ({ pathOptions }: { pathOptions: { color: string } }) => (
    <div data-testid="polyline" data-color={pathOptions.color} />
  ),
  Marker: () => <div data-testid="marker" />,
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

// Import after mocks are registered
const { default: RouteMap } = await import('../components/RouteMap');

describe('RouteMap', () => {
  it('renders the map container', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('renders the legend', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} />);
    expect(screen.getByText('Baseline route')).toBeInTheDocument();
    expect(screen.getByText('NaviMind – AI-optimized route')).toBeInTheDocument();
  });

  it('renders two polylines for non-empty routes', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} />);
    expect(screen.getAllByTestId('polyline')).toHaveLength(2);
  });

  it('baseline polyline uses grey color', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} />);
    const polylines = screen.getAllByTestId('polyline');
    expect(polylines.some(el => el.getAttribute('data-color') === '#6b7280')).toBe(true);
  });

  it('optimal polyline uses cyan color', () => {
    render(<RouteMap baselineRoute={mockBaselineRoute} optimalRoute={mockOptimalRoute} />);
    const polylines = screen.getAllByTestId('polyline');
    expect(polylines.some(el => el.getAttribute('data-color') === '#22d3ee')).toBe(true);
  });

  it('renders no polylines for empty routes', () => {
    render(<RouteMap baselineRoute={[]} optimalRoute={[]} />);
    expect(screen.queryAllByTestId('polyline')).toHaveLength(0);
  });
});
