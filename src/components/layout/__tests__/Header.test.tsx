import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/Header';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('@/components/ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle" />,
}));

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('displays the logo "AirSearch"', () => {
    render(<Header />);
    expect(screen.getByText('AirSearch')).toBeInTheDocument();
  });

  it('has navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Destinations')).toBeInTheDocument();
    expect(screen.getByText('Fonctionnalités')).toBeInTheDocument();
    expect(screen.getByText('Comment ça marche')).toBeInTheDocument();
    expect(screen.getByText('À propos')).toBeInTheDocument();
  });
});
