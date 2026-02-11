import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('displays "AirSearch"', () => {
    render(<Footer />);
    expect(screen.getByText('AirSearch')).toBeInTheDocument();
  });

  it('has legal links', () => {
    render(<Footer />);
    expect(screen.getByText('Mentions légales')).toBeInTheDocument();
    expect(screen.getByText("Conditions d'utilisation")).toBeInTheDocument();
    expect(screen.getByText('Confidentialité')).toBeInTheDocument();
  });
});
