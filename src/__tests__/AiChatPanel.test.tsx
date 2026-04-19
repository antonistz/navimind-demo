import { render, screen } from '@testing-library/react';
import AiChatPanel from '../components/AiChatPanel';
import { mockVoyage, mockSeedMessages } from './fixtures';

describe('AiChatPanel', () => {
  it('renders without crashing', () => {
    render(<AiChatPanel voyage={mockVoyage} seedMessages={mockSeedMessages} />);
    expect(screen.getByText('NaviMind Assistant')).toBeInTheDocument();
  });

  it('renders seed messages', () => {
    render(<AiChatPanel voyage={mockVoyage} seedMessages={mockSeedMessages} />);
    expect(screen.getByText('Why does the route deviate south?')).toBeInTheDocument();
    expect(screen.getByText('The straight-line track crosses rough seas.')).toBeInTheDocument();
  });

  it('chat input is enabled', () => {
    render(<AiChatPanel voyage={mockVoyage} seedMessages={mockSeedMessages} />);
    expect(screen.getByPlaceholderText(/Ask about/)).not.toBeDisabled();
  });

  it('send button is disabled when input is empty', () => {
    render(<AiChatPanel voyage={mockVoyage} seedMessages={mockSeedMessages} />);
    expect(screen.getByRole('button', { name: /Send/ })).toBeDisabled();
  });

  it('shows fuel saving percentage in badge', () => {
    render(<AiChatPanel voyage={mockVoyage} seedMessages={mockSeedMessages} />);
    // (35-32)/35*100 = 8.6%
    expect(screen.getByText(/8\.6% fuel saved/)).toBeInTheDocument();
  });
});
