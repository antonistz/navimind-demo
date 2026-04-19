import { render, screen } from '@testing-library/react';
import AiExplanationPanel from '../components/AiExplanationPanel';
import { mockVoyage } from './fixtures';

describe('AiExplanationPanel', () => {
  it('renders without crashing', () => {
    render(<AiExplanationPanel voyage={mockVoyage} />);
    expect(screen.getByText('AI Rationale (Demo)')).toBeInTheDocument();
  });

  it('includes origin in explanation', () => {
    render(<AiExplanationPanel voyage={mockVoyage} />);
    expect(screen.getByText(/Athens \/ Piraeus \(GR\)/)).toBeInTheDocument();
  });

  it('includes destination in explanation', () => {
    render(<AiExplanationPanel voyage={mockVoyage} />);
    expect(screen.getByText(/Heraklion \(GR\)/)).toBeInTheDocument();
  });

  it('shows calculated fuel saving percentage', () => {
    render(<AiExplanationPanel voyage={mockVoyage} />);
    expect(screen.getByText(/8\.6%/)).toBeInTheDocument();
  });

  it('shows baseline wave height from voyage data', () => {
    render(<AiExplanationPanel voyage={mockVoyage} />);
    expect(screen.getAllByText(/3\.2 m/).length).toBeGreaterThan(0);
  });

  it('shows voyage objective', () => {
    render(<AiExplanationPanel voyage={mockVoyage} />);
    expect(screen.getByText(/Minimise fuel cost/)).toBeInTheDocument();
  });
});
