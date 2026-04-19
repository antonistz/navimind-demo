import { render, screen } from '@testing-library/react';
import VoyageInfoBar from '../components/VoyageInfoBar';
import { mockVoyage } from './fixtures';

describe('VoyageInfoBar', () => {
  it('renders without crashing', () => {
    render(<VoyageInfoBar voyage={mockVoyage} />);
  });

  it('displays origin', () => {
    render(<VoyageInfoBar voyage={mockVoyage} />);
    expect(screen.getByText(/Athens \/ Piraeus \(GR\)/)).toBeInTheDocument();
  });

  it('displays destination', () => {
    render(<VoyageInfoBar voyage={mockVoyage} />);
    expect(screen.getByText(/Heraklion \(GR\)/)).toBeInTheDocument();
  });

  it('displays voyage objective', () => {
    render(<VoyageInfoBar voyage={mockVoyage} />);
    expect(screen.getByText(/Minimise fuel cost/)).toBeInTheDocument();
  });

  it('indicates demo mode', () => {
    render(<VoyageInfoBar voyage={mockVoyage} />);
    expect(screen.getByText(/Static data/)).toBeInTheDocument();
  });
});
