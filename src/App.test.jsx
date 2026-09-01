import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the wallet kit to avoid actual browser wallet extension calls
vi.mock('@creit.tech/stellar-wallets-kit', () => {
  return {
    StellarWalletsKit: class {
      constructor() {
        this.setWallet = vi.fn();
        this.getPublicKey = vi.fn().mockResolvedValue({ address: 'GBMOCK...WALLET' });
        this.signTransaction = vi.fn();
      }
    },
    Networks: { TESTNET: 'TESTNET' },
  };
});

vi.mock('@creit.tech/stellar-wallets-kit/modules/freighter', () => ({ FreighterModule: vi.fn() }));
vi.mock('@creit.tech/stellar-wallets-kit/modules/albedo', () => ({ AlbedoModule: vi.fn() }));
vi.mock('@creit.tech/stellar-wallets-kit/modules/xbull', () => ({ xBullModule: vi.fn() }));
vi.mock('@creit.tech/stellar-wallets-kit/modules/lobstr', () => ({ LobstrModule: vi.fn() }));

describe('Stellar-Box App Tests', () => {
  it('renders the header correctly', () => {
    render(<App />);
    expect(screen.getByText('Stellar-Box')).toBeInTheDocument();
    expect(screen.getAllByText(/Testnet/i).length).toBeGreaterThan(0);
  });

  it('shows wallet selection modal when "Connect Wallet" is clicked', () => {
    render(<App />);
    const connectButton = screen.getByText('⚡ Connect Wallet');
    fireEvent.click(connectButton);
    
    expect(screen.getByText('Select Wallet')).toBeInTheDocument();
    expect(screen.getByText('Freighter Wallet')).toBeInTheDocument();
    expect(screen.getByText('Albedo')).toBeInTheDocument();
  });

  it('renders the Campaign & Donate tab by default', () => {
    render(<App />);
    expect(screen.getByText('Stellar Ecosystem Innovation Fund')).toBeInTheDocument();
    expect(screen.getByText('🎁 Campaign & Donate')).toHaveClass('active');
  });

  it('switches to DAO Milestone Voting tab', () => {
    render(<App />);
    const daoTab = screen.getByText(/🏛️ DAO Milestone Voting/i);
    fireEvent.click(daoTab);
    
    expect(daoTab).toHaveClass('active');
    expect(screen.getByText('🏛️ DAO Milestone Payout Governance')).toBeInTheDocument();
  });
});
