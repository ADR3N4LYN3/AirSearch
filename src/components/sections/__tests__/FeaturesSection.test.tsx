import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeaturesSection from '@/components/sections/FeaturesSection';

vi.mock('@/components/animations', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TextReveal: ({ text }: { text: string }) => <span>{text}</span>,
  StaggerContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  StaggerItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('FeaturesSection', () => {
  it('renders without crashing', () => {
    render(<FeaturesSection />);
  });

  it('displays "Pourquoi AirSearch ?"', () => {
    render(<FeaturesSection />);
    expect(screen.getByText('Pourquoi AirSearch ?')).toBeInTheDocument();
  });

  it('displays the 4 features', () => {
    render(<FeaturesSection />);
    expect(screen.getByText('Recherche intelligente')).toBeInTheDocument();
    expect(screen.getByText('Multi-plateformes')).toBeInTheDocument();
    expect(screen.getByText('Localisation précise')).toBeInTheDocument();
    expect(screen.getByText('Conseils personnalisés')).toBeInTheDocument();
  });
});
