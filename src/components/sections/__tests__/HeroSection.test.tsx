import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/sections/HeroSection';

vi.mock('@/components/animations', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TextReveal: ({ text }: { text: string }) => <span>{text}</span>,
  StaggerContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  StaggerItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('HeroSection', () => {
  it('renders without crashing', () => {
    render(<HeroSection />);
  });

  it('displays the title "Trouvez votre location de vacances"', () => {
    render(<HeroSection />);
    expect(screen.getByText('Trouvez votre location de vacances')).toBeInTheDocument();
  });

  it('displays the 3 badges', () => {
    render(<HeroSection />);
    expect(screen.getByText('Recherche en temps réel')).toBeInTheDocument();
    expect(screen.getByText('Multi-plateformes')).toBeInTheDocument();
    expect(screen.getByText('100% Gratuit')).toBeInTheDocument();
  });
});
