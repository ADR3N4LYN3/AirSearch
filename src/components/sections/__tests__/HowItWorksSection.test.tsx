import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HowItWorksSection from '@/components/sections/HowItWorksSection';

vi.mock('@/components/animations', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TextReveal: ({ text }: { text: string }) => <span>{text}</span>,
  StaggerContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  StaggerItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('HowItWorksSection', () => {
  it('renders without crashing', () => {
    render(<HowItWorksSection />);
  });

  it('displays "Comment ça marche ?"', () => {
    render(<HowItWorksSection />);
    expect(screen.getByText('Comment ça marche ?')).toBeInTheDocument();
  });

  it('displays the 3 steps (01, 02, 03)', () => {
    render(<HowItWorksSection />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });
});
