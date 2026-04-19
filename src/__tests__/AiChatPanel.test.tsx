import { render, screen } from '@testing-library/react';
import AiChatPanel from '../components/AiChatPanel';
import { mockVoyage } from './fixtures';

describe('AiChatPanel', () => {
  it('renders without crashing', () => {
    render(<AiChatPanel voyage={mockVoyage} />);
    expect(screen.getByText('NaviMind Assistant')).toBeInTheDocument();
  });

  it('shows demo badge', () => {
    render(<AiChatPanel voyage={mockVoyage} />);
    expect(screen.getByText('Demo')).toBeInTheDocument();
  });

  it('chat input is disabled in demo mode', () => {
    render(<AiChatPanel voyage={mockVoyage} />);
    expect(screen.getByPlaceholderText(/demo mode/)).toBeDisabled();
  });

  it('send button is disabled in demo mode', () => {
    render(<AiChatPanel voyage={mockVoyage} />);
    expect(screen.getByRole('button', { name: /Send/ })).toBeDisabled();
  });

  it('includes destination in user question', () => {
    render(<AiChatPanel voyage={mockVoyage} />);
    expect(screen.getByText(/Heraklion/)).toBeInTheDocument();
  });

  it('AI response references baseline wave height', () => {
    render(<AiChatPanel voyage={mockVoyage} />);
    expect(screen.getByText(/3\.2/)).toBeInTheDocument();
  });

  it('AI response includes calculated fuel saving', () => {
    // (35 - 32) / 35 * 100 = 8.6%
    render(<AiChatPanel voyage={mockVoyage} />);
    expect(screen.getByText(/8\.6%/)).toBeInTheDocument();
  });
});
