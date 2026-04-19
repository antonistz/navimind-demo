import { render, screen } from '@testing-library/react';
import KpiPanel, { formatDelta } from '../components/KpiPanel';
import { mockVoyage } from './fixtures';

describe('KpiPanel', () => {
  it('renders without crashing', () => {
    render(<KpiPanel voyage={mockVoyage} />);
    expect(screen.getByText('Route Comparison')).toBeInTheDocument();
  });

  it('displays optimal fuel consumption', () => {
    render(<KpiPanel voyage={mockVoyage} />);
    expect(screen.getByText('32.0 t')).toBeInTheDocument();
  });

  it('displays optimal CO₂ emissions', () => {
    render(<KpiPanel voyage={mockVoyage} />);
    expect(screen.getByText('101 t')).toBeInTheDocument();
  });

  it('displays optimal ETA', () => {
    render(<KpiPanel voyage={mockVoyage} />);
    expect(screen.getByText(mockVoyage.etaOptimal)).toBeInTheDocument();
  });

  it('displays max wave height', () => {
    render(<KpiPanel voyage={mockVoyage} />);
    expect(screen.getByText('2.4 m')).toBeInTheDocument();
  });
});

describe('formatDelta', () => {
  it('shows reduction label for lower current value', () => {
    expect(formatDelta(32, 35, 't')).toBe('-3.0 t (-8.6% reduction)');
  });

  it('shows increase label for higher current value', () => {
    expect(formatDelta(37, 35, 't')).toBe('+2.0 t (5.7% increase)');
  });

  it('handles zero delta', () => {
    expect(formatDelta(35, 35, 't')).toBe('0.0 t (0.0% reduction)');
  });
});
