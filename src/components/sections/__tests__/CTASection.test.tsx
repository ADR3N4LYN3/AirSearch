import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CTASection from '@/components/sections/CTASection';

vi.mock('@/components/animations', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TextReveal: ({ text }: { text: string }) => <span>{text}</span>,
  StaggerContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  StaggerItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('CTASection', () => {
  it('renders without crashing', () => {
    render(<CTASection />);
  });

  it('displays "Prêt à trouver votre logement idéal ?"', () => {
    render(<CTASection />);
    expect(screen.getByText('Prêt à trouver votre logement idéal ?')).toBeInTheDocument();
  });

  it('has a "Lancer une recherche" button', () => {
    render(<CTASection />);
    expect(screen.getByText('Lancer une recherche')).toBeInTheDocument();
  });
});
